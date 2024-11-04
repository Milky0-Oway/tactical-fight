import { Unit, UnitType, Units, unitsImages } from '../Unit';
import { HealerMassBehavior } from '../Behavior/HealerMassBehavior';

export class Bishop extends Unit {
    constructor(position: Array<number>) {
        super(position, new HealerMassBehavior());

        this.id = crypto.randomUUID();
        this.type = UnitType.HealerMass;
        this.name = Units.Bishop;
        this.maxHp = 130;
        this.currentHp = 130;
        this.healingPower = 25;
        this.initiative = 20;
        this.image = unitsImages.Bishop;
    }
}
