import { Unit } from '../Unit';
import { Team } from '../Team';

export interface UnitBehavior {
    performAction(
        attacker: Unit,
        target: Unit | Unit[],
        team: Team,
        myTeam?: Team,
    ): void;
}
