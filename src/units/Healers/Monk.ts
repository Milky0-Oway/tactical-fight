import { Unit, UnitType, Units, unitsImages } from '../Unit';
import { HealerSingleBehavior } from '../Behavior/HealerSingleBehavior';

export class Monk extends Unit {
    constructor(position: Array<number>) {
        super(position, new HealerSingleBehavior());

        this.id = crypto.randomUUID();
        this.type = UnitType.HealerSingle;
        this.name = Units.Monk;
        this.maxHp = 90;
        this.currentHp = 90;
        this.healingPower = 40;
        this.initiative = 20;
        this.image = unitsImages.Monk;
    }
}
