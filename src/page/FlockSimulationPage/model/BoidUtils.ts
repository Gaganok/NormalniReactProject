import * as THREE from "three";
import { Vector3 } from "three";
import World from "./World";

export default class BoidUtils{
    static envSphere = World.envSphere

    static getEnvSphereDistance(position: Vector3, direction: Vector3): number{
        const intersection = this.getIntersection(position, direction)
        return intersection != null ? intersection.distance : 0
    }

    static getEnvSphereIntersectVector(position: Vector3, direction: Vector3): Vector3{
        const intersection = this.getIntersection(position, direction)
        return intersection != null ? intersection.point : new Vector3()
    }

    static random(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private static getIntersection(position: Vector3, direction: Vector3): THREE.Intersection{
        const raycaster = new THREE.Raycaster(position, direction);
        const intersects = raycaster.intersectObject(World.envSphere);
        return intersects[0]
    }
}