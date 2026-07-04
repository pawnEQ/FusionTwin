import * as THREE from "three";

import { FusionScene } from "../scene/FusionScene";
import { FusionComponent } from "../component/FusionComponent";
import { FusionComponentType } from "../component/FusionComponentType";

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

                default:
                    console.warn(
                        `No renderer registered for component type: ${component.type}`
                    );
                    break;
            }

        }

    }

    private renderPlasma(component: FusionComponent): void {

        const geometry = new THREE.TorusGeometry(
            1.5,
            0.45,
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

        const geometry = new THREE.TorusGeometry(
            1.5,
            0.65,
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

        const geometry = new THREE.CylinderGeometry(
            0.35,
            0.35,
            3.5,
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

}