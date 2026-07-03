import { FusionComponentType } from "./FusionComponentType";

export interface FusionComponent {
    readonly id: string;

    type: FusionComponentType;

    name: string;

    parent?: string;

    children: string[];

    visible: boolean;

    enabled: boolean;

    metadata: Record<string, unknown>;
}