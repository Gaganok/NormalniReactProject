import { BackSide, BoxBufferGeometry, ConeGeometry, SphereBufferGeometry, SphereGeometry, Vector3 } from 'three'
import * as THREE from 'three'

export default class Material{
    static BoidMaterial = new THREE.MeshBasicMaterial({color: 0xffffff}) 
    static EnvCubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true}) 
    static EnvSphereMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, side: BackSide})
}