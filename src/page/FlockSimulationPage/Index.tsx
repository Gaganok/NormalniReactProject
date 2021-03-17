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

export interface FlockProps {}

const BOIDS = new Array<THREE.Mesh>()

const b: Boid = new Boid();

const TheePage: React.FunctionComponent<FlockProps> = () => {
    Geometry.init()

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth) / (window.innerHeight), 0.1, 1000 );
    camera.position.z = 25;
    
    const renderer = new THREE.WebGLRenderer();

    const WINDOW_WIDTH_SCALE = 300;
    const WINDOW_HEIGHT_SCALE = 150;
    renderer.setSize( window.innerWidth - WINDOW_WIDTH_SCALE, window.innerHeight - WINDOW_HEIGHT_SCALE);

    const envCube = new THREE.Mesh(Geometry.EnvCubeGeometry, Material.EnvCubeMaterial);
    const envSphere = new THREE.Mesh(Geometry.EnvSphereGeometry, Material.EnvSphereMaterial)
    const boid = new THREE.Mesh(Geometry.BoidConeGeometry, Material.BoidMaterial);
    
    BOIDS.push(boid)

    scene.add(envCube, envSphere, boid);

    //PointSphere
    const s1 = new THREE.SphereBufferGeometry()
    const m1 = new THREE.MeshBasicMaterial({color: 0xffff00})
    
    const pointSphere = new THREE.Mesh(s1, m1)
    scene.add(pointSphere)
    

    //LINE

    const material = new THREE.LineBasicMaterial({
        color: 0xFF0000,
        
        
    });
    
    const point = {
        x: 0,
        y: 0,
        z: 0,
        angle: 0
    }

    const points = [];
    points.push( new THREE.Vector3( -15, 0, 0 ) );
    // points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 15, 0, 0 ) );
    points.push( new THREE.Vector3( point.x, point.y, point.z ) );
    
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    // geometry.scale(2, 2, 2)
    const line = new THREE.Line( geometry, material );
    
    scene.add( line );

    //LINE END

    const animate = function () {
        requestAnimationFrame( animate );

        updateBoids()
        // line.position.set(point.x, point.y, point.z)

        const pointVector = new THREE.Vector3( point.x, point.y, point.z )
        const axisAngleVector = pointVector.clone().applyAxisAngle(pointVector, point.angle)
        line.rotation.setFromVector3(axisAngleVector)

        renderer.render( scene, camera );
    };

    let directionVector: Vector3 = generatedNewDirection();

    function updateBoids(){
        const maxSpeed: number = 0.7
        
        b.maxForce = new Vector3().addScalar(0.05)
        b.maxSpeed = new Vector3().addScalar(maxSpeed)

        // const directionVector = 

        // const distanceX = getEnvSphereDistance(b.position, new Vector3(1, 0, 0))
        getDirectionVector()
        
        // b.steer(spherePoint.position)
        b.steer(directionVector)
        b.update()

        const rotationMatrix = new THREE.Matrix4();
        rotationMatrix.lookAt(b.position, boid.position, boid.up);

        const targetQuaternion = new THREE.Quaternion();

        targetQuaternion.setFromRotationMatrix( rotationMatrix );
        boid.quaternion.rotateTowards(targetQuaternion, 0.2)
        boid.position.copy(b.position)
    }

    function getEnvSphereDistance(boidPosition: Vector3, direction: Vector3): number{
        const raycaster = new THREE.Raycaster(boidPosition, direction);
        const intersects = raycaster.intersectObject(envSphere);
        return intersects[0] != null ? intersects[0].distance : 0
    }

    function getEnvSphereIntersectVector(boidPosition: Vector3, direction: Vector3): Vector3{
        const raycaster = new THREE.Raycaster(boidPosition, direction);
        const intersects = raycaster.intersectObject(envSphere);
        return intersects[0] != null ? intersects[0].point : new Vector3()
    }

    function getDirectionVector(){

        const REFRACTION_DISTANCE = 3

        // const distance = getEnvSphereDistance(b.position, boid.up)
        const distance = b.position.distanceTo(directionVector)

        if(distance < REFRACTION_DISTANCE){
            directionVector = generatedNewDirection()
        }
        // const distanceX1 = getEnvSphereDistance(b.position, new Vector3(-1, 0, 0))
        
        // const distanceY = getEnvSphereDistance(b.position, new Vector3(0, 1, 0))
        // const distanceY1 = getEnvSphereDistance(b.position, new Vector3(0, -1, 0))
        
        // const distanceZ = getEnvSphereDistance(b.position, new Vector3(0, 0, 1))
        // const distanceZ1 = getEnvSphereDistance(b.position, new Vector3(0, 0, -1))

        console.log()
        
    }

    function generatedNewDirection(): Vector3{
        const newDirectionVector = new Vector3()
        .addScalar(1)
        .applyAxisAngle(new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1), Math.random() * 180);
        const intersectVectorPoint = getEnvSphereIntersectVector(new Vector3(), newDirectionVector)
        pointSphere.position.set(intersectVectorPoint.x, intersectVectorPoint.y, intersectVectorPoint.z)
        return intersectVectorPoint
    }

    function normalize(value: number, min: number, max: number): number{
        return (value - min) / (max - min)
    }

    function initGui(): HTMLElement{
        const gui = new GUI.GUI({autoPlace: false})
        // gui.domElement.id = 'datgui'

        const cubeFolder = gui.addFolder("Cube")
        // cubeFolder.add(spherePoint.position, "x", -100, 100, 1)
        // cubeFolder.add(spherePoint.position, "y", -100, 100, 1)
        // cubeFolder.add(spherePoint.position, "z", -100, 100, 1)
        cubeFolder.add(point, "x", -15, 15, 0.1)
        cubeFolder.add(point, "y", -15, 15, 0.1)
        cubeFolder.add(point, "z", -15, 15, 0.1)
        cubeFolder.add(point, "angle", 0, 360, 0.1)
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