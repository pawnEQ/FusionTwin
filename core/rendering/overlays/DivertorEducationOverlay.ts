import * as THREE from "three";

import { FusionComponent } from "../../component/FusionComponent";
import {
    DivertorEducationState,
    validateDivertorEducationState
} from "../../education/DivertorEducationState";
import { getDivertorTargets } from "../ComponentMetadata";

export class DivertorEducationOverlay {
    public static render(
        threeScene: THREE.Scene,
        component: FusionComponent,
        state: DivertorEducationState
    ): void {
        const validatedState = validateDivertorEducationState(state);
        const targets = getDivertorTargets(component);
        const targetHeating = validatedState.detached
            ? validatedState.load * 0.25
            : validatedState.load;

        const surfaceMaterial = new THREE.MeshBasicMaterial({
            color: 0xffd7a3,
            transparent: true,
            opacity: 0.25 + targetHeating * 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        const innerHaloMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6a1f,
            transparent: true,
            opacity: 0.08 + targetHeating * 0.3,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        const outerHaloMaterial = new THREE.MeshBasicMaterial({
            color: 0xff2f0f,
            transparent: true,
            opacity: 0.04 + targetHeating * 0.16,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        for (const target of targets) {
            const innerRadius = target.majorRadius - target.width / 2;
            const outerRadius = target.majorRadius + target.width / 2;
            const surfaceHeight = target.height + target.depth / 2;

            const surfaceGeometry = new THREE.RingGeometry(
                innerRadius,
                outerRadius,
                128
            );
            const surfaceMesh = new THREE.Mesh(
                surfaceGeometry,
                surfaceMaterial
            );

            surfaceMesh.name = `${component.name} ${target.name} Education Heat Surface`;
            surfaceMesh.rotation.x = -Math.PI / 2;
            surfaceMesh.position.y = surfaceHeight + 0.002;

            const innerHaloGeometry = new THREE.RingGeometry(
                Math.max(0, innerRadius - target.width * 0.18),
                outerRadius + target.width * 0.18,
                128
            );
            const innerHaloMesh = new THREE.Mesh(
                innerHaloGeometry,
                innerHaloMaterial
            );

            innerHaloMesh.name = `${component.name} ${target.name} Education Inner Heat Halo`;
            innerHaloMesh.rotation.x = -Math.PI / 2;
            innerHaloMesh.position.y = surfaceHeight + 0.025;

            const outerHaloGeometry = new THREE.RingGeometry(
                Math.max(0, innerRadius - target.width * 0.35),
                outerRadius + target.width * 0.35,
                128
            );
            const outerHaloMesh = new THREE.Mesh(
                outerHaloGeometry,
                outerHaloMaterial
            );

            outerHaloMesh.name = `${component.name} ${target.name} Education Outer Heat Halo`;
            outerHaloMesh.rotation.x = -Math.PI / 2;
            outerHaloMesh.position.y = surfaceHeight + 0.05;

            threeScene.add(surfaceMesh);
            threeScene.add(innerHaloMesh);
            threeScene.add(outerHaloMesh);
        }
    }
}
