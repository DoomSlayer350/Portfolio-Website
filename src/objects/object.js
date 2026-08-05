import * as THREE from "three";
import { gsap } from "gsap";

export class WorldObject extends THREE.Object3D{
    constructor(mesh, timeline){
        super();
        this.mesh = mesh;
        this.timeline = timeline;
    };
    InterpolateToPoint(Point, Duration, EaseMethod, PositionInTimeline=null){
        /*if (gsap.isTweening(this.mesh.position)){
            return true;
        };
        */
        if (PositionInTimeline == null){
            this.timeline.to(this.mesh.position, {x:Point.x, y:Point.y, z:Point.z, ease:EaseMethod, duration:Duration});
            return;
        };
        this.timeline.to(this.mesh.position, {x:Point.x, y:Point.y, z:Point.z, ease:EaseMethod, duration:Duration}, PositionInTimeline);
    };
};