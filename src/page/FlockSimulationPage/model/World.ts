import { Object3D, Vector3 } from "three";

export default class World{
    static envSphere: Object3D
    static worldCenter: Vector3 = new Vector3(0, 0, 0)
    // static maxSpeed: Vector3 = new Vector3(0.4, 0.4, 0.4)
    // static maxForce: Vector3 = new Vector3(0.01, 0.01, 0.01)
    static maxSpeed: number = 0.4
    static maxForce: number = 0.01
    static refractionDistance: number = 2
    static centripetalForce: number = 0.1
    
}