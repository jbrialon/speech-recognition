import * as THREE from "three";
import toonVertexShader from "../../shaders/toon/vertex.glsl";
import toonFragmentShader from "../../shaders/toon/fragment.glsl";

export class ToonShaderMaterial extends THREE.ShaderMaterial {
  constructor({ color = "#fff" }) {
    super({
      lights: true,
      uniforms: {
        ...THREE.UniformsLib.lights,
        uGlossiness: {
          value: 20,
        },
        uColor: {
          value: new THREE.Color(color),
        },
      },
    });

    this.vertexShader = toonVertexShader;
    this.fragmentShader = toonFragmentShader;
  }
}
