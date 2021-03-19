import { Vector3 } from "three";
import Behaviour from "./Behaviour";
import Boid from "./Boid";
import BoidUtils from "./BoidUtils";
import World from "./World";

export default class PointDirectedBehaviour implements Behaviour{
    updateTarget(boid: Boid): boolean {
        const distance = boid.position.distanceTo(boid.target)
        const targetUpdated = distance < World.refractionDistance

        if(targetUpdated){
            const newDirectionVector = new Vector3()
            .addScalar(1)
            .applyAxisAngle(new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1), Math.random() * 180);
            boid.target = BoidUtils.getEnvSphereIntersectVector(new Vector3(), newDirectionVector)
        }

        return targetUpdated
    }

}