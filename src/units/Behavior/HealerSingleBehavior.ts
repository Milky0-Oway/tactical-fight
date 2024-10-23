import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';

export class HealerSingleBehavior implements UnitBehavior {
    performAction(attacker: Unit, target: Unit): void {
        if (target.isAlive() && !attacker.isParalyzed) {
            target.heal(attacker.healingPower);
        }
    }
}
