import { Vector3 } from "three";
import Boid from "./Boid";

export default interface Behaviour{
    // targetVector: Vector3 
    // getTarget(): Vector3
    updateTarget(boid: Boid): boolean
}