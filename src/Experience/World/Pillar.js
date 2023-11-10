import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import Experience from "../Experience";

export default class Pillar {
  constructor(options) {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.physics = this.experience.physics;

    // Options
    this.options = options;
    this.options.materialColor = "#312c25";

    // Setup
    this.resource = this.resources.items.pillarModel;
    this.font = this.resources.items.gentilisFont;

    this.setModel();
    this.addLabel(this.options.colorLabel, this.options.position);
    // Debug
    // this.setDebug();
  }

  setModel() {
    this.model = this.resource.scene.clone();
    this.material = new THREE.MeshStandardMaterial({
      color: this.options.materialColor,
    });

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = this.material;
      }
    });

    this.model.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z
    );

    this.model.rotation.y = Math.random() * 2;
    this.physics.addPhysicToMesh(this.model, 0);
    this.scene.add(this.model);
  }

  addLabel(name, location) {
    this.pos = new THREE.Vector3(location.x, location.y, location.z);
    this.textGeo = new TextGeometry(name, {
      font: this.font,
      size: 0.5,
      height: 0.1,
    });
    this.textGeo.center();
    this.textMaterial = new THREE.MeshStandardMaterial({
      color: "#bebebe",
    });
    this.textMesh = new THREE.Mesh(this.textGeo, this.textMaterial);
    // this.textMesh.castShadow = true;
    this.textMesh.receiveShadow = true;
    this.textMesh.position.set(location.x, location.y + 1.5, location.z + 0.9);

    this.scene.add(this.textMesh);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Pillar");
      this.debugFolder.close();
      this.debugFolder
        .addColor(this.options, "materialColor")
        .onChange(() => {
          this.material.color.set(this.options.materialColor);
        })
        .name("Material Color");
    }
  }
  update() {}
}
