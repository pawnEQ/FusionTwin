import * as THREE from "three";

import { FusionScene } from "../scene/FusionScene";
import { FusionComponent } from "../component/FusionComponent";
import { FusionComponentType } from "../component/FusionComponentType";

interface PoloidalRingDefinition {
    radius: number;
    height: number;
}

export class FusionRenderer {

    private threeScene: THREE.Scene;

    constructor(threeScene: THREE.Scene) {
        this.threeScene = threeScene;
    }

    public render(fusionScene: FusionScene): void {

        for (const component of fusionScene.getComponents()) {

            switch (component.type) {

                case FusionComponentType.Plasma:
                    this.renderPlasma(component);
                    break;

                case FusionComponentType.VacuumVessel:
                    this.renderVacuumVessel(component);
                    break;

                case FusionComponentType.CentralSolenoid:
                    this.renderCentralSolenoid(component);
                    break;

                case FusionComponentType.ToroidalFieldCoil:
                    this.renderToroidalFieldCoils(component);
                    break;

                case FusionComponentType.PoloidalFieldCoil:
                    this.renderPoloidalFieldCoils(component);
                    break;

                default:
                    console.warn(
                        `No renderer registered for component type: ${component.type}`
                    );
                    break;
            }

        }

    }

    private renderPlasma(component: FusionComponent): void {

        const majorRadius = this.getNumberMetadata(
            component,
            "majorRadius"
        );

        const tubeRadius = this.getNumberMetadata(
            component,
            "tubeRadius"
        );

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

        const mesh = new THREE.Mesh(
            geometry,
            material
        );

        mesh.name = component.name;

        mesh.rotation.x = Math.PI / 2;

        this.threeScene.add(mesh);

    }

    private renderVacuumVessel(
        component: FusionComponent
    ): void {

        const majorRadius = this.getNumberMetadata(
            component,
            "majorRadius"
        );

        const tubeRadius = this.getNumberMetadata(
            component,
            "tubeRadius"
        );

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

        const mesh = new THREE.Mesh(
            geometry,
            material
        );

        mesh.name = component.name;

        mesh.rotation.x = Math.PI / 2;

        this.threeScene.add(mesh);

    }

    private renderCentralSolenoid(
        component: FusionComponent
    ): void {

        const radius = this.getNumberMetadata(
            component,
            "radius"
        );

        const height = this.getNumberMetadata(
            component,
            "height"
        );

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

        const mesh = new THREE.Mesh(
            geometry,
            material
        );

        mesh.name = component.name;

        this.threeScene.add(mesh);

    }

    private renderToroidalFieldCoils(
        component: FusionComponent
    ): void {

        const coilCount = this.getNumberMetadata(
            component,
            "count"
        );

        const majorRadius = this.getNumberMetadata(
            component,
            "majorRadius"
        );

        const coilRadius = this.getNumberMetadata(
            component,
            "coilRadius"
        );

        const tubeRadius = this.getNumberMetadata(
            component,
            "tubeRadius"
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0xcc6633,
            metalness: 0.75,
            roughness: 0.3
        });

        for (let index = 0; index < coilCount; index++) {

            const angle =
                (index / coilCount) * Math.PI * 2;

            const geometry = new THREE.TorusGeometry(
                coilRadius,
                tubeRadius,
                16,
                64
            );

            const coil = new THREE.Mesh(
                geometry,
                material
            );

            coil.name =
                `${component.name} ${index + 1}`;

            coil.position.set(
                Math.cos(angle) * majorRadius,
                0,
                Math.sin(angle) * majorRadius
            );

            coil.rotation.y = -angle;

            this.threeScene.add(coil);

        }

    }

    private renderPoloidalFieldCoils(
        component: FusionComponent
    ): void {

        const tubeRadius = this.getNumberMetadata(
            component,
            "tubeRadius"
        );

        const rings = this.getPoloidalRings(
            component
        );

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

            const coil = new THREE.Mesh(
                geometry,
                material
            );

            coil.name =
                `${component.name} ${index + 1}`;

            coil.rotation.x = Math.PI / 2;

            coil.position.y = ring.height;

            this.threeScene.add(coil);

        }

    }

    private getNumberMetadata(
        component: FusionComponent,
        key: string
    ): number {

        const value = component.metadata[key];

        if (typeof value !== "number") {
            throw new Error(
                `Component "${component.name}" requires numeric metadata "${key}"`
            );
        }

        return value;

    }

    private getPoloidalRings(
        component: FusionComponent
    ): PoloidalRingDefinition[] {

        const value = component.metadata["rings"];

        if (!Array.isArray(value)) {
            throw new Error(
                `Component "${component.name}" requires array metadata "rings"`
            );
        }

        return value.map((ring, index) => {

            if (
                typeof ring !== "object" ||
                ring === null ||
                typeof ring.radius !== "number" ||
                typeof ring.height !== "number"
            ) {
                throw new Error(
                    `Component "${component.name}" has invalid ring metadata at index ${index}`
                );
            }

            return {
                radius: ring.radius,
                height: ring.height
            };

        });

    }

}