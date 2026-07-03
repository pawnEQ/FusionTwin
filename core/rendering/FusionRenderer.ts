import * as THREE from "three";

import { FusionScene } from "../scene/FusionScene";
import { FusionComponent } from "../component/FusionComponent";
import { FusionComponentType } from "../component/FusionComponentType";

export class FusionRenderer {

    private threeScene: THREE.Scene;

    constructor(threeScene: THREE.Scene) {
        this.threeScene = threeScene;
    }

    public render(fusionScene: FusionScene): void {

        for (const component of fusionScene.getComponents()) {

            switch (component.type) {

                case FusionComponentType.Plasma:
                    this.renderPlasma(component);
                    break;

                default:
                    console.warn(
                        `No renderer registered for component type: ${component.type}`
                    );
                    break;
            }

        }

    }

    private renderPlasma(component: FusionComponent): void {

        // Create a sphere
        const geometry = new THREE.SphereGeometry(1, 32, 32);

        // Create a glowing blue material
        const material = new THREE.MeshStandardMaterial({
            color: 0x66ccff,
            emissive: 0x2266ff,
            emissiveIntensity: 2
        });

        // Create the mesh
        const mesh = new THREE.Mesh(geometry, material);

        // Give it a useful name for debugging
        mesh.name = component.name;

        // Add it to the Three.js scene
        this.threeScene.add(mesh);

    }

}