import { threadId } from "node:worker_threads";
import { Vector3 } from "three";

class Boid{
    constructor(
        public position: Vector3  = new Vector3(0, 0, 0),
        public velocity: Vector3  = new Vector3(0, 0, 0),
        public acceleration: Vector3 = new Vector3(0, 0, 0),
        public maxSpeed: Vector3 = new Vector3(1, 1, 1),
        public maxForce: Vector3 = new Vector3(0.01, 0.01, 0.01),
    ){}

    steer(target: Vector3){
        let des =new Vector3()
        .copy(target)
        .sub(this.position)

        des.normalize()
        des.multiply(this.maxSpeed)
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