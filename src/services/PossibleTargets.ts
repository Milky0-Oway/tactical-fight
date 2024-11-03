import { Unit } from '../units/Unit';
import { Team, teams } from '../units/Team';
import { UnitsForTurn } from './UnitsForTurn';
import { AttackTurn } from './AttackTurn';

export class PossibleTargets {
    public static definePossibleMeleeTargets(
        unit: Unit,
        enemyTeam: Team,
    ): Unit[] {
        const possibleTargets: Unit[] = [];
        const enemyUnits = enemyTeam.getUnits();

        enemyUnits.forEach((enemyUnit) => {
            const rowDiff = Math.abs(enemyUnit.position[0] - unit.position[0]);
            const columnDiff = Math.abs(
                enemyUnit.position[1] - unit.position[1],
            );

            if (rowDiff === 1) {
                if (columnDiff <= 1 && enemyUnit.isAlive()) {
                    possibleTargets.push(enemyUnit);
                } else if (columnDiff === 2) {
                    if (enemyUnit.position[1] === 3) {
                        let unitIsReachable = false;

                        if (enemyTeam.name === teams.B) {
                            unitIsReachable =
                                !enemyUnits[0].isAlive() &&
                                !enemyUnits[1].isAlive();
                        } else {
                            unitIsReachable =
                                !enemyUnits[3].isAlive() &&
                                !enemyUnits[4].isAlive();
                        }

                        if (unitIsReachable && enemyUnit.isAlive()) {
                            possibleTargets.push(enemyUnit);
                        }
                    } else if (enemyUnit.position[1] === 1) {
                        let unitIsReachable = false;

                        if (enemyTeam.name === teams.B) {
                            unitIsReachable =
                                !enemyUnits[2].isAlive() &&
                                !enemyUnits[1].isAlive();
                        } else {
                            unitIsReachable =
                                !enemyUnits[5].isAlive() &&
                                !enemyUnits[4].isAlive();
                        }

                        if (unitIsReachable && enemyUnit.isAlive()) {
                            possibleTargets.push(enemyUnit);
                        }
                    }
                }
            } else if (rowDiff === 2) {
                if (unit.position[1] === 2) {
                    if (
                        enemyTeam.name === teams.B &&
                        !enemyUnits[1].isAlive()
                    ) {
                        for (let i = 3; i < 6; i++) {
                            if (enemyUnits[i].isAlive())
                                possibleTargets.push(enemyUnits[i]);
                        }
                    } else if (
                        enemyTeam.name === teams.A &&
                        !enemyUnits[4].isAlive()
                    ) {
                        for (let i = 0; i < 3; i++) {
                            if (enemyUnits[i].isAlive())
                                possibleTargets.push(enemyUnits[i]);
                        }
                    }
                } else {
                    let isReachable = true;
                    if (enemyTeam.name === teams.B) {
                        for (let i = 0; i < 3; i++) {
                            isReachable =
                                isReachable && !enemyUnits[i].isAlive();
                        }
                    } else {
                        for (let i = 3; i < 6; i++) {
                            isReachable =
                                isReachable && !enemyUnits[i].isAlive();
                        }
                    }

                    if (isReachable && enemyUnit.isAlive()) {
                        possibleTargets.push(enemyUnit);
                    }
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

        const nextUnit = AttackTurn.getNextAttackingUnit(
            UnitsForTurn.UnitsForTurn(attackingTeam),
        );
        if (!nextUnit) {
            AttackTurn.finishTurn(attackingTeam);
        }
    }
}
