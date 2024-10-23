import { Unit, UnitType, Units, unitsImages } from '../Unit';
import { RangeBehavior } from '../Behavior/RangeBehavior';

export class Bandit extends Unit {
    constructor(position: Array<number>) {
        super(position, new RangeBehavior());

        this.type = UnitType.Range;
        this.name = Units.Bandit;
        this.maxHp = 75;
        this.currentHp = 75;
        this.damage = 30;
        this.initiative = 60;
        this.image = unitsImages.Bandit;
    }
}
