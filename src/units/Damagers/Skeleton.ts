import { Unit, UnitType, Units, unitsImages } from '../Unit';
import { MeleeBehavior } from '../Behavior/MeleeBehavior';

export class Skeleton extends Unit {
    constructor(position: Array<number>) {
        super(position, new MeleeBehavior());

        this.id = crypto.randomUUID();
        this.type = UnitType.Melee;
        this.name = Units.Skeleton;
        this.maxHp = 100;
        this.currentHp = 100;
        this.damage = 25;
        this.initiative = 50;
        this.image = unitsImages.Skeleton;
    }
}
