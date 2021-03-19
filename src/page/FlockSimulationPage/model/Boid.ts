import { Vector3 } from "three";

type Mesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>

class Boid{
    public position: Vector3  = new Vector3()
    public velocity: Vector3  = new Vector3()
    public maxSpeed: Vector3 = new Vector3().addScalar(0.1)
    public maxForce: Vector3 = new Vector3().addScalar(0.01)
    public target: Vector3 = new Vector3()
    public mesh?: Mesh


    constructor()
    constructor(mesh: Mesh); 
    constructor(mesh?: Mesh){
        if(mesh != null){
            this.mesh = mesh
            this.position = mesh.position

            const pos = new Vector3(2, 2, 0)

            this.target = new Vector3(0, 0, 2)//pos
            mesh.position.set(2, 2, 0)
            this.position = pos
            // this.target = mesh.position.clone().addScalar(1)
            // this.position.
        }
    }

    steer(): Vector3{
        let acceleration = this.target.clone()
        .sub(this.position)

        const distance = this.position.distanceTo(this.target) + 0.00001

        // this.maxSpeed.subScalar(distance / this.maxSpeed.x)
        // const maxSpeedArrival = this.maxSpeed.clone()
        // .subScalar(this.maxSpeed.x / distance)
        // .clamp(new Vector3(), this.maxSpeed)

        const maxSpeedArrival = this.maxSpeed.clone()

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