import { FusionComponent } from "../component/FusionComponent";

export interface PoloidalRingDefinition {
    radius: number;
    height: number;
}

export interface DivertorTargetDefinition {
    name: string;
    majorRadius: number;
    height: number;
    width: number;
    depth: number;
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

export function getDivertorTargets(
    component: FusionComponent
): DivertorTargetDefinition[] {
    const value = component.metadata["targets"];

    if (!Array.isArray(value)) {
        throw new Error(
            `Component "${component.name}" requires array metadata "targets"`
        );
    }

    return value.map((target, index) => {
        if (
            typeof target !== "object" ||
            target === null ||
            !("name" in target) ||
            !("majorRadius" in target) ||
            !("height" in target) ||
            !("width" in target) ||
            !("depth" in target) ||
            typeof target.name !== "string" ||
            typeof target.majorRadius !== "number" ||
            typeof target.height !== "number" ||
            typeof target.width !== "number" ||
            typeof target.depth !== "number"
        ) {
            throw new Error(
                `Component "${component.name}" has invalid target metadata at index ${index}`
            );
        }

        return {
            name: target.name,
            majorRadius: target.majorRadius,
            height: target.height,
            width: target.width,
            depth: target.depth
        };
    });
}
