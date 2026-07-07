import * as THREE from "three";

import { FusionComponent } from "../../component/FusionComponent";
import { getNumberMetadata } from "../ComponentMetadata";

export class PlasmaRenderer {
    public static render(
        threeScene: THREE.Scene,
        component: FusionComponent
    ): void {
        const majorRadius = getNumberMetadata(component, "majorRadius");
        const tubeRadius = getNumberMetadata(component, "tubeRadius");

        const geometry = new THREE.TorusGeometry(
            majorRadius,
            tubeRadius,
            32,
            100
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0x66ccff,
            emissive: 0x2266ff,
            emissiveIntensity: 2
        });

        const mesh = new THREE.Mesh(geometry, material);

        mesh.name = component.name;
        mesh.rotation.x = Math.PI / 2;

        threeScene.add(mesh);
    }
}
