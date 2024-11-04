import { Team } from '../units/Team';
import { Unit } from '../units/Unit';

export class UnitsForTurn {
    public static UnitsForTurn = (teamA: Team, teamB: Team): Unit[] => {
        return [...teamA.getUnits(), ...teamB.getUnits()]
            .filter((unit) => unit.isAlive() && !unit.isParalyzed)
            .sort((a, b) => b.initiative - a.initiative);
    };
}
