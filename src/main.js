import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Clear existing content
document.querySelector('#app').innerHTML = '';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Set to black with 0 opacity
renderer.outputEncoding = THREE.sRGBEncoding;
document.querySelector('#app').appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Create GLTF loader
const loader = new GLTFLoader();

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 3);
controls.update();

// Load the GLTF model
loader.load(
    'src/tapir3d/scene.gltf',  // Use relative path
    function (gltf) {
        console.log('Model loaded successfully:', gltf);
        const model = gltf.scene;
        
        // Auto-center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Scale model to reasonable size
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim; // Adjust this value to make model bigger/smaller
        model.scale.setScalar(scale);

        // Center the model
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;

        scene.add(model);
        
        // Adjust camera and controls for better view
        camera.position.set(0, 1, 3);
        controls.target.set(0, 0, 0);
        controls.update();

        // Optional: limit orbit controls to keep model in view
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 1.5; // Limit how far below model you can orbit
        
        // Add more lights for better visibility
        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        scene.add(hemisphereLight);
    },
    function (xhr) {
        // Progress callback
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(`Loading progress: ${percentComplete}%`);
        const loadingElement = document.getElementById('loading');
        const progressElement = document.getElementById('progress');
        loadingElement.style.display = 'block';
        progressElement.textContent = `${percentComplete.toFixed(0)}%`;
        if (percentComplete === 100) {
            loadingElement.style.display = 'none';
        }
    },
    function (error) {
        console.error('Error loading model:', error);
        const loadingElement = document.getElementById('loading');
        loadingElement.style.display = 'block';
        loadingElement.style.background = 'rgba(255, 0, 0, 0.8)';
        loadingElement.textContent = 'Error loading model. Check console for details.';
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add button event listeners
document.getElementById('button1').addEventListener('click', () => {
    // Button 1 functionality
    console.log('Button 1 clicked');
    // Add your desired action here
});

document.getElementById('button2').addEventListener('click', () => {
    // Button 2 functionality
    console.log('Button 2 clicked');
    // Add your desired action here
});

document.getElementById('button3').addEventListener('click', () => {
    // Button 3 functionality
    console.log('Button 3 clicked');
    // Add your desired action here
});
