import * as THREE from 'three';
import RenderBox from './sceneSubject/renderBox'



canvas => {

	const scene = buldScene();
	const renderer = buildRender(screenDimensions);
	const camera = buildCamera(screenDimensions);
	const sceneSubjects = createSceneSubject(scene);

	function buildScene(){
		const scene = new THREE.Scene();
		scene.background = new THREE.color("#fff");
		return scene;
	}

	function buildRender({width , height}){
		const renderer = new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true});
		const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
		
		renderer.setPixelRation(DPR);
		renderer.setSize(width,height);

		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		
		return renderer;
	}

	function buildCamera({width, height}){
		const aspectRatio = width / height;
		const fieldOfView = 60;
		const nearPlane = 4;
		const farPlane = 100;
		const camera = new THREE.PerspectiveCamera(fieldOfView,aspectRatio,nearPlane,farPlane)
		
		const controls = new THREE.OrbitControls(camera)
		camera.position.z = 40;
		controls.update();
		return camera;
	}

	function createSceneSubjects(scene){
		const sceneSubjects = [ new RenderBox(scene)];
		return sceneSubjects;
	}

	function onWindowResize(){

	}

	function update(){
		renderer.render(scene,camera);
	}

	function onMouseMove(x,y){
		mousePosition.x = x;
		mousePosition.y = y;
	}

	return {
		update,
		onWindowResize,
		onMouseMove
	}

}