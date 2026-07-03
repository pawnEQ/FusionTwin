export interface ComponentDefinition {

    id: string;

    type: string;

    name: string;

    parent?: string;

    metadata?: Record<string, unknown>;
}