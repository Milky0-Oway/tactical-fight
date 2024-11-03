import { Team, teams } from '../units/Team';
import { Unit } from '../units/Unit';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Team Class', () => {
    let teamA: Team;
    let teamB: Team;

    beforeEach(() => {
        teamA = new Team(teams.A);
        teamB = new Team(teams.B);
    });

    test('should initialize with correct team name and turn status', () => {
        expect(teamA.name).toBe(teams.A);
        expect(teamA.isMyTurn).toBe(true);
        expect(teamB.name).toBe(teams.B);
        expect(teamB.isMyTurn).toBe(false);
    });

    test('should initialize with 6 units for each team', () => {
        expect(teamA.getUnits().length).toBe(6);
        expect(teamB.getUnits().length).toBe(6);
    });

    test('should have units initialized with the correct position for team A', () => {
        const positionsA = teamA.getUnits().map((unit) => unit.position);
        expect(positionsA).toEqual([
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [2, 2],
            [2, 3],
        ]);
    });

    test('should have units initialized with the correct position for team B', () => {
        const positionsB = teamB.getUnits().map((unit) => unit.position);
        expect(positionsB).toEqual([
            [3, 1],
            [3, 2],
            [3, 3],
            [4, 1],
            [4, 2],
            [4, 3],
        ]);
    });

    test('should return all units', () => {
        const units = teamA.getUnits();
        expect(units).toEqual(expect.any(Array));
        expect(units.every((unit) => unit instanceof Unit)).toBe(true);
    });

    test('should return only alive units', () => {
        teamA.getUnits()[0].currentHp = 0;
        teamA.getUnits()[1].currentHp = 0;

        const aliveUnits = teamA.getAliveUnits();
        expect(aliveUnits.length).toBe(4);
    });

    test('should correctly report if team has alive units', () => {
        expect(teamA.hasAliveUnits()).toBe(true);

        teamA.getUnits().forEach((unit) => (unit.currentHp = 0));
        expect(teamA.hasAliveUnits()).toBe(false);
    });

    test('should clear defending status for all units', () => {
        teamA.getUnits().forEach((unit) => (unit.isDefending = true));
        teamA.clearDefending();

        teamA.getUnits().forEach((unit) => {
            expect(unit.isDefending).toBe(false);
        });
    });

    test('should clear paralyzing status for all units', () => {
        teamA.getUnits().forEach((unit) => (unit.isParalyzed = true));
        teamA.clearParalyzing();

        teamA.getUnits().forEach((unit) => {
            expect(unit.isParalyzed).toBe(false);
        });
    });

    test('should complete attack turn status correctly', () => {
        expect(teamA.isAttackTurnCompleted).toBe(false);
        teamA.isAttackTurnCompleted = true;
        expect(teamA.isAttackTurnCompleted).toBe(true);
    });
});
