import { PossibleTargets } from '../services/PossibleTargets';
import { Team, teams } from '../units/Team';
import { Units } from '../units/Unit';
import { UnitFactory } from '../units/UnitFactory';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('PossibleTargets', () => {
    let teamA: Team;
    let teamB: Team;

    beforeEach(() => {
        teamA = new Team(teams.A);
        teamB = new Team(teams.B);
    });

    describe('definePossibleMeleeTargets', () => {
        describe('unit is in team A', () => {
            test("unit's position is [2,1]", () => {
                const unit = UnitFactory.createUnit(Units.Skeleton, [2, 1]);
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamB,
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
                const unit = UnitFactory.createUnit(Units.Skeleton, [2, 2]);
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamB,
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
                const unit = UnitFactory.createUnit(Units.Skeleton, [2, 3]);
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamB,
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
                const unit = UnitFactory.createUnit(Units.Skeleton, [1, 2]);
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamB,
                );

                expect(targets).toHaveLength(0);
            });

            test('first line is dead', () => {
                const unit = UnitFactory.createUnit(Units.Skeleton, [2, 1]);
                teamB.getUnits()[0].currentHp = 0;
                teamB.getUnits()[1].currentHp = 0;
                teamB.getUnits()[2].currentHp = 0;
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamB,
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

            test("unit's position is [2,1] and [3,1] and [3,2] are dead", () => {
                const unit = UnitFactory.createUnit(Units.Skeleton, [2, 1]);
                teamB.getUnits()[0].currentHp = 0;
                teamB.getUnits()[1].currentHp = 0;
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamB,
                );

                expect(targets).toHaveLength(1);
                expect(targets).toContainEqual(
                    expect.objectContaining({ position: [3, 3] }),
                );
            });

            test("unit's position is [2,3] and [3,3] and [3,2] are dead", () => {
                const unit = UnitFactory.createUnit(Units.Skeleton, [2, 1]);
                teamB.getUnits()[2].currentHp = 0;
                teamB.getUnits()[1].currentHp = 0;
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamB,
                );

                expect(targets).toHaveLength(1);
                expect(targets).toContainEqual(
                    expect.objectContaining({ position: [3, 1] }),
                );
            });
        });

        describe('unit is in team B', () => {
            test("unit's position is [3,1]", () => {
                const unit = UnitFactory.createUnit(Units.Skeleton, [3, 1]);
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamA,
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
                const unit = UnitFactory.createUnit(Units.Skeleton, [3, 2]);
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamA,
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
                const unit = UnitFactory.createUnit(Units.Skeleton, [3, 3]);
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamA,
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
                const unit = UnitFactory.createUnit(Units.Skeleton, [4, 2]);
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamA,
                );

                expect(targets).toHaveLength(0);
            });

            test('first line is dead', () => {
                const unit = UnitFactory.createUnit(Units.Skeleton, [3, 1]);
                teamA.getUnits()[3].currentHp = 0;
                teamA.getUnits()[4].currentHp = 0;
                teamA.getUnits()[5].currentHp = 0;
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamA,
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
                const unit = UnitFactory.createUnit(Units.Skeleton, [3, 1]);
                teamA.getUnits()[3].currentHp = 0;
                teamA.getUnits()[4].currentHp = 0;
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamA,
                );

                expect(targets).toHaveLength(1);
                expect(targets).toContainEqual(
                    expect.objectContaining({ position: [2, 3] }),
                );
            });

            test("unit's position is [3,3] and [2,3] and [2,2] are dead", () => {
                const unit = UnitFactory.createUnit(Units.Skeleton, [3, 1]);
                teamA.getUnits()[5].currentHp = 0;
                teamA.getUnits()[4].currentHp = 0;
                const targets = PossibleTargets.definePossibleMeleeTargets(
                    unit,
                    teamA,
                );

                expect(targets).toHaveLength(1);
                expect(targets).toContainEqual(
                    expect.objectContaining({ position: [2, 1] }),
                );
            });
        });
    });

    test('definePossibleRangeTargets', () => {
        const targets = PossibleTargets.definePossibleRangeTargets(teamA);

        expect(targets).toHaveLength(6);
    });

    test('definePossibleHealTargets', () => {
        const unit = UnitFactory.createUnit(Units.Monk, [3, 1]);
        teamA.getUnits()[0] = unit;
        const targets = PossibleTargets.definePossibleHealTargets(unit, teamA);

        expect(targets).toHaveLength(5);
    });
});
