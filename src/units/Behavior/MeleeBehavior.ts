import { Team, teams } from '../Team';
import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';

export class MeleeBehavior implements UnitBehavior {
    performAction(
        attacker: Unit,
        target: Unit,
        teams: { alingTeam: Team; enemyTeam: Team },
    ): void {
        const possibleTargets = this.definePossibleTargets(teams, attacker);
        if (possibleTargets.includes(target) && !attacker.isParalyzed) {
            target.takeDamage(attacker.damage);
        }
    }

    definePossibleTargets(
        team: { alingTeam: Team; enemyTeam: Team },
        attacker: Unit,
    ): Unit[] {
        const possibleTargets: Unit[] = [];
        const enemyUnits = team.enemyTeam.getUnits();

        enemyUnits.forEach((enemyUnit) => {
            const rowDiff = Math.abs(
                enemyUnit.position[0] - attacker.position[0],
            );
            const columnDiff = Math.abs(
                enemyUnit.position[1] - attacker.position[1],
            );

            if (rowDiff === 1) {
                if (columnDiff <= 1 && enemyUnit.isAlive()) {
                    possibleTargets.push(enemyUnit);
                } else if (columnDiff === 2) {
                    if (enemyUnit.position[1] === 3) {
                        let unitIsReachable = false;

                        if (team.enemyTeam.name === teams.B) {
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

                        if (team.enemyTeam.name === teams.B) {
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
                if (attacker.position[1] === 2) {
                    if (
                        team.enemyTeam.name === teams.B &&
                        !enemyUnits[1].isAlive()
                    ) {
                        for (let i = 3; i < 6; i++) {
                            if (enemyUnits[i].isAlive())
                                possibleTargets.push(enemyUnits[i]);
                        }
                    } else if (
                        team.enemyTeam.name === teams.A &&
                        !enemyUnits[4].isAlive()
                    ) {
                        for (let i = 0; i < 3; i++) {
                            if (enemyUnits[i].isAlive())
                                possibleTargets.push(enemyUnits[i]);
                        }
                    }
                } else {
                    let isReachable = true;
                    if (team.enemyTeam.name === teams.B) {
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
}
