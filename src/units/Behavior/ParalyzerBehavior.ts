import { PossibleTargets } from '../../services/PossibleTargets';
import { Team } from '../Team';
import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';

export class ParalyzerBehavior implements UnitBehavior {
    performAction(attacker: Unit, target: Unit, enemyTeam: Team): void {
        const possibleTargets =
            PossibleTargets.definePossibleRangeTargets(enemyTeam);
        if (possibleTargets.includes(target) && !attacker.isParalyzed) {
            target.paralyze();
        }
    }
}
