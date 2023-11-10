import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.physics = this.experience.physics;
    this.resources = this.experience.resources;

    // Options
    this.options = {};

    // Setup
    this.setModel();

    // Debug
    this.setDebug();
  }

  setModel() {
    this.geometry = new THREE.BoxGeometry(200, 1, 200);
    this.material = new THREE.MeshStandardMaterial({
      color: "#4a392e",
    });

    this.model = new THREE.Mesh(this.geometry, this.material);
    this.model.position.y = -0.5;
    this.model.receiveShadow = true;
    this.physics.addPhysicToMesh(this.model, 0);

    this.scene.add(this.model);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Floor");
      this.debugFolder.close();

      this.options.material = this.material.color;

      this.debugFolder
        .addColor(this.material, "color")
        .onChange(() => {
          this.material.color = this.options.material;
        })
        .name("Floor Color");
    }
  }
  update() {}
}
