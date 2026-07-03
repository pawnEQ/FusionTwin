import { FusionComponent } from "../component/FusionComponent";

export class FusionScene {

    private components: FusionComponent[] = [];

    public add(component: FusionComponent): void {
        this.components.push(component);
    }

    public remove(id: string): void {
        this.components = this.components.filter(
            component => component.id !== id
        );
    }

    public find(id: string): FusionComponent | undefined {
        return this.components.find(
            component => component.id === id
        );
    }

    public getComponents(): readonly FusionComponent[] {
        return this.components;
    }

}