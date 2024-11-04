import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';
import { Team } from '../Team';

export class MageBehavior implements UnitBehavior {
    performAction(
        attacker: Unit,
        targets: Unit[],
        teams: { alingTeam: Team; enemyTeam: Team },
    ): void {
        const possibleTargets = this.definePossibleTargets(teams);
        if (!attacker.isParalyzed) {
            targets.forEach((target) => {
                if (possibleTargets.includes(target)) {
                    target.takeDamage(attacker.damage);
                }
            });
        }
    }

    definePossibleTargets(teams: { alingTeam: Team; enemyTeam: Team }): Unit[] {
        return teams.enemyTeam.getAliveUnits();
    }
}
