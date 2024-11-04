import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';
import { Team } from '../Team';

export class HealerSingleBehavior implements UnitBehavior {
    performAction(
        healer: Unit,
        target: Unit,
        teams: { alingTeam: Team; enemyTeam: Team },
    ): void {
        const possibleTargets = this.definePossibleTargets(teams, healer);
        if (possibleTargets.includes(target) && !healer.isParalyzed) {
            target.heal(healer.healingPower);
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
