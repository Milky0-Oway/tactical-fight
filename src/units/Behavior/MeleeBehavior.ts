import { PossibleTargets } from '../../services/PossibleTargets';
import { Team } from '../Team';
import { Unit } from '../Unit';
import { UnitBehavior } from './UnitBehavior';

export class MeleeBehavior implements UnitBehavior {
    performAction(
        attacker: Unit,
        target: Unit,
        enemyTeam: Team,
        myTeam: Team,
    ): void {
        const possibleTargets = PossibleTargets.definePossibleMeleeTargets(
            attacker,
            enemyTeam,
            myTeam,
        );
        if (possibleTargets.includes(target) && !attacker.isParalyzed) {
            target.takeDamage(attacker.damage);
        }
    }
}
