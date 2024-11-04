import { Unit, UnitType, Units, unitsImages } from '../Unit';
import { MageBehavior } from '../Behavior/MageBehavior';

export class SkeletonMage extends Unit {
    constructor(position: Array<number>) {
        super(position, new MageBehavior());

        this.id = crypto.randomUUID();
        this.type = UnitType.Mage;
        this.name = Units.SkeletonMage;
        this.maxHp = 50;
        this.currentHp = 50;
        this.damage = 20;
        this.initiative = 40;
        this.image = unitsImages.SkeletonMage;
    }
}
