import * as THREE from 'three';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { renderer } from "./renderer.js";
import { scene } from "./scene.js";
import { camera } from "./camera.js";
import { OutputPass } from 'three/examples/jsm/Addons.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

export const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const outputPass = new OutputPass();
composer.addPass(outputPass);

const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
const bloomPass = new UnrealBloomPass(resolution, 0.2, 0.1, 0);
composer.addPass(bloomPass);