import * as THREE from 'three'
import RenderBox from './sceneSubject/renderBox'

import OrbitControls from 'orbit-controls-es6'

const SceneManager = canvas => {
	const screenDimensions = {
		width : window.innerWidth / 2,
		height : window.innerHeight
	}

	console.log('screenDimension',screenDimensions)
	
	const mousePosition = {
		x: 0,
		y: 0
	}

	const scene = buildScene();
	const renderer = buildRender(screenDimensions);
	const camera = buildCamera(screenDimensions);
	const sceneSubjects = createSceneSubjects(scene);
	console.log("scenesubject",sceneSubjects)

	function buildScene() {
		const scene = new THREE.Scene();
		console.log('scene',scene)
		return scene;
	}

	function buildRender({width , height}){
		const renderer = new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true});
		const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
		renderer.setPixelRatio(DPR);
		renderer.setSize(width,height);


		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		return renderer;
	}

	function buildCamera({width, height}){

		const aspectRatio = width / height;
		const fieldOfView = 60;
		const nearPlane = 1;
		const farPlane = 1000;
		const camera = new THREE.PerspectiveCamera(fieldOfView,aspectRatio,nearPlane,farPlane)
		
		const control = new OrbitControls(camera,renderer.domElement);
		control.enabled = true;
		control.maxDistance = 1500;
		control.minDistance = 0;  
		camera.position.z = 200;
		camera.lookAt(scene.position);

		control.update();
		return camera;
	}

	function createSceneSubjects(scene){

		const sceneSubjects = [ new RenderBox(scene)];
		return sceneSubjects;
	}

	function onWindowResize(){
		const {width,height} = canvas;

		screenDimensions.width = width;
		screenDimensions.height = height;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width,height);
	}

	function update(){
		sceneSubjects[0].update();
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

export default container => {
	
	const canvas = createCanvas(document,container);
	const sceneManager = new SceneManager(canvas);
	
	let canvasHalfWidth;
	let canvasHalfHeight;

	bindEventListener();
	render();

	function createCanvas(document,container){
		const canvas = document.createElement('canvas');
		container.appendChild(canvas)
		return canvas;
	}

	function bindEventListener(){
		window.onresize = resizeCanvas;
		window.onmousemove = mouseMove;
		resizeCanvas();
	}

	function resizeCanvas(){
		canvas.style.width = '100%';
		canvas.style.height = '100%';

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		canvasHalfWidth = Math.round(canvas.offsetWidth/2);
		canvasHalfHeight = Math.round(canvas.offsetHeight/2);

		sceneManager.onWindowResize();
	}

	function mouseMove({screenX,screenY}){
		sceneManager.onMouseMove(screenX-canvasHalfWidth,screenY-canvasHalfHeight)
	}

	function render(time){
		requestAnimationFrame(render)
		sceneManager.update();
	}
}