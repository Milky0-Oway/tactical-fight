import { getRandomUnit } from '../utils/getRandomUnitType';
import { Unit } from './Unit';
import { UnitFactory } from './UnitFactory';

export class Team {
    public name: string;
    private units: Unit[];
    public isMyTurn: boolean;
    public isAttackTurnCompleted: boolean;

    constructor(name: string) {
        this.name = name;
        this.isMyTurn = name === teams.A;
        this.isAttackTurnCompleted = false;

        if (name === teams.A) {
            this.units = [
                UnitFactory.createUnit(getRandomUnit(), [1, 1]),
                UnitFactory.createUnit(getRandomUnit(), [1, 2]),
                UnitFactory.createUnit(getRandomUnit(), [1, 3]),
                UnitFactory.createUnit(getRandomUnit(), [2, 1]),
                UnitFactory.createUnit(getRandomUnit(), [2, 2]),
                UnitFactory.createUnit(getRandomUnit(), [2, 3]),
            ];
        } else {
            this.units = [
                UnitFactory.createUnit(getRandomUnit(), [3, 1]),
                UnitFactory.createUnit(getRandomUnit(), [3, 2]),
                UnitFactory.createUnit(getRandomUnit(), [3, 3]),
                UnitFactory.createUnit(getRandomUnit(), [4, 1]),
                UnitFactory.createUnit(getRandomUnit(), [4, 2]),
                UnitFactory.createUnit(getRandomUnit(), [4, 3]),
            ];
        }
    }

    public getUnits(): Unit[] {
        return this.units;
    }

    public getAliveUnits(): Unit[] {
        return this.units.filter((unit) => unit.isAlive());
    }

    public hasAliveUnits(): boolean {
        return this.getAliveUnits().length > 0;
    }

    public clearDefending(): void {
        this.units.forEach((unit) => (unit.isDefending = false));
    }

    public clearParalyzing(): void {
        this.units.forEach((unit) => (unit.isParalyzed = false));
    }
}

export enum teams {
    A = 'A',
    B = 'B',
}
