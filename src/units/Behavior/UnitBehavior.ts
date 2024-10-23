import { Unit } from '../Unit';

export interface UnitBehavior {
    performAction(attacker: Unit, target: Unit | Unit[]): void;
}
