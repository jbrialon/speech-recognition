import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    // Setup
    this.setAmbientLight();
    this.setSunLight();

    const scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x4a392e, 0.002);

    // Debug
    this.setDebug();
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambientLight);
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight(0xf8f1e6, 0.5);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(4096, 4096);
    this.sunLight.shadow.camera.far = 25;
    this.sunLight.shadow.camera.left = -8;
    this.sunLight.shadow.camera.top = 8;
    this.sunLight.shadow.camera.right = 8;
    this.sunLight.shadow.camera.bottom = -8;
    this.sunLight.position.set(2, 10, 9);

    this.scene.add(this.sunLight);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Environment");
      this.debugFolder.close();

      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);

      // Create a helper for the shadow camera (optional)
      this.CameraHelper = new THREE.CameraHelper(this.sunLight.shadow.camera);
      this.CameraHelper.visible = false;
      this.scene.add(this.CameraHelper);

      this.debugFolder
        .add(this.CameraHelper, "visible")
        .name("Shadow CameraHelper");
    }
  }
}
