import React, { useEffect } from 'react';
import * as THREE from 'three'
import { BackSide, ConeGeometry, SphereGeometry, Vector3 } from 'three'
import * as GUI from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Boid from './model/Boid'
import "./style/style.scss";

export interface FlockProps {}

const BOIDS = new Array<THREE.Mesh>()

const b: Boid = new Boid();

const TheePage: React.FunctionComponent<FlockProps> = () => {
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth) / (window.innerHeight), 0.1, 1000 );
    camera.position.z = 100;
    
    const renderer = new THREE.WebGLRenderer();

    const WINDOW_WIDTH_SCALE = 300;
    const WINDOW_HEIGHT_SCALE = 150;
    renderer.setSize( window.innerWidth - WINDOW_WIDTH_SCALE, window.innerHeight - WINDOW_HEIGHT_SCALE);

    const envGeometry = new THREE.BoxGeometry();
    const boidGeometry = new THREE.ConeGeometry(1, 5, 8);
    boidGeometry.rotateX( Math.PI * 0.5 );

    const BOID_SCALE = 1
    const ENV_SCALE = 20

    envGeometry.scale(ENV_SCALE, ENV_SCALE, ENV_SCALE)
    boidGeometry.scale(BOID_SCALE, BOID_SCALE, BOID_SCALE)

    const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, side: BackSide} );
    const solidMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff});

    const envCube = new THREE.Mesh( envGeometry, wireframeMaterial );
    const boid = new THREE.Mesh( boidGeometry, solidMaterial );
    BOIDS.push(boid)



    const spherePoint = new THREE.Mesh(new SphereGeometry(), wireframeMaterial)

    // boid.position.addScaledVector(new Vector3(, 0, 0), 1)

    scene.add(envCube, boid);
    scene.add(spherePoint);

    const animate = function () {
        requestAnimationFrame( animate );

        updateBoids()

        renderer.render( scene, camera );
    };

    function updateBoids(){
        // b.maxSpeed = new Vector3().addScalar(0.03)
        b.maxForce = new Vector3().addScalar(0.05)
        b.maxSpeed = new Vector3().addScalar(0.7)

        b.steer(spherePoint.position)
        b.update()

        const rotationMatrix = new THREE.Matrix4();
        rotationMatrix.lookAt(b.position, boid.position, boid.up);

        const targetQuaternion = new THREE.Quaternion();

        targetQuaternion.setFromRotationMatrix( rotationMatrix );


        // const Quaternion = new THREE.Quaternion().setFromUnitVectors(
        //     boid.position.clone().normalize(), 
        //     b.position.clone().normalize())

        boid.quaternion.rotateTowards(targetQuaternion, 0.2)

        boid.position.copy(b.position)
        
        // spherePoint.position.z += 0.001
        // spherePoint.position.x += 0.005
        // spherePoint.position.y += 0.01
    }

    function collisionCheck(boidPosition: Vector3, direction: Vector3): number{
        const raycaster = new THREE.Raycaster(boidPosition, direction);
        const intersects = raycaster.intersectObject(envCube);
        return intersects[0] != null ? intersects[0].distance : 0
    }

    function normalize(value: number, min: number, max: number): number{
        return (value - min) / (max - min)
    }

    function initGui(): HTMLElement{
        const gui = new GUI.GUI({autoPlace: false})
        // gui.domElement.id = 'datgui'

        const cubeFolder = gui.addFolder("Cube")
        cubeFolder.add(spherePoint.position, "x", -100, 100, 1)
        cubeFolder.add(spherePoint.position, "y", -100, 100, 1)
        cubeFolder.add(spherePoint.position, "z", -100, 100, 1)
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

        sceneElement.appendChild(renderer.domElement)
        sceneElement.appendChild(gui)

        animate()
    }, []);

    return ( 
        <div id='scene' />
    );
}
 
export default TheePage;