import * as THREE from "three";

import { FusionComponent } from "../../component/FusionComponent";
import { getNumberMetadata } from "../ComponentMetadata";

export class ToroidalFieldCoilRenderer {
    public static render(
        threeScene: THREE.Scene,
        component: FusionComponent
    ): void {
        const coilCount = getNumberMetadata(component, "count");
        const majorRadius = getNumberMetadata(component, "majorRadius");
        const coilRadius = getNumberMetadata(component, "coilRadius");
        const tubeRadius = getNumberMetadata(component, "tubeRadius");

        const material = new THREE.MeshStandardMaterial({
            color: 0xcc6633,
            metalness: 0.75,
            roughness: 0.3
        });

        for (let index = 0; index < coilCount; index++) {
            const angle = (index / coilCount) * Math.PI * 2;

            const geometry = new THREE.TorusGeometry(
                coilRadius,
                tubeRadius,
                16,
                64
            );

            const coil = new THREE.Mesh(geometry, material);

            coil.name = `${component.name} ${index + 1}`;
            coil.position.set(
                Math.cos(angle) * majorRadius,
                0,
                Math.sin(angle) * majorRadius
            );
            coil.rotation.y = -angle;

            threeScene.add(coil);
        }
    }
}
