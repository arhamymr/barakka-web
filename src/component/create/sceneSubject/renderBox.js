import * as THREE from 'three'

export default scene => {
	// new light 
	const light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );
	// add jSON loader 
	const loader = new THREE.JSONLoader();
	let mesh = null;
	loader.load('../../../../public/models/json/male02/Male02_dds.json',handle_load)  
	function handle_load(geometry,material){
		material = new THREE.MeshNormalMaterial();
		mesh = new THREE.Mesh(geometry,material);		
		scene.add(mesh);
	}	
	function update(){
	}
	return {
		update
	}	
}