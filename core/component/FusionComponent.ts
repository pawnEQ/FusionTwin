export interface FusionComponent {
    id: string;

    type: string;

    name: string;

    parent?: string;

    children: string[];

    visible: boolean;

    enabled: boolean;

    metadata: Record<string, unknown>;
}