import { Vector3 } from "three";
import Behaviour from "./Behaviour";
import Boid from "./Boid";
import World from "./World";

export default class FlockingBehaviour implements Behaviour{

    private readonly boids: Array<Boid> 

    constructor(boids: Array<Boid>){
        this.boids = boids
    }

    updateTarget(boid: Boid): boolean {return false}

    updateFlocking(boid: Boid){
        const alignment = new Vector3()
        const cohesion = new Vector3()
        const separation = new Vector3()
        
        let totalNeighbour: number = 0
        for(const neighbourBoid of this.boids){
            if(!neighbourBoid.position.equals(boid.position) && neighbourBoid.position.distanceTo(boid.position) < World.flockRadius){
                ++totalNeighbour                
                let distance = boid.position.distanceTo(neighbourBoid.position)
                distance = distance === 0 ? 0.000001: distance

                separation.add(boid.position.clone().sub(neighbourBoid.position).divideScalar(distance))
                alignment.add(neighbourBoid.velocity)
                cohesion.add(neighbourBoid.position)

            }
        }

        if(totalNeighbour > 0){
            alignment
            .divideScalar(totalNeighbour)
            .multiplyScalar(World.flockAlignment)

            cohesion
            .divideScalar(totalNeighbour)
            .sub(boid.position)
            .multiplyScalar(World.flockCohesion)

            separation
            .divideScalar(totalNeighbour)
            .multiplyScalar(World.flockSeparation)
        
            boid.target
            .add(alignment)
            .add(cohesion)
            .add(separation)
        }
    }

    separation(){

    }

    cohesion(){

    }

    alignment(){

    }



}