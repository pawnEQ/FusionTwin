import * as THREE from "three";

import { FusionComponent } from "../../component/FusionComponent";
import { getNumberMetadata } from "../ComponentMetadata";

export class CentralSolenoidRenderer {
    public static render(
        threeScene: THREE.Scene,
        component: FusionComponent
    ): void {
        const radius = getNumberMetadata(component, "radius");
        const height = getNumberMetadata(component, "height");

        const geometry = new THREE.CylinderGeometry(
            radius,
            radius,
            height,
            48
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0xcc8844,
            metalness: 0.7,
            roughness: 0.3
        });

        const mesh = new THREE.Mesh(geometry, material);

        mesh.name = component.name;

        threeScene.add(mesh);
    }
}
