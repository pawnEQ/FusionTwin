import * as THREE from "three";

import { FusionComponent } from "../../component/FusionComponent";
import {
    getNumberMetadata,
    getPoloidalRings
} from "../ComponentMetadata";

export class PoloidalFieldCoilRenderer {
    public static render(
        threeScene: THREE.Scene,
        component: FusionComponent
    ): void {
        const tubeRadius = getNumberMetadata(component, "tubeRadius");
        const rings = getPoloidalRings(component);

        const material = new THREE.MeshStandardMaterial({
            color: 0xd6a84b,
            metalness: 0.75,
            roughness: 0.3
        });

        for (let index = 0; index < rings.length; index++) {
            const ring = rings[index];

            const geometry = new THREE.TorusGeometry(
                ring.radius,
                tubeRadius,
                16,
                100
            );

            const coil = new THREE.Mesh(geometry, material);

            coil.name = `${component.name} ${index + 1}`;
            coil.rotation.x = Math.PI / 2;
            coil.position.y = ring.height;

            threeScene.add(coil);
        }
    }
}
