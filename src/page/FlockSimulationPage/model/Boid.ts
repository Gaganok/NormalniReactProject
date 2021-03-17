import { Vector3 } from "three";

class Boid{
    constructor(
        public position: Vector3  = new Vector3(),
        public velocity: Vector3  = new Vector3(),
        public maxSpeed: Vector3 = new Vector3().addScalar(0.3),
        public maxForce: Vector3 = new Vector3().addScalar(0.01),
        public target: Vector3 = new Vector3(),
        public mesh?: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>
    ){}

    steer(): Vector3{
        let acceleration = this.target.clone()
        .sub(this.position)

        const distance = this.position.distanceTo(this.target) + 0.00001

        // this.maxSpeed.subScalar(distance / this.maxSpeed.x)
        const maxSpeedArrival = this.maxSpeed.clone()
        .subScalar(this.maxSpeed.x / distance)
        // .clamp(new Vector3(), this.maxSpeed)

        acceleration
        .normalize()
        .multiply(maxSpeedArrival)
        .sub(this.velocity)
        .clamp(
            this.maxForce.clone().multiplyScalar(-1),
            this.maxForce
        )

        return acceleration
    }

    update(){
        const acceleration: Vector3 = this.steer()
        this.position.add(
            this.velocity.add(acceleration).min(this.maxSpeed))
    }
}



export default Boid