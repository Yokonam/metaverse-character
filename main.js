import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class ThreeDScene {
    constructor() {
        this.initScene();
        this.initLighting();
        this.loadCharacter();
        this.initEventListeners();
        this.animate();
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.camera.position.set(0, 1, 5);
        this.move = { forward: false, backward: false, left: false, right: false };
    }

    initLighting() {
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5).normalize();

        this.scene.add(ambientLight);
        this.scene.add(directionalLight);
    }

    loadCharacter() {
        const loader = new GLTFLoader();
        loader.load('/apple.glb', (gltf) => {
            this.character = gltf.scene;
            this.scene.add(this.character);
            this.character.position.set(0, -1, 0);
            this.character.scale.set(10, 10, 10);
            console.log(this.character); // Debugging purposes
        });
    }

    initEventListeners() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(event) {
        switch (event.key) {
            case 'w':
                this.move.forward = true;
                break;
            case 's':
                this.move.backward = true;
                break;
            case 'a':
                this.move.left = true;
                break;
            case 'd':
                this.move.right = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.key) {
            case 'w':
                this.move.forward = false;
                break;
            case 's':
                this.move.backward = false;
                break;
            case 'a':
                this.move.left = false;
                break;
            case 'd':
                this.move.right = false;
                break;
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        if (this.character) {
            this.moveCharacter();
        }

        this.renderer.render(this.scene, this.camera);
    }

    moveCharacter() {
        const speed = 0.05;
        if (this.move.forward) this.character.position.z -= speed;
        if (this.move.backward) this.character.position.z += speed;
        if (this.move.left) this.character.position.x -= speed;
        if (this.move.right) this.character.position.x += speed;
    }
}

new ThreeDScene();
