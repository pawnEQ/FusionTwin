import * as THREE from "three";

import { FusionComponent } from "../../component/FusionComponent";
import { getNumberMetadata } from "../ComponentMetadata";

export class VacuumVesselRenderer {
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
            color: 0x666b73,
            metalness: 0.8,
            roughness: 0.35,
            transparent: true,
            opacity: 0.35
        });

        const mesh = new THREE.Mesh(geometry, material);

        mesh.name = component.name;
        mesh.rotation.x = Math.PI / 2;

        threeScene.add(mesh);
    }
}
