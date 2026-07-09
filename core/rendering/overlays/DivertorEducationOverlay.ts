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

        if (validatedState.detached) {
            const targetRadii = targets.map((target) => target.majorRadius);
            const targetHeights = targets.map((target) => target.height);
            const innerRadius = Math.min(...targetRadii);
            const outerRadius = Math.max(...targetRadii);
            const baseHeight = Math.max(...targetHeights) + 0.12;
            const centerRadius = (innerRadius + outerRadius) / 2;
            const radialSpread = (outerRadius - innerRadius) / 2 + 0.14;
            const particleCount = 420;
            const positions = new Float32Array(particleCount * 3);

            for (let index = 0; index < particleCount; index += 1) {
                const sequence = index + 1;
                const toroidalAngle = sequence * 2.399963229728653;
                const radialPhase = sequence * 1.618033988749895;
                const heightPhase = sequence * 0.7548776662466927;
                const radialOffset = Math.sin(radialPhase) * radialSpread;
                const normalizedHeight = (Math.sin(heightPhase) + 1) / 2;
                const height = baseHeight + normalizedHeight * 0.38;
                const densityScale = 1 - normalizedHeight * 0.45;
                const radius = centerRadius + radialOffset * densityScale;

                positions[index * 3] = Math.cos(toroidalAngle) * radius;
                positions[index * 3 + 1] = height;
                positions[index * 3 + 2] = Math.sin(toroidalAngle) * radius;
            }

            const radiationGeometry = new THREE.BufferGeometry();
            radiationGeometry.setAttribute(
                "position",
                new THREE.BufferAttribute(positions, 3)
            );

            const radiationMaterial = new THREE.PointsMaterial({
                color: 0xb55cff,
                size: 0.055,
                transparent: true,
                opacity: 0.35 + validatedState.load * 0.35,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                sizeAttenuation: true
            });

            const radiationPoints = new THREE.Points(
                radiationGeometry,
                radiationMaterial
            );

            radiationPoints.name = `${component.name} Education Detached Radiative Particles`;

            threeScene.add(radiationPoints);
        }
    }
}
