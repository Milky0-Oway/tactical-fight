import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';

export class HealerMassBehavior implements UnitBehavior {
    performAction(attacker: Unit, targets: Unit[]): void {
        if (!attacker.isParalyzed) {
            targets.forEach((ally) => {
                if (ally.isAlive()) {
                    ally.heal(attacker.healingPower);
                }
            });
        }
    }
}
