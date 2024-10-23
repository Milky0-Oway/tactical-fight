import { Unit, UnitType, Units, unitsImages } from '../Unit';
import { MageBehavior } from '../Behavior/MageBehavior';

export class Archimage extends Unit {
    constructor(position: Array<number>) {
        super(position, new MageBehavior());

        this.type = UnitType.Mage;
        this.name = Units.Archimage;
        this.maxHp = 90;
        this.currentHp = 90;
        this.damage = 30;
        this.initiative = 40;
        this.image = unitsImages.Archimage;
    }
}
