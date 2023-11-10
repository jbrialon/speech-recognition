import * as THREE from "three";
import Experience from "./Experience";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    // this.speech = this.experience.speech;

    // Options
    this.options = {
      clearColor: "#6b8a9e",
    };

    // Subscribe to the 'resultReceived' event
    // this.speech.on("resultReceived", (color) => {
    //   // Handle the result in this callback function
    //   console.log(color);
    //   if (color == "tomato") {
    //     this.instance.setClearColor("#ff6347");
    //   }
    //   if (color == "aqua") {
    //     this.instance.setClearColor("#00ffff");
    //   }
    //   if (color == "red") {
    //     this.instance.setClearColor("#ff0000");
    //   }
    //   if (color == "green") {
    //     this.instance.setClearColor("#008000");
    //   }
    //   if (color == "gold") {
    //     this.instance.setClearColor("#FFD700");
    //   }
    //   if (color == "yellow") {
    //     this.instance.setClearColor("#FFFF00");
    //   }
    // });

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("World");
      this.debugFolder.close();
      this.debugFolder
        .addColor(this.options, "clearColor")
        .name("Background Color")
        .onChange(() => {
          this.instance.setClearColor(this.options.clearColor);
        });
    }

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: "high-performance",
    });

    this.instance.outputColorSpace = THREE.sRGBEncoding;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.setClearColor(this.options.clearColor);

    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
