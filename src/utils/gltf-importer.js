import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { scene } from '/src/scene.js';

const loader = new GLTFLoader();

export async function LoadGLTFScene(filepath){
    try{
        const GLTFScene = await loader.loadAsync(filepath);
        return GLTFScene.scene;
    } catch (error){
        console.error("Failed to load scene: ",error);
    };
};

export async function LoadGLTFMesh(filepath){
    try{
        const GLTFScene = await loader.loadAsync(filepath);
        return GLTFScene.scene.children[0];
    } catch (error){
        console.error("Failed to load model: ",error);
    };
};