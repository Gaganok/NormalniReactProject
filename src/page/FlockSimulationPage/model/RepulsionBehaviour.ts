import { Vector3 } from "three";
import Behaviour from "./Behaviour";
import Boid from "./Boid";
import BoidUtils from "./BoidUtils";

export default class RepulsionBehaviour implements Behaviour{
    private targetVector: Vector3 = new Vector3;

    updateTarget(boid: Boid): boolean {
        // const REFRACTION_DISTANCE = 2
        // const distance = position.distanceTo(this.targetVector)

        // if(distance < REFRACTION_DISTANCE){
        //     const newDirectionVector = new Vector3()
        //     .addScalar(1)
        //     .applyAxisAngle(new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1), Math.random() * 180);
        //     this.targetVector = BoidUtils.getEnvSphereIntersectVector(new Vector3(), newDirectionVector)
        // }

        return false
    }
    
    getTarget(): Vector3 {
        return this.targetVector;
    }

}