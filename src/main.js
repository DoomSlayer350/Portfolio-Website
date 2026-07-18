import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { element, texture } from 'three/tsl';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { UVsDebug } from 'three/addons/utils/UVsDebug.js';
import {
  camera,
  RotateCameraThroughMouseMovement
} from "./camera.js";
import { renderer } from "./renderer.js";
import { SpotLightHelper } from 'three/webgpu';


/* Scene */

const scene = new THREE.Scene();

/* Camera */

camera.position.setZ(30);

/* Loader */

const loader = new GLTFLoader();

/* Main Menu Console */

const MainMenuConsoleGLTF = await loader.loadAsync("src/assets/meshes/MainMenuConsoleMesh.glb");
const MainMenuConsole = MainMenuConsoleGLTF.scene.children[0];
const NumberOfChildren = MainMenuConsoleGLTF.scene.children.length;
scene.add(MainMenuConsole);
MainMenuConsole.position.set(0,0,25);

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

const ambientLight = new THREE.AmbientLight( 0x64648b,0.1);
ambientLight.position.set(0,0,0);

const spotLight = new THREE.SpotLight(0xffffff, 0.15, 0, Math.PI/2.5, 0.7, 0);
spotLight.position.set(-40,-30,70);
const target = new THREE.Object3D();
target.position.set(40,10,0);
spotLight.target = target;
spotLight.castShadow = true;
const spotlightHelper = new THREE.SpotLightHelper(spotLight);
//scene.add(spotLight,spotlightHelper);

const hemisphereLight = new THREE.HemisphereLight(0xFEFFBD, 0xFF6200, 0.3);
scene.add(hemisphereLight, ambientLight);

CreatePointLight(0, 0.5, 25.5 , 0xFF8400, 30, 3, 10, false);
CreatePointLight(-3, 0.5, 26 , 0xFF8400, 30, 3, 10, false);
CreatePointLight(3, 0.5, 26 , 0xFF8400, 30, 3, 10, false);
CreatePointLight(1.5, 0.5, 26 , 0xFF8400, 30, 3, 10, false);
CreatePointLight(-1.5, 0.5, 26 , 0xFF8400, 30, 3, 10, false);

CreatePointLight(-7.25, 3.8, 27 , 0xFF8400, 1, 0.5, 1, false);
CreatePointLight(7.25, 3.8, 27 , 0xFF8400, 1, 0.5, 1, false);
CreatePointLight(-9, 5, 27 , 0xFF8400, 1, 0.5, 1, false);
CreatePointLight(9, 5, 27 , 0xFF8400, 1, 0.5, 1, false);

CreatePointLight(0, 0, 20 , 0xFF8400, 100, 1, 1, false); //lights up the back

CreatePointLight(0, -2.8, 26 , 0xFF8400, 0.3, 0.5, 1, false);
CreatePointLight(2.3, -2.8, 25.5 , 0xFF8400, 0.3, 0.5, 1, false);
CreatePointLight(-2.3, -2.8, 25.5 , 0xFF8400, 0.3, 0.5, 1, false);


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
  renderer.render(scene, camera);
};

animate();