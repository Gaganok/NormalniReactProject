import * as THREE from 'three'
import { BufferAttribute, Vector3 } from 'three'
import * as GUI from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEffect } from 'react';
import Stats from 'stats.js';
import GLTFLoader from 'three-gltf-loader';

import Solder from './model/Soldier.glb'

export interface ModelProps {
    
}

const stats = new Stats()
 
const Model: React.FunctionComponent<ModelProps> = () => {
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth) / (window.innerHeight), 0.1, 1000 );
    camera.position.z = 25;
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight);

    // const geometry = new THREE.BoxBufferGeometry()
    // const material = new THREE.MeshBasicMaterial({color:'white'})
    // const cubeMesh = new THREE.Mesh(geometry, material)
    // scene.add(cubeMesh)

    function initModel(){
        const loader = new GLTFLoader();
        loader.load(Solder, (gltf) => {
            const model = gltf.scene
            model.position.set(0,-1, 0)
            scene.add(model)

            // model.traverse( function(object: any)  {
            //     if ( object.isMesh) object.castShadow = true;
            // });

            const skeleton = new THREE.SkeletonHelper( model );
            skeleton.visible = true;
            scene.add(skeleton);
        })
    }

    

    const animate = function () {
        requestAnimationFrame( animate );
        stats.update()
        renderer.render( scene, camera );
    };

    function initLight(){
        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        hemiLight.position.set( 0, 20, 0 );
        scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0xffffff );
        dirLight.position.set( - 3, 10, - 10 );
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 2;
        dirLight.shadow.camera.bottom = - 2;
        dirLight.shadow.camera.left = - 2;
        dirLight.shadow.camera.right = 2;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 40;
        scene.add( dirLight );
    }

    function initGui(): HTMLElement{
        const gui = new GUI.GUI({autoPlace: false})

        const worldFolder = gui.addFolder("World")
        worldFolder.open()

        gui.domElement.id = 'scene__gui'
        return gui.domElement;
    }

    useEffect(() => {
        const controls = new OrbitControls(camera, renderer.domElement);
        const gui: HTMLElement = initGui()

        const sceneElement = document.getElementById('scene')!;

        stats.showPanel(0)

        sceneElement.appendChild(renderer.domElement)
        sceneElement.appendChild(gui)
        sceneElement.appendChild(stats.dom)
        
        initLight()
        initModel()

        animate()

        return () => {
            while(sceneElement.lastChild != null){
                sceneElement.removeChild(sceneElement.lastChild)
            }
        }
    }, []);

    return ( 
        <div id='scene'/>
     );
}
 
export default Model;