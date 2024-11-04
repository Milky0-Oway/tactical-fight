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
        const currentAttackingUnit = this.getCurrentAttackingUnit(
            unitsInTurn,
            attackingTeam,
        );

        if (!currentAttackingUnit || unitsInTurn.length === 0) {
            this.finishTurn(attackingTeam);
            return;
        }

        if (currentAttackingUnit.isDefending) {
            this.skipTurn(currentAttackingUnit, unitsInTurn, attackingTeam);
            return;
        }

        if (!currentTarget) return;

        if (currentAttackingUnit.healingPower) {
            currentAttackingUnit.performAction(currentTarget, {
                alingTeam: attackingTeam,
                enemyTeam,
            });
        } else {
            currentAttackingUnit.performAction(currentTarget, {
                alingTeam: attackingTeam,
                enemyTeam,
            });
        }

        currentAttackingUnit.completeTurn();
        this.setNextAttackingUnit(attackingTeam, unitsInTurn);
    };

    public static skipTurn(
        currentUnit: Unit,
        unitsInTurn: Unit[],
        attackingTeam: Team,
    ): void {
        currentUnit.completeTurn();

        const nextAttackingUnit = this.getNextAttackingUnit(unitsInTurn);
        if (!nextAttackingUnit) {
            attackingTeam.isAttackTurnCompleted = true;
            attackingTeam
                .getUnits()
                .forEach((unit) => (unit.hasCompletedTheTurn = false));
        }
    }

    public static getNextAttackingUnit(unitsInTurn: Unit[]): Unit | null {
        return unitsInTurn.find((unit) => !unit.hasCompletedTheTurn) || null;
    }

    public static finishTurn(attackingTeam: Team): void {
        attackingTeam.isAttackTurnCompleted = true;
        attackingTeam.getUnits().forEach((unit) => unit.resetTurn());
    }

    public static getCurrentAttackingUnit(
        unitsInTurn: Unit[],
        attackingTeam: Team,
    ): Unit | null {
        const currentUnit =
            unitsInTurn.find((unit) => !unit.hasCompletedTheTurn) || null;
        if (!currentUnit) {
            attackingTeam.isAttackTurnCompleted = true;
            attackingTeam
                .getUnits()
                .forEach((unit) => (unit.hasCompletedTheTurn = false));
        }
        return currentUnit;
    }

    private static setNextAttackingUnit(
        attackingTeam: Team,
        unitsInTurn: Unit[],
    ): void {
        const nextUnit = this.getNextAttackingUnit(unitsInTurn);
        if (!nextUnit) {
            attackingTeam.isAttackTurnCompleted = true;
            attackingTeam
                .getUnits()
                .forEach((unit) => (unit.hasCompletedTheTurn = false));
        }
    }

    public static switchTurn = (teamA: Team, teamB: Team): void => {
        if (teamA.isMyTurn) {
            teamA.isMyTurn = false;
            teamB.isMyTurn = true;
            teamB.isAttackTurnCompleted = false;
            teamB.clearDefending();
            teamA.clearParalyzing();
        } else {
            teamA.isMyTurn = true;
            teamA.isAttackTurnCompleted = false;
            teamB.isMyTurn = false;
            teamA.clearDefending();
            teamB.clearParalyzing();
        }
    };
}
