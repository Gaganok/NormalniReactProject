import { MeshDistanceMaterial, Vector3 } from "three";
import Behaviour from "./Behaviour";
import Boid from "./Boid";
import World from "./World";

export default class CentrifugalBehaviour implements Behaviour{
    private movDir = new Vector3(0, 0, 1)

    updateTarget(boid: Boid): boolean {
        const centerVector = World.worldCenter.clone()
        .sub(boid.position)
        .normalize()
        .multiplyScalar(World.centripetalForce)

        this.movDir = this.movDir.normalize()
        .multiplyScalar(2)
        .add(centerVector)
        
        boid.target = boid.position.clone().add(this.movDir)
    
        return false
    }



}