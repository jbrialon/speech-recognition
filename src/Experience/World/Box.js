import * as THREE from "three";
import Experience from "../Experience";

export default class Box {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.physics = this.experience.physics;
    this.speech = this.experience.speech;

    // Options
    this.options = {};
    this.geometry = new THREE.SphereGeometry(0.5, 16, 16);
    this.activeColor = new THREE.Color("#bebebe");

    // Setup
    this.addEvents();
    this.addModel();
    setInterval(() => {
      this.addModel();
    }, 2000);

    // Debug
    // this.setDebug();
  }
  addEvents() {
    // Events
    this.speech.on("resultReceived", (color) => {
      // Handle the result in this callback function
      console.log(`Received color: ${color}`);
      color = color.toLowerCase();
      if (color == "red") {
        this.activeColor = new THREE.Color("#ff0000");
      } else if (color == "green") {
        this.activeColor = new THREE.Color("#008000");
      } else if (color == "blue") {
        this.activeColor = new THREE.Color("#0000ff");
      } else if (color == "yellow") {
        this.activeColor = new THREE.Color("#FFFF00");
      } else if (color == "gold") {
        this.activeColor = new THREE.Color("#FFD700");
      } else if (color == "olive") {
        this.activeColor = new THREE.Color("#808000");
      } else if (color == "navy") {
        this.activeColor = new THREE.Color("#000080");
      } else if (color == "purple") {
        this.activeColor = new THREE.Color("#800080");
      }
    });
  }

  addModel() {
    const material = new THREE.MeshBasicMaterial({
      color: this.activeColor,
    });
    const model = new THREE.Mesh(this.geometry, material);
    model.position.x = Math.random() * 10 - 5;
    model.position.z = Math.random() * 10 - 5;
    model.position.y = 10;
    model.receiveShadow = true;
    model.castShadow = true;
    this.physics.addPhysicToMesh(model, 1);

    this.scene.add(model);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Box");
      this.debugFolder.close();

      this.options.material = this.material.color;
      this.debugFolder
        .addColor(this.material, "color")
        .onChange(() => {
          this.material.color = this.options.material;
        })
        .name("Box Color");
    }
  }

  update() {}
}
