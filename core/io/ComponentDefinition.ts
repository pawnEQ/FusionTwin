import { FusionComponentType } from "../component/FusionComponentType";

export interface ComponentDefinition {

    readonly id: string;

    type: FusionComponentType;

    name: string;

    parent?: string;

    metadata?: Record<string, unknown>;
}