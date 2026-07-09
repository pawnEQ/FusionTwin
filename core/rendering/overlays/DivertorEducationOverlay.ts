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

        const material = new THREE.MeshBasicMaterial({
            color: 0xff5a1f,
            transparent: true,
            opacity: 0.15 + targetHeating * 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        for (const target of targets) {
            const innerRadius = target.majorRadius - target.width / 2;
            const outerRadius = target.majorRadius + target.width / 2;
            const geometry = new THREE.RingGeometry(
                innerRadius,
                outerRadius,
                128
            );
            const mesh = new THREE.Mesh(geometry, material);

            mesh.name = `${component.name} ${target.name} Education Heat Overlay`;
            mesh.rotation.x = -Math.PI / 2;
            mesh.position.y = target.height + target.depth / 2 + 0.002;

            threeScene.add(mesh);
        }
    }
}
