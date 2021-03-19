import { MeshDistanceMaterial, Vector3 } from "three";
import Behaviour from "./Behaviour";
import Boid from "./Boid";
import BoidUtils from "./BoidUtils";

export default class CentrifugalBehaviour implements Behaviour{
    private readonly centerRadius: number = 10
    private readonly center: Vector3 = new Vector3()
    private readonly centerpetalForce = 1

    private movDir = new Vector3(0, 0, 1)

    updateTarget(boid: Boid): boolean {
        const centerVector = this.center.clone()
        .sub(boid.position)
        .normalize()
        .multiplyScalar(1.8)
        // .subScalar(1.5)

        // const target = boid.target.clone()
        // const accVector = target.multiply(target).divideScalar(this.centerRadius)
        

        this.movDir = new Vector3(0, 0, 1).normalize()
        // this.movDir = this.movDir.normalize()
        .multiplyScalar(2)
        .add(centerVector)
        
        // const movDir = new Vector3(1, -1, 1).normalize()
        // .multiplyScalar(2)
        // .add(centerVector)
        // const newDirVectory = movinGDir.clone().add(centerVector)
        // newDirVectory.multiplyScalar(2)

        // const newTarget = boid.position.clone()
        // newTarget.add(newDirVectory)
        // ne
        
        boid.target = boid.position.clone().add(this.movDir)
        
        return false
    }



}