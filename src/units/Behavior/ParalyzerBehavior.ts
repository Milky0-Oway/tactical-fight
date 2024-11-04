import { Team } from '../Team';
import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';

export class ParalyzerBehavior implements UnitBehavior {
    performAction(
        attacker: Unit,
        target: Unit,
        teams: { alingTeam: Team; enemyTeam: Team },
    ): void {
        const possibleTargets = this.definePossibleTargets(teams);
        if (possibleTargets.includes(target) && !attacker.isParalyzed) {
            target.paralyze();
        }
    }

    definePossibleTargets(teams: { alingTeam: Team; enemyTeam: Team }): Unit[] {
        return teams.enemyTeam.getAliveUnits();
    }
}
