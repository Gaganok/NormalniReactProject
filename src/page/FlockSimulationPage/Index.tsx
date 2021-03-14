import { ThreeDRotation } from '@material-ui/icons';
import React, { useEffect } from 'react';
import * as THREE from 'three'
import { BackSide, ConeGeometry, SphereGeometry, Vector3 } from 'three'
// import {GUI} from 'dat.gui'
import * as GUI from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Boid from './model/Boid'

export interface FlockProps {}

const BOIDS = new Array<THREE.Mesh>()

const b: Boid = new Boid();

const TheePage: React.FunctionComponent<FlockProps> = () => {
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth) / (window.innerHeight), 0.1, 1000 );
    camera.position.z = 25;
    
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

        // updateBoids()
        updateBoidV2()

        renderer.render( scene, camera );
    };

    // const target = spherePoint.position  //new Vector3(0, -10, 0)
    function updateBoidV2(){
        b.maxSpeed = new Vector3().addScalar(0.03)
        // b.maxForce = new Vector3().multiplyScalar(1)

        b.steer(spherePoint.position)
        b.update()

        const rotationMatrix = new THREE.Matrix4();
        rotationMatrix.lookAt(b.position, boid.position, boid.up);

        const targetQuaternion = new THREE.Quaternion();

        targetQuaternion.setFromRotationMatrix( rotationMatrix );


        // const Quaternion = new THREE.Quaternion().setFromUnitVectors(
        //     boid.position.clone().normalize(), 
        //     b.position.clone().normalize())

        boid.quaternion.rotateTowards(targetQuaternion, 0.05)

        boid.position.copy(b.position)
        
        // spherePoint.position.z += 0.001
        // spherePoint.position.x += 0.005
        // spherePoint.position.y += 0.01
    }

    function updateBoids(){
        let BOID_SPEED = 0.5;
        const SPEEDV = new Vector3(0, 0.1, 0)
        // let ACCELERATION = [];
        for(const boid of BOIDS){
            const distanceToX = collisionCheck(boid.position, new THREE.Vector3(1, 0, 0))
            const distanceToY = collisionCheck(boid.position, new THREE.Vector3(0, 1, 0))
            const distanceToZ = collisionCheck(boid.position, new THREE.Vector3(0, 0, 1))
            
            const distanceFromX = collisionCheck(boid.position, new THREE.Vector3(-1, 0, 0))
            const distanceFromY = collisionCheck(boid.position, new THREE.Vector3(0, -1, 0))
            const distanceFromZ = collisionCheck(boid.position, new THREE.Vector3(0, 0, -1))

            const x = normalize(distanceToX, 0, 20) - normalize(distanceFromX, 0, 20)
            const y = normalize(distanceToY, 0, 20) - normalize(distanceFromY, 0, 20)
            const z = normalize(distanceToZ, 0, 20) - normalize(distanceFromZ, 0, 20)

            
            // const velocity = new Vector3(x, y, z)
            const velocity = new Vector3(0.05, 0, 0)


            // BOID_SPEED += x

            // boid.position.add(new Vector3(BOID_SPEED, BOID_SPEED, BOID_SPEED)).min(velocity)
            const speed = new Vector3()
            speed.addVectors(SPEEDV, velocity)            
            boid.position.add(speed)
        }
    }

    function collisionCheck(boidPosition: Vector3, direction: Vector3): number{
        const raycaster = new THREE.Raycaster(boidPosition, direction);
        const intersects = raycaster.intersectObject(envCube);
        return intersects[0] != null ? intersects[0].distance : 0
    }

    function normalize(value: number, min: number, max: number): number{
        return (value - min) / (max - min)
    }

    function initGui(){
        const gui = new GUI.GUI({autoPlace: false})
        // gui.domElement.id = 'datgui'

        const cubeFolder = gui.addFolder("Cube")
        cubeFolder.add(spherePoint.position, "x", -20, 20, 1)
        cubeFolder.add(spherePoint.position, "y", -20, 20, 1)
        cubeFolder.add(spherePoint.position, "z", -20, 20, 1)
        cubeFolder.open()

        document.getElementById('datgui')?.appendChild(gui.domElement)
        // cubeFolder.domElement.id = 'datgui'
    }


    useEffect(() => {
        const sceneElement = document.getElementById('scene')!;
        while(sceneElement.lastChild != null){
            sceneElement.removeChild(sceneElement.lastChild)
        }

        document.getElementById('scene')!.appendChild(renderer.domElement)
        const controls = new OrbitControls(camera, renderer.domElement);
        
        animate()

        initGui()
    }, []);

    return ( 
        <div>
            <div id='scene'/>
            <div id="datgui" style={{position: 'relative', top: '20px', left: '20px' }}/>
        </div>
    );
}
 
export default TheePage;