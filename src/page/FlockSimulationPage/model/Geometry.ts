import { BackSide, BoxBufferGeometry, ConeGeometry, SphereBufferGeometry, SphereGeometry, Vector3 } from 'three'
import * as THREE from 'three'

export default class Geometry{
    private static ENV_CUBE_SCALE: number = 20;
    private static ENV_SPHERE_SCALE: number = 15;

    static BoidConeGeometry = new THREE.ConeBufferGeometry().scale(1, 3, 1).rotateX(Math.PI / 2)
    static EnvCubeGeometry = new BoxBufferGeometry().scale(Geometry.ENV_CUBE_SCALE, Geometry.ENV_CUBE_SCALE, Geometry.ENV_CUBE_SCALE);
    static EnvSphereGeometry = new SphereBufferGeometry().scale(Geometry.ENV_SPHERE_SCALE, Geometry.ENV_SPHERE_SCALE, Geometry.ENV_SPHERE_SCALE)

    static init(){
        this.EnvSphereGeometry.computeBoundingSphere();
    }
}