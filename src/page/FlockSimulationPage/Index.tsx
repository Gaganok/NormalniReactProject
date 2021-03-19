import React, { useEffect } from 'react';
import * as THREE from 'three'
import { BufferAttribute, Vector3 } from 'three'
import Geometry from './model/Geometry'
import Material from './model/Material'
import * as GUI from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Boid from './model/Boid'
import "./style/style.scss";
import { BorderInnerOutlined } from '@material-ui/icons';
import World from './model/World';
import Behaviour from './model/Behaviour';
import PointDirectedBehaviour from './model/PointDirectedBehaviour';
import Stats from 'stats.js';
import CentrifugalBehaviour from './model/CentrifugalBehaviour';
import Line from './model/Line';

export interface FlockProps {}

const boids: Array<Boid> = [];
const stats = new Stats()
const BOID_AMOUNT: number = 1
// const behaviour: Behaviour = new PointDirectedBehaviour()
const behaviour: Behaviour = new CentrifugalBehaviour()

const TheePage: React.FunctionComponent<FlockProps> = () => {
    Geometry.init()

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth) / (window.innerHeight), 0.1, 1000 );
    camera.position.z = 25;
    
    const renderer = new THREE.WebGLRenderer();

    const WINDOW_WIDTH_SCALE = 300;
    const WINDOW_HEIGHT_SCALE = 150;
    renderer.setSize( window.innerWidth - WINDOW_WIDTH_SCALE, window.innerHeight - WINDOW_HEIGHT_SCALE);

    // const envCube = new THREE.Mesh(Geometry.EnvCubeGeometry, Material.EnvCubeMaterial);
    // scene.add(envCube);

    const envSphere = new THREE.Mesh(Geometry.EnvSphereGeometry, Material.EnvSphereMaterial)
    World.envSphere = envSphere;
    
    scene.add(envSphere);
    
    // for(let i = 0; i < BOID_AMOUNT; ++i){
        const boidMesh = new THREE.Mesh(Geometry.BoidConeGeometry, Material.BoidMaterial);
        // boidMesh.position.add(Scalar(3))

        const boid = new Boid(boidMesh)
        boids.pop()
        boids.push(boid)
        scene.add(boidMesh)
    // }

    //PointSphere
    const s1 = new THREE.SphereBufferGeometry()
    const m1 = new THREE.MeshBasicMaterial({color: 0xffff00})
    const pointSphere = new THREE.Mesh(s1, m1)
    scene.add(pointSphere)

    const boidUp = boidMesh.up.clone()
    const line1: Line = new Line(boidUp, boidUp.clone().multiplyScalar(2))
    const line2: Line = new Line(boid.position, boid.target)

    scene.add(line1.getLine(), line2.getLine())
    
    // const boidUp = boidMesh.up.clone()
    // // const points = new Array<Vector3>();
    // // points.push(boidUp.clone().multiplyScalar(2));
    // const geometry = new THREE.BufferGeometry();
    // const points = new Float32Array(2 * 3);
    // // const bufferAttribute: BufferAttribute = new BufferAttribute()
    // geometry.addAttribute('position', new THREE.BufferAttribute(points, 3) )//'position', new THREE.BufferAttribute(points, 2));

    // const material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 15});
    // const line = new THREE.Line( geometry, material );
    // line.
    // scene.add( line );

    const animate = function () {
        requestAnimationFrame( animate );

        stats.update()

        for(const boid of boids){
            updateBoids(boid)
        }

        renderer.render( scene, camera );
    };

    function updateBoids(boid: Boid){
        if(behaviour.updateTarget(boid)){
            // pointSphere.position.multiplyScalar(0).add(boid.target)
        }
        
        boid.update()

        line1.update(boid.mesh!.up, boid.mesh!.up.clone().multiplyScalar(2))
        line2.update(boid.position, boid.target)

        // line.geometry = new THREE.BufferGeometry().setFromPoints([
        //     boid.mesh!.up, boid.mesh!.up.multiplyScalar(2)]);

        if(boid.mesh != null){
            const boidMesh = boid.mesh
            const rotationMatrix = new THREE.Matrix4();
            rotationMatrix.lookAt(boid.target, boidMesh.position, boidMesh.up);
    
            const targetQuaternion = new THREE.Quaternion();
    
            targetQuaternion.setFromRotationMatrix(rotationMatrix);
            boidMesh.quaternion.rotateTowards(targetQuaternion, 0.08)
            boidMesh.position.copy(boid.position)
        }
    }

    function initGui(): HTMLElement{
        const gui = new GUI.GUI({autoPlace: false})

        const cubeFolder = gui.addFolder("Cube")
        cubeFolder.add(boids[0].target, "x", -15, 15, 0.1)
        cubeFolder.add(boids[0].target, "y", -15, 15, 0.1)
        cubeFolder.add(boids[0].target, "z", -15, 15, 0.1)
        cubeFolder.open()

        gui.domElement.id = 'scene__gui'
        return gui.domElement;
    }

    useEffect(() => {
        const controls = new OrbitControls(camera, renderer.domElement);
        const gui: HTMLElement = initGui()

        const sceneElement = document.getElementById('scene')!;

        while(sceneElement.lastChild != null){
            sceneElement.removeChild(sceneElement.lastChild)
        }

        stats.showPanel(0)

        sceneElement.appendChild(renderer.domElement)
        sceneElement.appendChild(gui)
        sceneElement.appendChild(stats.dom)

        animate()
    }, []);

    return ( 
        <div id='scene' />
    );
}
 
export default TheePage;