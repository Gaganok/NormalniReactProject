import { threadId } from "node:worker_threads";
import { Vector3 } from "three";

class Boid{
    constructor(
        public position: Vector3  = new Vector3(),
        public velocity: Vector3  = new Vector3(),
        public acceleration: Vector3 = new Vector3(),
        public maxSpeed: Vector3 = new Vector3().addScalar(2),
        public maxForce: Vector3 = new Vector3().addScalar(0.01),
    ){}

    steer(target: Vector3){
        let des = new Vector3()
        .copy(target)
        .sub(this.position)

        const distance = this.position.distanceTo(target) + 0.00001

        // this.maxSpeed.subScalar(distance / this.maxSpeed.x)
        const maxSpeedArrival = this.maxSpeed.clone()
        .subScalar(this.maxSpeed.x / distance)
        .max(new Vector3())
        .min(this.maxSpeed)

        des.normalize()
        des.multiply(maxSpeedArrival)
        des.sub(this.velocity)

        

        const max = new Vector3().copy(this.maxForce)
        const min = new Vector3().copy(this.maxForce).multiplyScalar(-1)

        des.clamp(min, max)

        this.applyForce(des)
    }

    applyForce(force: Vector3){
        this.acceleration.add(force)
    }

    update(){
        this.velocity.add(this.acceleration).min(this.maxSpeed)
        this.position.add(this.velocity)
        this.acceleration.multiplyScalar(0)
    }
}



export default Boid