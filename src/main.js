import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { color, element, texture } from 'three/tsl';
import { UVsDebug } from 'three/addons/utils/UVsDebug.js';
import {
  camera,
  RotateCameraThroughMouseMovement
} from "./camera.js";
import { renderer } from "./renderer.js";
import { SpotLightHelper } from 'three/webgpu';
import { scene } from "./scene.js";
import { composer } from "./composer.js";
import { LoadGLTFMesh } from './utils/gltf-importer.js';

/* Camera */

camera.position.setZ(29.5);

/* Main Menu Console */

const MainMenuConsole = await LoadGLTFMesh("src/assets/meshes/MainMenuConsoleMesh.glb");
scene.add(MainMenuConsole);
MainMenuConsole.position.set(0,0,25);

/* Start Button */

const StartButtonFrameBottom = await LoadGLTFMesh("src/assets/meshes/ButtonFrameMesh.glb");
const StartButtonFrameTop = await LoadGLTFMesh("src/assets/meshes/ButtonFrameMesh.glb");
StartButtonFrameBottom.position.set(0,0,27);
StartButtonFrameTop.position.set(0,0.55,27);
scene.add(StartButtonFrameBottom, StartButtonFrameTop);

const StartButtonMaterial = new THREE.MeshBasicMaterial({color: 0x00000});
StartButtonFrameBottom.material = StartButtonMaterial;

const EnterText = await LoadGLTFMesh("src/assets/meshes/StartButtonTextMesh.glb");
EnterText.position.set(0,0.25,26.8);
EnterText.material = StartButtonMaterial;
scene.add(EnterText);

const HTMLStartButton = document.getElementById("StartButton");

function HTMLStartButtonEnter() {
  console.log("entered");
};

HTMLStartButton.addEventListener("mouseenter", HTMLStartButtonEnter);

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