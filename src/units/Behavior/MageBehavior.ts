import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';
import { PossibleTargets } from '../../services/PossibleTargets';
import { Team } from '../Team';

export class MageBehavior implements UnitBehavior {
    performAction(attacker: Unit, targets: Unit[], enemyTeam: Team): void {
        const possibleTargets =
            PossibleTargets.definePossibleRangeTargets(enemyTeam);
        if (!attacker.isParalyzed) {
            targets.forEach((target) => {
                if (possibleTargets.includes(target)) {
                    target.takeDamage(attacker.damage);
                }
            });
        }
    }
}
