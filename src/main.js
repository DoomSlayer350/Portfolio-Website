import './style.css'
import * as THREE from 'three';
import { gsap } from "gsap";

import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { color, element, texture, time } from 'three/tsl';
import { UVsDebug } from 'three/addons/utils/UVsDebug.js';
import { camera, RotateCameraThroughMouseMovement } from "./camera.js";
import { renderer } from "./renderer.js";
import { SpotLightHelper } from 'three/webgpu';
import { scene } from "./scene.js";
import { composer, cycleBloom, stopCyclingBloom } from "./composer.js";
import { LoadGLTFMesh } from './utils/gltf-importer.js';
import { WorldObject } from './objects/object.js';
import { timeline } from "./timeline.js";

/* Camera */

camera.position.set(0,0,29.5);
//gsap.to(camera.position, {z:29.5, ease:"sine.out", duration:1});

/* Main Menu Console */

const MainMenuConsole = new WorldObject(await LoadGLTFMesh("src/assets/meshes/MainMenuConsoleMesh.glb"))
scene.add(MainMenuConsole.mesh);
MainMenuConsole.mesh.position.set(0,0,25);

/* Start Button */

const StartButtonFrameBottom = new WorldObject(await LoadGLTFMesh("src/assets/meshes/ButtonFrameMesh.glb"), timeline);
const StartButtonFrameTop = new WorldObject(await LoadGLTFMesh("src/assets/meshes/ButtonFrameMesh.glb"), timeline);
StartButtonFrameBottom.mesh.position.set(0,0,27);
StartButtonFrameTop.mesh.position.set(0,0.55,27);
scene.add(StartButtonFrameBottom.mesh, StartButtonFrameTop.mesh);

const StartButtonMaterial = new THREE.MeshBasicMaterial({color: 0x00000});
StartButtonFrameBottom.mesh.material = StartButtonMaterial;

const EnterText = new WorldObject(await LoadGLTFMesh("src/assets/meshes/StartButtonTextMesh.glb"), timeline);
EnterText.mesh.position.set(0,0.25,26.8);
EnterText.mesh.material = StartButtonMaterial;
scene.add(EnterText.mesh);

const HTMLStartButton = document.getElementById("StartButton");

function HTMLStartButtonEnter() {
  console.log("entered");
  this.style.cursor = "pointer";
  timeline.clear();
  cycleBloom(timeline);
  StartButtonFrameTop.InterpolateToPoint({x: 0, y:0.65, z: 27}, 0.5, "sine.out", "<");
  StartButtonFrameBottom.InterpolateToPoint({ x: 0, y: -0.10, z: 27}, 0.5, "sine.out", "<");
  EnterText.InterpolateToPoint({x: 0, y: 0.23, z: 27}, 0.5, "sine.out", "<");
};

function HTMLStartButtonLeave() {
  console.log("exited");
  timeline.clear();
  stopCyclingBloom(timeline);
  StartButtonFrameTop.InterpolateToPoint({x: 0, y:0.55, z: 27}, 0.5, "sine.out", "<");
  StartButtonFrameBottom.InterpolateToPoint({ x: 0, y: 0, z: 27}, 0.5, "sine.out", "<");
  EnterText.InterpolateToPoint({x: 0, y: 0.25, z: 26.8}, 0.5, "sine.out", "<");
};

function HTMLStartButtonClick() {
  console.log("clicked");
  window.location.href = "src/main-page.html"
};

HTMLStartButton.addEventListener("mouseenter", HTMLStartButtonEnter);
HTMLStartButton.addEventListener("mouseleave", HTMLStartButtonLeave);
HTMLStartButton.addEventListener("click", HTMLStartButtonClick);

/* Lights */

function CreatePointLight(Location_x, Location_y, Location_z, Colour, Intensity, Decay, Distance, ShouldDebug){
  const pointLight = new THREE.PointLight(Colour, Intensity, 0, Decay);
  pointLight.castShadow = true;
  pointLight.position.set(Location_x, Location_y, Location_z)
  if (ShouldDebug){
    const pointlightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(pointlightHelper);
  };
  scene.add(pointLight);
};

const ambientLight = new THREE.AmbientLight( 0x64648b,0.03);
ambientLight.position.set(0,0,0);

const spotLight = new THREE.SpotLight(0xffffff, 0.15, 0, Math.PI/2.5, 0.7, 0);
spotLight.position.set(-40,-30,70);
const target = new THREE.Object3D();
target.position.set(40,10,0);
spotLight.target = target;
spotLight.castShadow = true;
const spotlightHelper = new THREE.SpotLightHelper(spotLight);
//scene.add(spotLight,spotlightHelper);

const hemisphereLight = new THREE.HemisphereLight(0xFEFFBD, 0xFF6200, 0.015);
scene.add(hemisphereLight);


CreatePointLight(0, 0.5, 25.5 , 0xFF8400, 0.5, 3, 10, false);
CreatePointLight(-3, 0.5, 26 , 0xFF8400, 0.1, 3, 10, false);
CreatePointLight(3, 0.5, 26 , 0xFF8400, 0.1, 3, 10, false);
CreatePointLight(3.8, 1.2, 26 , 0xFF8400, 0.5, 1.5, 70, false);
CreatePointLight(-3.8, 1.2, 26 , 0xFF8400, 0.5, 1.5, 70, false);

CreatePointLight(-7.25, 3.8, 27 , 0xFF8400, 0.1, 0.5, 1, false);
CreatePointLight(7.25, 3.8, 27 , 0xFF8400, 0.1, 0.5, 1, false);
CreatePointLight(-9, 5, 27 , 0xFF8400, 0.1, 0.5, 1, false);
CreatePointLight(9, 5, 27 , 0xFF8400, 0.1, 0.5, 1, false);

CreatePointLight(0, 0, 20 , 0xFF8400, 0.2, 1, 1, false); //lights up the back

CreatePointLight(0, -2.8, 26 , 0xFF8400, 0.1, 0.5, 1, false);
CreatePointLight(2.5, -2.8, 25.8 , 0xFF8400, 0.7, 0.6, 2.5, false);
CreatePointLight(-2.5, -2.8, 25.8 , 0xFF8400, 0.7, 0.6, 2.5, false);

/* To light up the metal at the bottom.*/

CreatePointLight(-4.4, -3.3, 26.1 , 0xffffff63, 0.01, 5, 0.5, false);
CreatePointLight(4.4, -3.3, 26.1 , 0xffffff63, 0.01, 5, 0.5, false);
CreatePointLight(-6, -2, 25.8 , 0xffffff63, 0.1, 1, 0.5, false);
CreatePointLight(6, -2, 25.8 , 0xffffff63, 0.1, 1, 0.5, false);
CreatePointLight(-0, -3.7, 25.4 , 0xffffff63, 0.3, 1, 2, false);
CreatePointLight(-2.6, -3.6, 25.5 , 0xffffff63, 0.1, 0.5, 2, false);
CreatePointLight(2.6, -3.6, 25.5 , 0xffffff63, 0.1, 0.5, 2, false);


/* Helpers */

const gridHelper = new THREE.GridHelper(1000,100);

/* Background Plane */

const bg_plane_geo = new THREE.PlaneGeometry(10000,10000);
const bg_plane_mat = new THREE.MeshStandardMaterial({color: 0x120e0e});
const bg_plane = new THREE.Mesh(bg_plane_geo, bg_plane_mat);
scene.add(bg_plane);

/* Animate */

function animate() {
  requestAnimationFrame(animate);
  RotateCameraThroughMouseMovement(0.1); //0.1 is default
  composer.render();
};

animate();