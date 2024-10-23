import { Archimage } from './Damagers/Archimage';
import { Bandit } from './Damagers/Bandit';
import { Centaur } from './Damagers/Centaur';
import { ElfArcher } from './Damagers/ElfArcher';
import { Skeleton } from './Damagers/Skeleton';
import { SkeletonMage } from './Damagers/SkeletonMage';
import { Bishop } from './Healers/Bishop';
import { Monk } from './Healers/Monk';
import { Sirena } from './Paralizers/Sirena';
import { Unit, Units } from './Unit';

export class GeneralUnitFactory {
    createUnit(type: Units, position: Array<number>): Unit {
        switch (type) {
            case Units.Archimage:
                return new Archimage(position);
            case Units.Bandit:
                return new Bandit(position);
            case Units.Bishop:
                return new Bishop(position);
            case Units.Centaur:
                return new Centaur(position);
            case Units.ElfArcher:
                return new ElfArcher(position);
            case Units.Monk:
                return new Monk(position);
            case Units.Sirena:
                return new Sirena(position);
            case Units.Skeleton:
                return new Skeleton(position);
            case Units.SkeletonMage:
                return new SkeletonMage(position);
            default:
                throw new Error('Unknown unit type');
        }
    }
}
