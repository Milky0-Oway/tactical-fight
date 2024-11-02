import { Unit, UnitType, Units, unitsImages } from '../Unit';
import { MeleeBehavior } from '../Behavior/MeleeBehavior';

export class Centaur extends Unit {
    constructor(position: Array<number>) {
        super(position, new MeleeBehavior());

        this.id = crypto.randomUUID();
        this.type = UnitType.Melee;
        this.name = Units.Centaur;
        this.maxHp = 150;
        this.currentHp = 150;
        this.damage = 50;
        this.initiative = 50;
        this.image = unitsImages.Centaur;
    }
}
