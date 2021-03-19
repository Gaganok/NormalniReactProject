import { MeshDistanceMaterial, Vector3 } from "three";
import Behaviour from "./Behaviour";
import Boid from "./Boid";
import BoidUtils from "./BoidUtils";

export default class CentrifugalBehaviour implements Behaviour{
    private readonly centerRadius: number = 10
    private readonly center: Vector3 = new Vector3()

    updateTarget(boid: Boid): boolean {
        // const distance = this.center.distanceTo(boid.target)
        const centerVector = this.center.clone().sub(boid.position)
        // centerVector.multiply(centerVector).divideScalar(distance).normalize()
        // .clamp(new Vector3().addScalar(-0.1),new Vector3().addScalar(0.1))
        
        // console.log(centerVector)
        // const inertia = boid.target

        // const distance = this.center.distanceTo(boid.position)
        // boid.target.applyAxisAngle(this.center, Math.PI)
        // const angleToCenter: number = boid.target.angleTo(this.center)

        const target = boid.target.clone()
        const accVector = target.multiply(target).divideScalar(this.centerRadius)

        const changedVector = boid.target.clone()
        // boid.target.add(accVector)
        boid.target
        // .multiplyScalar(0)
        .add(new Vector3(0.1, -0.5, 0))

        // .add(new Vector3(-3, -3, -12))
        .add(centerVector)
        
        // .normalize()
        // .multiplyScalar(5)
        // .sub(centerVector)
        // .normalize()
        // .add(centerVector)
        // boid.target
        // .normalize()
        // .add(centerVector)
        // .addScalar(1)

        // boid.target.add(new Vector3(0.2, 0, 0.2))

        // boid.target = centerVector

        return false
    }



}