import { Object3D, Vector3 } from "three";

export default class World{
    static envSphere: Object3D
    static worldCenter: Vector3 = new Vector3(0, 0, 0)
    static maxSpeed: number = 0.4
    static maxForce: number = 0.01
    static refractionDistance: number = 2
    static centripetalForce: number = 0.05

    static boidAmount = 250

    static boidDislocationMin: number = -20
    static boidDislocationMax: number = 20

    static flockRadius: number = 10
    static flockSeparation: number = 1.2
    static flockAlignment: number = 1
    static flockCohesion: number = 1
    
}