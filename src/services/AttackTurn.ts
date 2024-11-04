import { UnitsForTurn } from './UnitsForTurn';
import { Team } from '../units/Team';
import { Unit } from '../units/Unit';

export class AttackTurn {
    private static paralyzedUnits: Unit[] = [];

    public static processAttackTurn = (
        teamA: Team,
        teamB: Team,
        currentTarget: Unit | Unit[] | null,
    ): void => {
        const unitsInTurn = UnitsForTurn.UnitsForTurn(teamA, teamB);
        const currentAttackingUnit = this.getCurrentAttackingUnit(unitsInTurn);

        if (!currentAttackingUnit || unitsInTurn.length === 0) {
            this.finishTurn(teamA, teamB);
            return;
        }

        if (currentAttackingUnit.isDefending)
            currentAttackingUnit.isDefending = false;

        if (!currentTarget) return;

        currentAttackingUnit.performAction(currentTarget, {
            alingTeam: teamA.getUnits().includes(currentAttackingUnit)
                ? teamA
                : teamB,
            enemyTeam: teamB.getUnits().includes(currentAttackingUnit)
                ? teamA
                : teamB,
        });

        currentAttackingUnit.completeTurn();
        this.setNextAttackingUnit(teamA, teamB, unitsInTurn);
    };

    public static skipTurn(
        currentUnit: Unit,
        unitsInTurn: Unit[],
        teamA: Team,
        teamB: Team,
    ): void {
        currentUnit.completeTurn();

        const nextAttackingUnit = this.getNextAttackingUnit(unitsInTurn);
        if (!nextAttackingUnit) {
            this.finishTurn(teamA, teamB);
        }
    }

    public static getNextAttackingUnit(unitsInTurn: Unit[]): Unit | null {
        return unitsInTurn.find((unit) => !unit.hasCompletedTheTurn) || null;
    }

    public static finishTurn(teamA: Team, teamB: Team): void {
        this.paralyzedUnits.forEach((unit) => (unit.isParalyzed = false));
        this.paralyzedUnits = [...teamA.getUnits(), ...teamB.getUnits()];
        teamA
            .getAliveUnits()
            .forEach((unit) => (unit.hasCompletedTheTurn = false));
        teamB
            .getAliveUnits()
            .forEach((unit) => (unit.hasCompletedTheTurn = false));
    }

    public static getCurrentAttackingUnit(unitsInTurn: Unit[]): Unit | null {
        const currentUnit =
            unitsInTurn.find((unit) => !unit.hasCompletedTheTurn) || null;
        return currentUnit;
    }

    private static setNextAttackingUnit(
        teamA: Team,
        teamB: Team,
        unitsInTurn: Unit[],
    ): void {
        const nextUnit = this.getNextAttackingUnit(unitsInTurn);
        if (!nextUnit) this.finishTurn(teamA, teamB);
    }
}
