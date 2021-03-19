import { Vector3 } from "three";
import * as THREE from 'three'

class Line{
    private line: THREE.Line
    private geometry = new THREE.BufferGeometry();
    private readonly points = new Float32Array(2 * 3);
    private readonly material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 15});

    constructor(origin: Vector3, destination: Vector3){
        this.setLineOrigin(origin)
        this.setLineDest(destination)
        this.geometry.addAttribute('position', new THREE.BufferAttribute(this.points, 3))
        this.line = new THREE.Line( this.geometry, this.material );
    }

    update(origin?: Vector3, dest?: Vector3){
        origin != null && this.setLineOrigin(origin)
        dest != null && this.setLineDest(dest)
        this.geometry.attributes.position.needsUpdate = true;
    }

    getLine(): THREE.Line{
        return this.line
    }

    private setLineOrigin(origin: Vector3){
        this.points[0] = origin.x
        this.points[1] = origin.y
        this.points[2] = origin.z
    }

    private setLineDest(dest: Vector3){
        this.points[3] = dest.x
        this.points[4] = dest.y
        this.points[5] = dest.z
    }
}



export default Line