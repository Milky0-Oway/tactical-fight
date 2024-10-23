import { UnitBehavior } from './Behavior/UnitBehavior';

export abstract class Unit {
    public position: Array<number>;
    public id: string = '';
    public type: string = '';
    public name: string = '';
    public maxHp: number = 0;
    public currentHp: number = 0;
    public damage: number = 0;
    public healingPower: number = 0;
    public initiative: number = 0;
    public isParalyzed: boolean = false;
    public isDefending: boolean = false;
    public image: string = '';
    public hasCompletedTheTurn: boolean = false;

    private behavior: UnitBehavior;

    constructor(position: Array<number>, behavior: UnitBehavior) {
        this.position = position;
        this.behavior = behavior;
    }

    public performAction(target: Unit | Unit[]): void {
        this.behavior.performAction(this, target);
    }

    public paralyze(): void {
        this.isParalyzed = true;
    }

    public defend(): void {
        this.isDefending = true;
    }

    public completeTurn(): void {
        this.hasCompletedTheTurn = true;
    }

    public isAlive() {
        return this.currentHp > 0;
    }

    public takeDamage(damage: number): void {
        this.currentHp -= damage;
        if (this.currentHp <= 0) {
            this.currentHp = 0;
        }
    }

    public heal(amount: number): void {
        if (this.isAlive()) {
            this.currentHp = Math.min(this.maxHp, this.currentHp + amount);
        }
    }
}

export enum UnitType {
    Melee = 'melee',
    Range = 'range',
    Mage = 'mage',
    HealerSingle = 'healerSingle',
    HealerMass = 'healerMass',
    Paralyzer = 'paralyzer',
}

export enum Units {
    Skeleton = 'Skeleton',
    Centaur = 'Centaur',
    Bandit = 'Bandit',
    ElfArcher = 'ElfArcher',
    SkeletonMage = 'SkeletonMage',
    Archimage = 'Archimage',
    Monk = 'Monk',
    Bishop = 'Bishop',
    Sirena = 'Sirena',
}

export enum unitsImages {
    Skeleton = '/assets/skeleton.jpg',
    Centaur = '/assets/centaur.jpg',
    Bandit = '/assets/bandit.jpg',
    ElfArcher = '/assets/elfArcher.jpg',
    SkeletonMage = '/assets/skeletonMage.jpg',
    Archimage = '/assets/archimage.jpg',
    Monk = '/assets/monk.jpg',
    Bishop = '/assets/bishop.png',
    Sirena = '/assets/siren.png',
}
