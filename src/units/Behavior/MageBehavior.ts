import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';

export class MageBehavior implements UnitBehavior {
    performAction(attacker: Unit, targets: Unit[]): void {
        if (!attacker.isParalyzed) {
            targets.forEach((target) => {
                if (target.isAlive()) {
                    target.takeDamage(attacker.damage);
                }
            });
        }
    }
}
