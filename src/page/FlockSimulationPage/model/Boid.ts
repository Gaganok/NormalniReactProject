import { Vector3 } from "three";
import World from "./World";

type Mesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>

class Boid{
    private maxSpeedVector = new Vector3()
    private maxForceVector = new Vector3()
    public position: Vector3  = new Vector3()
    public velocity: Vector3  = new Vector3()
    public target: Vector3 = new Vector3()
    public mesh?: Mesh

    constructor()
    constructor(mesh: Mesh); 
    constructor(mesh?: Mesh){
        if(mesh != null){
            this.mesh = mesh
            this.position = mesh.position

            const pos = new Vector3(2, 2, 0)

            this.target = pos
            mesh.position.set(2, 2, 0)
            this.position = pos
        }
    }

    steer(): Vector3{
        let acceleration = this.target.clone()
        .sub(this.position)

        const distance = this.position.distanceTo(this.target) + 0.00001
        const maxSpeedArrival = this.maxSpeedVector.clone()
        .subScalar(World.maxSpeed / distance)
        .clamp(new Vector3(), this.maxSpeedVector)

        acceleration
        .normalize()
        .multiply(maxSpeedArrival)
        .sub(this.velocity)
        .clamp(
            this.maxForceVector.clone().multiplyScalar(-1),
            this.maxForceVector
        )

        return acceleration
    }

    update(){
        this.maxSpeedVector = new Vector3().addScalar(World.maxSpeed)
        this.maxForceVector = new Vector3().addScalar(World.maxForce)

        const acceleration: Vector3 = this.steer()
        this.position.add(
            this.velocity.add(acceleration).min(this.maxSpeedVector))
    }
}



export default Boid