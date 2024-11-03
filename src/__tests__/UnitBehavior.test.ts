import { Team, teams } from '../units/Team';
import { Archimage } from '../units/Damagers/Archimage';
import { Bandit } from '../units/Damagers/Bandit';
import { Centaur } from '../units/Damagers/Centaur';
import { Bishop } from '../units/Healers/Bishop';
import { Monk } from '../units/Healers/Monk';
import { Sirena } from '../units/Paralizers/Sirena';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Unit Classes', () => {
    let teamA: Team;
    let teamB: Team;

    beforeEach(() => {
        teamA = new Team(teams.A);
        teamB = new Team(teams.B);
    });

    describe('Archimage (Mage Behavior)', () => {
        test('should deal damage to multiple targets', () => {
            const archimage = new Archimage([1, 1]);

            archimage.performAction(teamB.getUnits(), teamB);

            teamB
                .getUnits()
                .forEach((unit) =>
                    expect(unit.currentHp).toBeLessThan(unit.maxHp),
                );
        });
    });

    describe('Bandit (Range Behavior)', () => {
        test('should deal damage to a single target', () => {
            const bandit = new Bandit([1, 1]);
            const target = teamB.getUnits()[3];

            bandit.performAction(target, teamB);

            expect(target.currentHp).toBeLessThan(target.maxHp);
        });
    });

    describe('Centaur (Melee Behavior)', () => {
        test('should deal damage to a single target in melee range', () => {
            const centaur = new Centaur([2, 1]);
            const target = new Bandit([1, 2]);
            teamB.getUnits()[0] = target;

            centaur.performAction(target, teamB);

            expect(target.currentHp).toBeLessThan(target.maxHp);
        });
    });

    describe('Bishop (HealerMass Behavior)', () => {
        test('should heal multiple targets in team', () => {
            const bishop = new Bishop([1, 1]);
            const ally1 = new Centaur([1, 2]);
            const ally2 = new Bandit([1, 3]);
            ally1.currentHp -= 20;
            ally2.currentHp -= 30;
            teamA.getUnits()[0] = bishop;
            teamA.getUnits()[1] = ally1;
            teamA.getUnits()[2] = ally2;

            bishop.performAction([ally1, ally2], teamA);

            expect(ally1.currentHp).toBeGreaterThan(ally1.maxHp - 20);
            expect(ally2.currentHp).toBeGreaterThan(ally2.maxHp - 30);
        });
    });

    describe('Monk (HealerSingle Behavior)', () => {
        test('should heal a single target in team', () => {
            const monk = new Monk([1, 1]);
            const ally = new Centaur([1, 2]);
            ally.currentHp -= 30;
            teamA.getUnits()[0] = monk;
            teamA.getUnits()[1] = ally;

            monk.performAction(ally, teamA);

            expect(ally.currentHp).toBeGreaterThan(ally.maxHp - 30);
        });
    });

    describe('Sirena (Paralyzer Behavior)', () => {
        test('should paralyze a target within range', () => {
            const sirena = new Sirena([1, 1]);

            const target = teamB.getUnits()[2];

            sirena.performAction(target, teamB);

            expect(target.isParalyzed).toBe(true);
        });
    });
});
