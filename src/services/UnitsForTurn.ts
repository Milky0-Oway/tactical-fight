import { Team } from '../units/Team';
import { Unit } from '../units/Unit';

export class UnitsForTurn {
    public static UnitsForTurn = (team: Team): Unit[] => {
        return team
            .getUnits()
            .filter((unit) => unit.isAlive() && !unit.isParalyzed)
            .sort((a, b) => b.initiative - a.initiative);
    };
}
