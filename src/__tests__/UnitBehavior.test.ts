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

            archimage.performAction(teamB.getUnits(), {
                alingTeam: teamA,
                enemyTeam: teamB,
            });

            teamB
                .getUnits()
                .forEach((unit) =>
                    expect(unit.currentHp).toBeLessThan(unit.maxHp),
                );
        });

        test('should define multiple targets', () => {
            const archimage = new Archimage([1, 1]);

            const targets = archimage.definePossibleTargets({
                alingTeam: teamA,
                enemyTeam: teamB,
            });

            expect(targets).toHaveLength(6);
        });
    });

    describe('Bandit (Range Behavior)', () => {
        test('should deal damage to a single target', () => {
            const bandit = new Bandit([1, 1]);
            const target = teamB.getUnits()[3];

            bandit.performAction(target, {
                alingTeam: teamA,
                enemyTeam: teamB,
            });

            expect(target.currentHp).toBeLessThan(target.maxHp);
        });

        test('should define multiple targets', () => {
            const bandit = new Bandit([1, 1]);

            const targets = bandit.definePossibleTargets({
                alingTeam: teamA,
                enemyTeam: teamB,
            });

            expect(targets).toHaveLength(6);
        });
    });

    describe('Centaur (Melee Behavior)', () => {
        test('should deal damage to a single target in melee range', () => {
            const centaur = new Centaur([2, 1]);
            const target = new Bandit([1, 2]);
            teamB.getUnits()[0] = target;

            centaur.performAction(target, {
                alingTeam: teamA,
                enemyTeam: teamB,
            });

            expect(target.currentHp).toBeLessThan(target.maxHp);
        });

        describe('should define targets', () => {
            describe('unit is in team A', () => {
                test("unit's position is [2,1]", () => {
                    const unit = new Centaur([2, 1]);
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamA, enemyTeam: teamB },
                        unit,
                    );

                    expect(targets).toHaveLength(2);
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [3, 1] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [3, 2] }),
                    );
                });

                test("unit's position is [2,2]", () => {
                    const unit = new Centaur([2, 2]);
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamA, enemyTeam: teamB },
                        unit,
                    );

                    expect(targets).toHaveLength(3);
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [3, 1] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [3, 2] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [3, 3] }),
                    );
                });

                test("unit's position is [2,3]", () => {
                    const unit = new Centaur([2, 3]);
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamA, enemyTeam: teamB },
                        unit,
                    );

                    expect(targets).toHaveLength(2);
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [3, 2] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [3, 3] }),
                    );
                });

                test('unit is in the second line', () => {
                    const unit = new Centaur([1, 2]);
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamA, enemyTeam: teamB },
                        unit,
                    );

                    expect(targets).toHaveLength(0);
                });

                test('first line is dead', () => {
                    const unit = new Centaur([2, 1]);
                    teamB.getUnits()[0].currentHp = 0;
                    teamB.getUnits()[1].currentHp = 0;
                    teamB.getUnits()[2].currentHp = 0;
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamA, enemyTeam: teamB },
                        unit,
                    );

                    expect(targets).toHaveLength(3);
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [4, 1] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [4, 2] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [4, 3] }),
                    );
                });
            });

            describe('unit is in team B', () => {
                test("unit's position is [3,1]", () => {
                    const unit = new Centaur([3, 1]);
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamB, enemyTeam: teamA },
                        unit,
                    );

                    expect(targets).toHaveLength(2);
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [2, 1] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [2, 2] }),
                    );
                });

                test("unit's position is [3,2]", () => {
                    const unit = new Centaur([3, 2]);
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamB, enemyTeam: teamA },
                        unit,
                    );

                    expect(targets).toHaveLength(3);
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [2, 1] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [2, 2] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [2, 3] }),
                    );
                });

                test("unit's position is [3,3]", () => {
                    const unit = new Centaur([3, 3]);
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamB, enemyTeam: teamA },
                        unit,
                    );

                    expect(targets).toHaveLength(2);
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [2, 2] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [2, 3] }),
                    );
                });

                test('unit is in the second line', () => {
                    const unit = new Centaur([4, 2]);
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamB, enemyTeam: teamA },
                        unit,
                    );

                    expect(targets).toHaveLength(0);
                });

                test('first line is dead', () => {
                    const unit = new Centaur([3, 1]);
                    teamA.getUnits()[3].currentHp = 0;
                    teamA.getUnits()[4].currentHp = 0;
                    teamA.getUnits()[5].currentHp = 0;
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamB, enemyTeam: teamA },
                        unit,
                    );

                    expect(targets).toHaveLength(3);
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [1, 1] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [1, 2] }),
                    );
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [1, 3] }),
                    );
                });

                test("unit's position is [3,1] and [2,1] and [2,2] are dead", () => {
                    const unit = new Centaur([3, 1]);
                    teamA.getUnits()[3].currentHp = 0;
                    teamA.getUnits()[4].currentHp = 0;
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamB, enemyTeam: teamA },
                        unit,
                    );

                    expect(targets).toHaveLength(1);
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [2, 3] }),
                    );
                });

                test("unit's position is [3,3] and [2,3] and [2,2] are dead", () => {
                    const unit = new Centaur([3, 1]);
                    teamA.getUnits()[5].currentHp = 0;
                    teamA.getUnits()[4].currentHp = 0;
                    const targets = unit.definePossibleTargets(
                        { alingTeam: teamB, enemyTeam: teamA },
                        unit,
                    );

                    expect(targets).toHaveLength(1);
                    expect(targets).toContainEqual(
                        expect.objectContaining({ position: [2, 1] }),
                    );
                });
            });
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

            bishop.performAction([ally1, ally2], {
                alingTeam: teamA,
                enemyTeam: teamB,
            });

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

            monk.performAction(ally, { alingTeam: teamA, enemyTeam: teamB });

            expect(ally.currentHp).toBeGreaterThan(ally.maxHp - 30);
        });
    });

    describe('Sirena (Paralyzer Behavior)', () => {
        test('should paralyze a target within range', () => {
            const sirena = new Sirena([1, 1]);

            const target = teamB.getUnits()[2];

            sirena.performAction(target, {
                alingTeam: teamA,
                enemyTeam: teamB,
            });

            expect(target.isParalyzed).toBe(true);
        });

        test('should define multiple targets', () => {
            const sirena = new Sirena([1, 1]);

            const targets = sirena.definePossibleTargets({
                alingTeam: teamA,
                enemyTeam: teamB,
            });

            expect(targets).toHaveLength(6);
        });
    });
});
