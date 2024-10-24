import { Unit } from '../units/Unit';
import { Team } from '../units/Team';
import { UnitsForTurn } from './UnitsForTurn';
import { AttackTurn } from './AttackTurn';

export class PossibleTargets {
    public static definePossibleMeleeTargets(
        unit: Unit,
        enemyTeam: Team,
    ): Unit[] {
        const possibleTargets: Unit[] = [];

        enemyTeam.getAliveUnits().forEach((enemyUnit) => {
            const rowDiff = Math.abs(enemyUnit.position[0] - unit.position[0]);

            if (rowDiff === 1) {
                const columnDiff = Math.abs(
                    enemyUnit.position[1] - unit.position[1],
                );

                if (columnDiff <= 1 && enemyUnit.isAlive()) {
                    possibleTargets.push(enemyUnit);
                }

                if (
                    columnDiff === 2 &&
                    this.isUnitReachableThroughDeadUnits(
                        unit,
                        enemyTeam,
                        enemyUnit,
                    )
                ) {
                    if (enemyUnit.isAlive()) {
                        possibleTargets.push(enemyUnit);
                    }
                }
            }

            if (
                rowDiff === 2 &&
                this.isUnitReachableThroughDeadUnits(unit, enemyTeam, enemyUnit)
            ) {
                if (enemyUnit.isAlive()) {
                    possibleTargets.push(enemyUnit);
                }
            }
        });

        return possibleTargets;
    }

    public static definePossibleRangeTargets(enemyTeam: Team): Unit[] {
        return enemyTeam.getAliveUnits();
    }

    public static definePossibleHealTargets(unit: Unit, myTeam: Team): Unit[] {
        return myTeam.getAliveUnits().filter((myUnit) => myUnit !== unit);
    }

    public static noTargetsAction(unit: Unit, attackingTeam: Team): void {
        unit.completeTurn();
        unit.isCurrent = false;
        attackingTeam.isAttacking = false;

        const nextUnit = AttackTurn.getNextAttackingUnit(
            UnitsForTurn.UnitsForTurn(attackingTeam),
        );
        if (nextUnit) {
            nextUnit.isCurrent = true;
        } else {
            AttackTurn.finishTurn(attackingTeam);
        }
    }

    private static isUnitReachableThroughDeadUnits(
        attacker: Unit,
        enemyTeam: Team,
        target: Unit,
    ): boolean {
        const attackerRow = attacker.position[0];
        const targetRow = target.position[0];

        if (Math.abs(attackerRow - targetRow) <= 1) {
            return true;
        }

        const frontRow = attackerRow === 0 ? 1 : 0;
        const deadUnitsInFront = enemyTeam
            .getUnits()
            .filter((unit) => unit.position[0] === frontRow && !unit.isAlive());

        const allUnitsInFront = enemyTeam
            .getUnits()
            .filter((unit) => unit.position[0] === frontRow);

        return deadUnitsInFront.length === allUnitsInFront.length;
    }
}
