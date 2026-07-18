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

const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
ambientLight.position.set(0,0,0);
const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0.1);
const pointlightHelper = new THREE.PointLightHelper(pointLight);
pointLight.position.set(-20,-13,40);
pointLight.castShadow = true;
scene.add(ambientLight, pointLight, pointlightHelper);

const spotLight1 = new THREE.SpotLight(0xffffff, 0.3, 0, Math.PI/2.5, 1, 0);
spotLight1.position.set(-80,40,100);
spotLight1.rotateX(70);
spotLight1.rotateY(70);
const spotlightHelper1 = new THREE.SpotLightHelper(spotLight1);
scene.add(spotLight1,spotlightHelper1);
const spotLight2 = new THREE.SpotLight(0xffffff, 0.3, 0, Math.PI/2.5, 1, 0.1);
spotLight2.position.set(-6,4,35);
spotLight2.rotateX(20);
spotLight2.rotateY(40);
const spotlightHelper2 = new THREE.SpotLightHelper(spotLight2);
scene.add(spotLight2, spotlightHelper2)
const spotLight3 = new THREE.SpotLight(0xffffff, 0.3, 0, Math.PI/2.5, 1, 0.1);
spotLight3.position.set(15,-2,35);
spotLight3.rotateX(0);
spotLight3.rotateY(-15);
const spotlightHelper3 = new THREE.SpotLightHelper(spotLight3);
scene.add(spotLight3, spotlightHelper3);
const spotLight4 = new THREE.SpotLight(0xffffff, 0.3, 0, Math.PI/4, 1, 0.1);
spotLight4.position.set(0,-9,35);
spotLight4.rotation.x = 1;
const spotlightHelper4 = new THREE.SpotLightHelper(spotLight4);
scene.add(spotLight4, spotlightHelper4);
const hemisphereLight = new THREE.HemisphereLight(0x00000, 0xfffff, 0.1);
scene.add(hemisphereLight);

/* Helpers */

const gridHelper = new THREE.GridHelper(1000,100);

/* Background Plane */

const bg_plane_geo = new THREE.PlaneGeometry(1000,1000);
const bg_plane_mat = new THREE.MeshStandardMaterial({color: 0x36454F});
const bg_plane = new THREE.Mesh(bg_plane_geo, bg_plane_mat);
scene.add(bg_plane);

/* Animate */

function animate() {
  requestAnimationFrame(animate);
  RotateCameraThroughMouseMovement(0.5); //0.1 is default
  renderer.render(scene, camera);
};

animate();