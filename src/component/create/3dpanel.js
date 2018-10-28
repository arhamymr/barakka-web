import React, { Component } from 'react'
import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'

class Scene extends Component {
    constructor(props) {
        super(props)
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this)
    }

    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        //  adding scene 
        const scene = new THREE.Scene()
        scene.background = new THREE.Color('#F7CA18');
        // creating renderer 
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor('#000000')
        renderer.setSize(width, height)
        // adding camera 

        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        )

        camera.position.z = 4
        // adding orbit controls 
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enabled = true;
        controls.maxDistance = 1500;
        controls.minDistance = 0;
        // binding geometry and material 
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshNormalMaterial()
        const cube = new THREE.Mesh(geometry, material)

        // adding json material 

        const loader = new THREE.JSONLoader();

        loader.load('../../../public/models/json/mongkie.jsona', 
            handle_load, 
            // onProgress callback
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },

            // onError callback
            function(err) {
                console.log('An error happened');
            })

        function handle_load(geometry, material) {
            material = new THREE.MeshNormalMaterial();
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        }


        // add scene  
        scene.add(cube)

        // binding to global 
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.material = material
        this.cube = cube

        this.mount.appendChild(this.renderer.domElement)
        this.start()
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }

    animate() {
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01

        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        const height = window.innerHeight;
        const width = window.innerWidth;
        return ( 
          <div style = { { width: width, height: height } } ref = {
                (mount) => { this.mount = mount }
            }
           />
        )
    }
}

export default Scene