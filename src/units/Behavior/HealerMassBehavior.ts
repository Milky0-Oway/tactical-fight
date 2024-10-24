import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';
import { PossibleTargets } from '../../services/PossibleTargets';
import { Team } from '../Team';

export class HealerMassBehavior implements UnitBehavior {
    performAction(healer: Unit, targets: Unit[], healerTeam: Team): void {
        const possibleTargets = PossibleTargets.definePossibleHealTargets(
            healer,
            healerTeam,
        );
        if (!healer.isParalyzed) {
            targets.forEach((target) => {
                if (possibleTargets.includes(target)) {
                    target.heal(healer.healingPower);
                }
            });
        }
    }
}
