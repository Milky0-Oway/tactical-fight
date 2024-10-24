import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';
import { Team } from '../Team';
import { PossibleTargets } from '../../services/PossibleTargets';

export class HealerSingleBehavior implements UnitBehavior {
    performAction(healer: Unit, target: Unit, healerTeam: Team): void {
        const possibleTargets = PossibleTargets.definePossibleHealTargets(
            healer,
            healerTeam,
        );
        if (possibleTargets.includes(target) && !healer.isParalyzed) {
            target.heal(healer.healingPower);
        }
    }
}
