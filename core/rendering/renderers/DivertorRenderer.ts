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
            const innerRadius = target.majorRadius - target.width / 2;
            const outerRadius = target.majorRadius + target.width / 2;
            const segments = 128;

            const topGeometry = new THREE.RingGeometry(
                innerRadius,
                outerRadius,
                segments
            );
            const bottomGeometry = new THREE.RingGeometry(
                innerRadius,
                outerRadius,
                segments
            );

            const topMesh = new THREE.Mesh(topGeometry, material);
            const bottomMesh = new THREE.Mesh(bottomGeometry, material);

            topMesh.name = `${component.name} ${target.name} Top`;
            bottomMesh.name = `${component.name} ${target.name} Bottom`;

            topMesh.rotation.x = -Math.PI / 2;
            bottomMesh.rotation.x = Math.PI / 2;

            topMesh.position.y = target.height + target.depth / 2;
            bottomMesh.position.y = target.height - target.depth / 2;

            const outerWallGeometry = new THREE.CylinderGeometry(
                outerRadius,
                outerRadius,
                target.depth,
                segments,
                1,
                true
            );
            const innerWallGeometry = new THREE.CylinderGeometry(
                innerRadius,
                innerRadius,
                target.depth,
                segments,
                1,
                true
            );

            const outerWallMesh = new THREE.Mesh(outerWallGeometry, material);
            const innerWallMesh = new THREE.Mesh(innerWallGeometry, material);

            outerWallMesh.name = `${component.name} ${target.name} Outer Wall`;
            innerWallMesh.name = `${component.name} ${target.name} Inner Wall`;

            outerWallMesh.position.y = target.height;
            innerWallMesh.position.y = target.height;

            threeScene.add(topMesh);
            threeScene.add(bottomMesh);
            threeScene.add(outerWallMesh);
            threeScene.add(innerWallMesh);
        }
    }
}
