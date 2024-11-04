import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';
import { Team } from '../Team';

export class HealerMassBehavior implements UnitBehavior {
    performAction(
        healer: Unit,
        targets: Unit[],
        teams: { alingTeam: Team; enemyTeam: Team },
    ): void {
        const possibleTargets = this.definePossibleTargets(teams, healer);
        if (!healer.isParalyzed) {
            targets.forEach((target) => {
                if (possibleTargets.includes(target)) {
                    target.heal(healer.healingPower);
                }
            });
        }
    }

    definePossibleTargets(
        teams: { alingTeam: Team; enemyTeam: Team },
        attacker: Unit,
    ): Unit[] {
        return teams.alingTeam
            .getAliveUnits()
            .filter((unit) => unit !== attacker);
    }
}
