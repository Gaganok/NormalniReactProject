import { Vector3 } from "three";
import BoidUtils from "./BoidUtils";
import World from "./World";

type Mesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>

class Boid{
    private maxSpeedVector = new Vector3()
    private maxForceVector = new Vector3()
    // public acceleration = new Vector3()
    public moveDirVecotor = new Vector3()
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

            const positionVector = new Vector3(
                BoidUtils.random(World.boidDislocationMin, World.boidDislocationMax),
                BoidUtils.random(World.boidDislocationMin, World.boidDislocationMax),
                BoidUtils.random(World.boidDislocationMin, World.boidDislocationMax),
            )

            this.moveDirVecotor = new Vector3(
                BoidUtils.random(-1, 1),
                BoidUtils.random(-1, 1),
                BoidUtils.random(-1, 1),
            )
            
            // const targetVector = new Vector3(
            //     BoidUtils.random(-5, 5),
            //     BoidUtils.random(-5, 5),
            //     BoidUtils.random(-5, 5),
            // )

            // this.target = targetVector
            mesh.position.set(positionVector.x, positionVector.y, positionVector.z)
            this.position = positionVector
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

        // Alignment in speed


        this.position.add(
            this.velocity.add(acceleration).min(this.maxSpeedVector))
    }
}



export default Boid