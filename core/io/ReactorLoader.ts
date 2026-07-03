// core/io/ReactorDefinition.ts

import { FusionComponent } from "../component/FusionComponent";

export interface ReactorDefinition {
    version: string;

    name: string;

    components: FusionComponent[];
}