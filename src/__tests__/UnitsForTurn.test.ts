import { Team } from '../units/Team';
import { UnitsForTurn } from '../services/UnitsForTurn';
import { teams } from '../units/Team';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('UnitsForTurn', () => {
    let teamA: Team;

    beforeEach(() => {
        teamA = new Team(teams.A);
        teamA.getUnits().forEach((unit) => {
            unit.isAlive = jest.fn().mockReturnValue(true);
            unit.isParalyzed = false;
        });
    });

    test('should return only alive and non-paralyzed units', () => {
        teamA.getUnits()[0].isAlive = jest.fn().mockReturnValue(false);
        teamA.getUnits()[1].isParalyzed = true;

        const result = UnitsForTurn.UnitsForTurn(teamA, teamA);

        expect(result).not.toContain(teamA.getUnits()[0]);
        expect(result).not.toContain(teamA.getUnits()[1]);
        expect(
            result.every((unit) => unit.isAlive() && !unit.isParalyzed),
        ).toBe(true);
    });

    test('should return units sorted by initiative in descending order', () => {
        teamA.getUnits().forEach((unit, index) => {
            unit.initiative = index;
        });
        const result = UnitsForTurn.UnitsForTurn(teamA, teamA);

        for (let i = 1; i < result.length; i++) {
            expect(result[i - 1].initiative).toBeGreaterThanOrEqual(
                result[i].initiative,
            );
        }
    });

    test('should return an empty array if all units are dead or paralyzed', () => {
        teamA.getUnits().forEach((unit) => {
            unit.isAlive = jest.fn().mockReturnValue(false);
            unit.isParalyzed = true;
        });

        const result = UnitsForTurn.UnitsForTurn(teamA, teamA);
        expect(result).toEqual([]);
    });

    test('should return an array of units when no units are dead or paralyzed', () => {
        const result = UnitsForTurn.UnitsForTurn(teamA, teamA);
        expect(result.length).toBe(teamA.getUnits().length * 2);
    });
});
