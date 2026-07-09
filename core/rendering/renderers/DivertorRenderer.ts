import * as THREE from "three";

import { FusionComponent } from "../../component/FusionComponent";
import { getDivertorTargets } from "../ComponentMetadata";

export class DivertorRenderer {
    public static render(
        threeScene: THREE.Scene,
        component: FusionComponent
    ): void {
        const targets = getDivertorTargets(component);

        const material = new THREE.MeshStandardMaterial({
            color: 0x4f5359,
            metalness: 0.9,
            roughness: 0.3
        });

        for (const target of targets) {
            const radialSegments = 16;
            const tubularSegments = 100;
            const arc = Math.min(
                Math.PI * 2,
                target.width / target.majorRadius
            );

            const geometry = new THREE.TorusGeometry(
                target.majorRadius,
                target.depth,
                radialSegments,
                tubularSegments,
                arc
            );

            const mesh = new THREE.Mesh(geometry, material);

            mesh.name = `${component.name} ${target.name}`;
            mesh.rotation.x = Math.PI / 2;
            mesh.rotation.z = Math.PI / 2 - arc / 2;
            mesh.position.y = target.height;

            threeScene.add(mesh);
        }
    }
}
