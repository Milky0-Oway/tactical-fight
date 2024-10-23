import { Unit, UnitType, Units, unitsImages } from '../Unit';
import { RangeBehavior } from '../Behavior/RangeBehavior';

export class ElfArcher extends Unit {
    constructor(position: Array<number>) {
        super(position, new RangeBehavior());

        this.type = UnitType.Range;
        this.name = Units.ElfArcher;
        this.maxHp = 90;
        this.currentHp = 90;
        this.damage = 45;
        this.initiative = 60;
        this.image = unitsImages.ElfArcher;
    }
}
