import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404040, 2); // 環境光
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 平行光
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

const loader = new GLTFLoader();
loader.load('/apple.glb', function(gltf) {
    const character = gltf.scene;
    scene.add(character);
    character.position.set(0, -1, 0); // 調整
    character.scale.set(10, 10, 10); // スケール調整
    console.log(character); // コンソールで確認
});

camera.position.set(0, 1, 5);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
