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

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(0,0,0);
scene.add(ambientLight);

/* Helpers */

const gridHelper = new THREE.GridHelper(1000,100);

/* Background Plane */

const bg_plane_geo = new THREE.PlaneGeometry(1000,1000);
const bg_plane_mat = new THREE.MeshBasicMaterial({color: 0x36454F});
const bg_plane = new THREE.Mesh(bg_plane_geo, bg_plane_mat);
scene.add(bg_plane);

/* Animate */

function animate() {
  requestAnimationFrame(animate);
  RotateCameraThroughMouseMovement(0.1);
  renderer.render(scene, camera);
};

animate();