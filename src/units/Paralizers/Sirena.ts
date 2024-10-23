import { Unit, UnitType, Units, unitsImages } from '../Unit';
import { ParalyzerBehavior } from '../Behavior/ParalyzerBehavior';

export class Sirena extends Unit {
    constructor(position: Array<number>) {
        super(position, new ParalyzerBehavior());

        this.type = UnitType.Paralyzer;
        this.name = Units.Sirena;
        this.maxHp = 80;
        this.currentHp = 80;
        this.initiative = 20;
        this.image = unitsImages.Sirena;
    }
}
