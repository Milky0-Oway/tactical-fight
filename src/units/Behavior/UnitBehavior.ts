import { Unit } from '../Unit';
import { Team } from '../Team';

export interface UnitBehavior {
    performAction(
        attacker: Unit,
        target: Unit | Unit[],
        { alingTeam, enemyTeam }: { alingTeam: Team; enemyTeam: Team },
    ): void;
    definePossibleTargets(
        { alingTeam, enemyTeam }: { alingTeam: Team; enemyTeam: Team },
        attacker?: Unit,
    ): Unit[];
}
