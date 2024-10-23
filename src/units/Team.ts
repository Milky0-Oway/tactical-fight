import { Unit } from './Unit';

export class Team {
    public name: string;
    private units: Unit[];

    constructor(name: string) {
        this.name = name;
        this.units = [];
    }

    public addUnit(unit: Unit): void {
        this.units.push(unit);
    }

    public getUnits(): Unit[] {
        return this.units;
    }

    public getAliveUnits(): Unit[] {
        return this.units.filter((unit) => unit.isAlive());
    }

    public hasAliveUnits(): boolean {
        return this.getAliveUnits().length > 0;
    }

    public performTeamAction(
        targets: Unit[],
        action: (unit: Unit, target: Unit[]) => void,
    ): void {
        this.getAliveUnits().forEach((unit) => {
            action(unit, targets);
        });
    }
}
