import { UnitsForTurn } from './UnitsForTurn';
import { Team } from '../units/Team';
import { Unit } from '../units/Unit';

export class AttackTurn {
    public static processAttackTurn = (
        attackingTeam: Team,
        enemyTeam: Team,
        currentTarget: Unit | Unit[] | null,
    ): void => {
        const unitsInTurn = UnitsForTurn.UnitsForTurn(attackingTeam);

        const currentAttackingUnit = this.prepareAttackingUnit(unitsInTurn);

        if (!currentAttackingUnit || unitsInTurn.length === 0) {
            this.finishTurn(attackingTeam);
            return;
        }

        if (currentAttackingUnit.isDefending) {
            this.skipTurn(currentAttackingUnit, attackingTeam);
            return;
        }

        if (!currentTarget) return;

        if (currentAttackingUnit.healingPower) {
            currentAttackingUnit.performAction(currentTarget, attackingTeam);
        } else {
            currentAttackingUnit.performAction(currentTarget, enemyTeam);
        }

        currentAttackingUnit.completeTurn();
        this.setNextAttackingUnit(attackingTeam, unitsInTurn);
    };

    private static prepareAttackingUnit(unitsInTurn: Unit[]): Unit | null {
        const currentAttackingUnit = this.getCurrentAttackingUnit(unitsInTurn);
        if (!currentAttackingUnit) return null;

        return currentAttackingUnit;
    }

    public static skipTurn(currentUnit: Unit, attackingTeam: Team): void {
        currentUnit.completeTurn();
        const unitsInTurn = UnitsForTurn.UnitsForTurn(attackingTeam);
        this.setNextAttackingUnit(attackingTeam, unitsInTurn);
    }

    public static getNextAttackingUnit(unitsInTurn: Unit[]): Unit | null {
        return unitsInTurn.find((unit) => !unit.completeTurn) || null;
    }

    public static finishTurn(attackingTeam: Team): void {
        attackingTeam.isAttackTurnCompleted = true;
        attackingTeam.getUnits().forEach((unit) => unit.resetTurn());
    }

    private static getCurrentAttackingUnit(unitsInTurn: Unit[]): Unit | null {
        return unitsInTurn.find((unit) => !unit.completeTurn) || null;
    }

    private static setNextAttackingUnit(
        attackingTeam: Team,
        unitsInTurn: Unit[],
    ): void {
        const nextUnit = this.getNextAttackingUnit(unitsInTurn);
        if (nextUnit) {
            nextUnit.isCurrent = true;
        }

        this.checkEndOfTurn(attackingTeam, nextUnit);
    }

    private static checkEndOfTurn(
        attackingTeam: Team,
        currentUnit: Unit | null,
    ): void {
        if (
            !currentUnit ||
            !this.getNextAttackingUnit(UnitsForTurn.UnitsForTurn(attackingTeam))
        ) {
            this.finishTurn(attackingTeam);
        }
    }
}
