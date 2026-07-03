import { ComponentDefinition } from "./ComponentDefinition";

export interface ReactorDefinition {

    version: string;

    name: string;

    components: ComponentDefinition[];
}