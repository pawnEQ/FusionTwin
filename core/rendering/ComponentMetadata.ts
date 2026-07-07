import { FusionComponent } from "../component/FusionComponent";

export interface PoloidalRingDefinition {
    radius: number;
    height: number;
}

export function getNumberMetadata(
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

export function getPoloidalRings(
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
            !("radius" in ring) ||
            !("height" in ring) ||
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
