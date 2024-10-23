import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';

export class ParalyzerBehavior implements UnitBehavior {
    performAction(attacker: Unit, target: Unit): void {
        if (target.isAlive() && !attacker.isParalyzed) {
            target.paralyze();
        }
    }
}
