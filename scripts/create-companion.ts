/** Original sculpture, exported once. No third-party game art or models. */
import { readFileSync, writeFileSync } from "node:fs";
import * as T from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// GLTFExporter uses FileReader in browsers; this script runs only in Bun.
class ExportReader {
  result: ArrayBuffer | string | null = null;
  onloadend?: () => void;
  async readAsArrayBuffer(blob: Blob) { this.result = await blob.arrayBuffer(); this.onloadend?.(); }
  async readAsDataURL(blob: Blob) { this.result = `data:${blob.type};base64,${Buffer.from(await blob.arrayBuffer()).toString("base64")}`; this.onloadend?.(); }
}
Object.assign(globalThis, { FileReader: ExportReader });
const css = readFileSync("src/styles.css", "utf8");
function color(role: string) {
  const value = css.match(new RegExp(`--scene-${role}:\\s*([^;]+)`))?.[1];
  if (!value) throw new Error(`Missing scene token ${role}`);
  return value;
}
const bone = new T.MeshStandardMaterial({ color: color("bone"), roughness: 0.68 });
const dark = new T.MeshStandardMaterial({ color: color("background"), roughness: 1 });
const wood = new T.MeshStandardMaterial({ color: color("wood"), roughness: 0.95 });
const root = new T.Group(); root.name = "BonfireCompanion";
function group(name: string, parent: T.Group, pos: number[]) {
  const g = new T.Group(); g.name = name; g.position.set(pos[0], pos[1], pos[2]); parent.add(g); return g;
}
function sphere(parent: T.Group, pos: number[], scale: number[], material = bone) {
  const mesh = new T.Mesh(new T.SphereGeometry(1, 24, 16), material);
  mesh.position.set(pos[0],pos[1],pos[2]); mesh.scale.set(scale[0],scale[1],scale[2]); parent.add(mesh); return mesh;
}
function link(parent: T.Group, start: number[], end: number[], radius: number, material = bone) {
  const a = new T.Vector3(...start), b = new T.Vector3(...end);
  const length = a.distanceTo(b);
  const profile = [new T.Vector2(0,0),new T.Vector2(radius*1.2,0.02),new T.Vector2(radius*1.22,0.06),new T.Vector2(radius*0.72,length*0.35),new T.Vector2(radius*0.75,length*0.7),new T.Vector2(radius*1.2,length-0.04),new T.Vector2(0,length)];
  const m = new T.Mesh(new T.LatheGeometry(profile, 10), material);
  m.position.copy(a);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.sub(a).normalize());parent.add(m);
}
const torso = group("IdleTorso",root,[0,1.02,0]);
for(let i=0;i<7;i++) sphere(torso,[0,i*0.075,0],[0.058,0.035,0.055]);
for(let i=0;i<5;i++) {
  const points:T.Vector3[]=[]; const w=0.24-i*0.012;
  for(let j=0;j<=24;j++) { const a=-Math.PI+0.22+j/24*(Math.PI*2-0.44);points.push(new T.Vector3(Math.sin(a)*w,0.39-i*0.072+Math.cos(a)*0.025,Math.cos(a)*0.125)); }
  torso.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),32,0.022,8,false),bone));
}
link(torso,[0,0.1,0.125],[0,0.4,0.125],0.025);
link(torso,[-0.3,0.45,0],[0,0.41,0.06],0.035);
link(torso,[0.3,0.45,0],[0,0.41,0.06],0.035);
const head = group("IdleHead",torso,[0,0.54,0.01]);
// A sculpted silhouette with real socket openings, not a skull painted on a sphere.
const shape=new T.Shape();shape.moveTo(-0.25,0.06);
shape.bezierCurveTo(-0.49,0.13,-0.51,0.58,-0.31,0.72);
shape.bezierCurveTo(-0.14,0.85,0.16,0.85,0.33,0.71);
shape.bezierCurveTo(0.51,0.56,0.49,0.17,0.25,0.06);
shape.lineTo(0.19,-0.02);shape.lineTo(-0.19,-0.02);shape.closePath();
for(const x of [-0.195,0.195]) { const hole=new T.Path();hole.absellipse(x,0.35,0.135,0.16,0,Math.PI*2,true,0);shape.holes.push(hole); }
const nose=new T.Path();nose.moveTo(0,0.22);nose.lineTo(-0.047,0.115);nose.quadraticCurveTo(0,0.075,0.047,0.115);nose.closePath();shape.holes.push(nose);
const face=new T.Mesh(new T.ExtrudeGeometry(shape,{depth:0.12,bevelEnabled:true,bevelSize:0.035,bevelThickness:0.035,bevelSegments:3,curveSegments:20}),bone);face.position.z=0.18;head.add(face);
sphere(head,[0,0.43,0],[0.45,0.4,0.29]);
for(const x of [-0.195,0.195])sphere(head,[x,0.35,0.28],[0.132,0.157,0.035],dark);
sphere(head,[0,0.155,0.28],[0.045,0.06,0.02],dark);
// Small separated teeth and a smiling lower jaw.
for(let i=0;i<6;i++)sphere(head,[(i-2.5)*0.062,0.025,0.3],[0.027,0.046,0.025]);
const jawPoints=[];for(let i=0;i<=24;i++){const a=Math.PI+i/24*Math.PI;jawPoints.push(new T.Vector3(Math.cos(a)*0.235,-0.055+Math.sin(a)*0.06,0.245));}
head.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(jawPoints),24,0.032,8,false),bone));
const hips=group("Pelvis",root,[0,0.94,0]);
for(const side of [-1,1]) {
 sphere(hips,[side*0.13,0,0],[0.14,0.08,0.13]);
 const leg=group(side<0?"LeftLeg":"RightLeg",root,[side*0.14,0.9,0.04]);
 link(leg,[0,0,0],[side*0.04,-0.17,0.42],0.058);
 sphere(leg,[side*0.04,-0.17,0.42],[0.072,0.063,0.063]);
 link(leg,[side*0.04,-0.17,0.42],[side*0.03,-0.69,0.44],0.04);
 link(leg,[side*0.04+0.048,-0.2,0.42],[side*0.03+0.032,-0.66,0.44],0.018);
 sphere(leg,[side*0.03,-0.72,0.53],[0.076,0.042,0.16]);
 for(let t=0;t<4;t++)sphere(leg,[side*0.03+(t-1.5)*0.033,-0.73,0.68],[0.016,0.025,0.045]);
}
for(const side of [-1,1]) {
 const arm=group(side<0?"IdleLeftArm":"IdleRightArm",torso,[side*0.3,0.43,0]);
 const elbow=[side*0.055,-0.25,0.08];const hand=[side*0.025,-0.37,0.31];
 sphere(arm,[0,0,0],[0.052,0.052,0.052]);link(arm,[0,0,0],elbow,0.035);
 link(arm,elbow,hand,0.024);link(arm,[elbow[0]+0.028,elbow[1],elbow[2]],[hand[0]+0.025,hand[1],hand[2]],0.017);
 sphere(arm,hand,[0.053,0.033,0.057]);
 for(let f=0;f<4;f++)link(arm,[hand[0]+(f-1.5)*0.024,hand[1],hand[2]],[hand[0]+(f-1.5)*0.024,hand[1]-0.05,hand[2]+0.06],0.009);
 if(side>0) { link(arm,[0.025,-0.46,0.28],[0.68,-0.28,0.48],0.027,wood);link(arm,[0.45,-0.34,0.41],[0.51,-0.21,0.45],0.013,wood); }
}
// Merge geometry per animated part/material, keeping named pivots intact.
root.traverse(o=>{
 if(!(o instanceof T.Group))return;
 const meshes=o.children.filter((c):c is T.Mesh=>c instanceof T.Mesh);
 for(const material of [bone,dark,wood]) {
  const targets=meshes.filter(m=>m.material===material);if(!targets.length)continue;
  const geometries=targets.map(m=>{m.updateMatrix();return m.geometry.clone().applyMatrix4(m.matrix).toNonIndexed();});
  const merged=mergeGeometries(geometries);if(!merged)throw new Error("Geometry merge failed");
  const mesh=new T.Mesh(merged,material);mesh.name=o.name+material.uuid.slice(0,4);o.add(mesh);
  targets.forEach(m=>o.remove(m));geometries.forEach(g=>g.dispose());
 }
});
const buffer=await new GLTFExporter().parseAsync(root,{binary:true});
if(!(buffer instanceof ArrayBuffer))throw new Error("Expected binary GLB");
writeFileSync("/tmp/bonfire-companion.glb",Buffer.from(buffer));
console.log(`Exported original companion: ${buffer.byteLength} bytes`);