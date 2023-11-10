import * as THREE from "three";

import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import Pillar from "./Pillar";
import Box from "./Box";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources to be loaded
    this.resources.on("ready", () => {
      // Setup
      this.pillarOne = new Pillar({
        position: new THREE.Vector3(-5, 0, 10),
        colorLabel: "red",
        colorHex: "#ff0000",
      });
      this.pillarTwo = new Pillar({
        position: new THREE.Vector3(-5, 0, 5),
        colorLabel: "green",
        colorHex: "#008000",
      });
      this.pillarThree = new Pillar({
        position: new THREE.Vector3(-5, 0, 0),
        colorLabel: "blue",
        colorHex: "#0000ff",
      });
      this.pillarFour = new Pillar({
        position: new THREE.Vector3(-5, 0, -5),
        colorLabel: "yellow",
        colorHex: "#FFFF00",
      });
      this.pillarFive = new Pillar({
        position: new THREE.Vector3(5, 0, 10),
        colorLabel: "gold",
        colorHex: "#ffd700",
      });
      this.pillarSix = new Pillar({
        position: new THREE.Vector3(5, 0, 5),
        colorLabel: "olive",
        colorHex: "#808000",
      });
      this.pillarSeven = new Pillar({
        position: new THREE.Vector3(5, 0, 0),
        colorLabel: "navy",
        colorHex: "#000080",
      });
      this.pillarEight = new Pillar({
        position: new THREE.Vector3(5, 0, -5),
        colorLabel: "purple",
        colorHex: "#800080",
      });

      this.box = new Box();
      this.floor = new Floor();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.floor) this.floor.update();
  }
}
