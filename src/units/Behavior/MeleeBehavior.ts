import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';

export class MeleeBehavior implements UnitBehavior {
    performAction(attacker: Unit, target: Unit): void {
        if (target.isAlive() && !attacker.isParalyzed) {
            target.takeDamage(attacker.damage);
        }
    }
}
