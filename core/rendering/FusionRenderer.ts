import * as THREE from "three";

import { FusionComponentType } from "../component/FusionComponentType";
import { FusionScene } from "../scene/FusionScene";
import { CentralSolenoidRenderer } from "./renderers/CentralSolenoidRenderer";
import { DivertorRenderer } from "./renderers/DivertorRenderer";
import { PlasmaRenderer } from "./renderers/PlasmaRenderer";
import { PoloidalFieldCoilRenderer } from "./renderers/PoloidalFieldCoilRenderer";
import { ToroidalFieldCoilRenderer } from "./renderers/ToroidalFieldCoilRenderer";
import { VacuumVesselRenderer } from "./renderers/VacuumVesselRenderer";

export class FusionRenderer {
    private threeScene: THREE.Scene;

    constructor(threeScene: THREE.Scene) {
        this.threeScene = threeScene;
    }

    public render(fusionScene: FusionScene): void {
        for (const component of fusionScene.getComponents()) {
            switch (component.type) {
                case FusionComponentType.Plasma:
                    PlasmaRenderer.render(this.threeScene, component);
                    break;

                case FusionComponentType.VacuumVessel:
                    VacuumVesselRenderer.render(this.threeScene, component);
                    break;

                case FusionComponentType.CentralSolenoid:
                    CentralSolenoidRenderer.render(this.threeScene, component);
                    break;

                case FusionComponentType.ToroidalFieldCoil:
                    ToroidalFieldCoilRenderer.render(this.threeScene, component);
                    break;

                case FusionComponentType.PoloidalFieldCoil:
                    PoloidalFieldCoilRenderer.render(this.threeScene, component);
                    break;

                case FusionComponentType.Divertor:
                    DivertorRenderer.render(this.threeScene, component);
                    break;

                default:
                    console.warn(
                        `No renderer registered for component type: ${component.type}`
                    );
                    break;
            }
        }
    }
}
