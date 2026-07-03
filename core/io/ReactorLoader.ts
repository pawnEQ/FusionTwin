import { FusionScene } from "../scene/FusionScene";
import { ReactorDefinition } from "./ReactorDefinition";

export class ReactorLoader {
    static load(definition: ReactorDefinition): FusionScene {
        const scene = new FusionScene();

        // Build FusionComponents here

        return scene;
    }
}