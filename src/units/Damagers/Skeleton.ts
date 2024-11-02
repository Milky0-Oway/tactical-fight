import { Unit, UnitType, Units, unitsImages } from '../Unit';
import { MeleeBehavior } from '../Behavior/MeleeBehavior';

export class Skeleton extends Unit {
    constructor(position: Array<number>) {
        super(position, new MeleeBehavior());

        this.id = crypto.randomUUID();
        this.type = UnitType.Melee;
        this.name = Units.Skeleton;
        this.maxHp = 80;
        this.currentHp = 80;
        this.damage = 15;
        this.initiative = 40;
        this.image = unitsImages.Skeleton;
    }
}
