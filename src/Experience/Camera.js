import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Experience from "./Experience";
export default class Camera {
  constructor() {
    this.experience = new Experience();

    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      50,
      this.sizes.width / this.sizes.height,
      0.01,
      1000
    );

    this.instance.position.set(0, 2, 18);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enabled = false;
    this.controls.enableDamping = true;

    this.controls.minPolarAngle = THREE.MathUtils.degToRad(30);
    this.controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
