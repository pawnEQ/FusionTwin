import { FusionComponent } from "../component/FusionComponent";
import { FusionComponentType } from "../component/FusionComponentType";
import { FusionScene } from "../scene/FusionScene";
import { ReactorDefinition } from "./ReactorDefinition";

export class ReactorLoader {
    static load(definition: ReactorDefinition): FusionScene {
        const scene = new FusionScene();

        for (const componentDefinition of definition.components) {
            const component: FusionComponent = {
                id: componentDefinition.id,
                type: this.parseComponentType(componentDefinition.type),
                name: componentDefinition.name,
                parent: componentDefinition.parent,
                children: [],
                visible: true,
                enabled: true,
                metadata: componentDefinition.metadata ?? {}
            };

            scene.add(component);
        }

        return scene;
    }

    private static parseComponentType(
        type: FusionComponentType | string
    ): FusionComponentType {
        if (typeof type === "number") {
            return type;
        }

        const componentType =
            FusionComponentType[type as keyof typeof FusionComponentType];

        if (typeof componentType !== "number") {
            throw new Error(
                `Unknown fusion component type: ${type}`
            );
        }

        return componentType;
    }
}