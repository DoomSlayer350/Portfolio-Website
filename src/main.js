import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { element, texture } from 'three/tsl';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { UVsDebug } from 'three/addons/utils/UVsDebug.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000); //(FOV, Aspect ratio, view_frustrum_near, view_frustrum_far) are the parameters
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
const loader = new GLTFLoader();
const MapLoader = new THREE.TextureLoader();
const MainMenuConsoleGLTF = await loader.loadAsync("src/assets/meshes/MainMenuConsoleMesh.glb");
const MainMenuConsole = MainMenuConsoleGLTF.scene.children[0];
const NumberOfChildren = MainMenuConsoleGLTF.scene.children.length;
console.log(NumberOfChildren);
scene.add(MainMenuConsole);
MainMenuConsole.position.set(0,0,25);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(0,0,0);
const gridHelper = new THREE.GridHelper(1000,100);

camera.position.setZ(30);

scene.add(ambientLight);

const bg_plane_geo = new THREE.PlaneGeometry(1000,1000);
const bg_plane_mat = new THREE.MeshBasicMaterial({color: 0x36454F});
const bg_plane = new THREE.Mesh(bg_plane_geo, bg_plane_mat);
scene.add(bg_plane);

const MousePositionNormalised = {
  x: 0,
  y: 0,
  z: 0
};

const CameraRotationOffset = {
  x: 0,
  y: 0,
  z: 0
};

document.addEventListener("mousemove", (event) => {
  //console.log(event.clientX, event.clientY);
  const ScreenHeight = window.innerHeight;
  const ScreenWidth = window.innerWidth;

  const MousePositionTranslated = {
    x: event.clientX - (ScreenWidth / 2),
    y: event.clientY - (ScreenHeight / 2)
  };

  MousePositionNormalised.x = (MousePositionTranslated.x) / (ScreenWidth / 2);
  MousePositionNormalised.y = (MousePositionTranslated.y) / (ScreenHeight / 2);
  //console.log(MousePositionNormalised.x, MousePositionNormalised.y);
});

function RotateCameraThroughMouseMovement(){
  const RotationMultiplier = 0.1;
  CameraRotationOffset.x = MousePositionNormalised.y * RotationMultiplier;
  CameraRotationOffset.y = MousePositionNormalised.x * RotationMultiplier;
  camera.rotation.x = (CameraRotationOffset.x) * -1;
  camera.rotation.y = (CameraRotationOffset.y) * -1;
};

function animate() {
  requestAnimationFrame(animate);
  RotateCameraThroughMouseMovement();
  renderer.render(scene, camera);
};

animate();