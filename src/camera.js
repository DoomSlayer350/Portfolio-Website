import * as THREE from 'three';

export const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000); //(FOV, Aspect ratio, view_frustrum_near, view_frustrum_far) are the parameters

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

export function RotateCameraThroughMouseMovement(RotationMultiplier){
  CameraRotationOffset.x = MousePositionNormalised.y * RotationMultiplier;
  CameraRotationOffset.y = MousePositionNormalised.x * RotationMultiplier;
  camera.rotation.x = (CameraRotationOffset.x) * -1;
  camera.rotation.y = (CameraRotationOffset.y) * -1;
};