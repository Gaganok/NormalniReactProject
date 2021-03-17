import React, { useEffect } from 'react';
import * as THREE from 'three'
import { Vector3 } from 'three'
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

export interface FlockProps {}

// const BOIDS = new Array<THREE.Mesh>()
// const boid: Boid = new Boid();
const boids: Array<Boid> = [];

const stats = new Stats()

const behaviour: Behaviour = new PointDirectedBehaviour()

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
    
    for(let i = 0; i < 2000; ++i){
        const boidMesh = new THREE.Mesh(Geometry.BoidConeGeometry, Material.BoidMaterial);
        const boid = new Boid()
        boid.mesh = boidMesh
        boids.push(boid)
        scene.add(boidMesh)
    }

    //PointSphere
    const s1 = new THREE.SphereBufferGeometry()
    const m1 = new THREE.MeshBasicMaterial({color: 0xffff00})
    
    const pointSphere = new THREE.Mesh(s1, m1)
    scene.add(pointSphere)

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

        if(boid.mesh != null){
            const boidMesh = boid.mesh
            const rotationMatrix = new THREE.Matrix4();
            rotationMatrix.lookAt(boid.position, boidMesh.position, boidMesh.up);
    
            const targetQuaternion = new THREE.Quaternion();
    
            targetQuaternion.setFromRotationMatrix(rotationMatrix);
            boidMesh.quaternion.rotateTowards(targetQuaternion, 0.08)
            boidMesh.position.copy(boid.position)
        }
    }

    function initGui(): HTMLElement{
        const gui = new GUI.GUI({autoPlace: false})
        // const cubeFolder = gui.addFolder("Cube")
        // cubeFolder.add(point, "x", -15, 15, 0.1)
        // cubeFolder.open()

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