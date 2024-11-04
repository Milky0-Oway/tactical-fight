import { AttackTurn } from '../services/AttackTurn';
import { Team } from '../units/Team';
import { Unit } from '../units/Unit';
import { Bandit } from '../units/Damagers/Bandit';
import { Centaur } from '../units/Damagers/Centaur';
import { Monk } from '../units/Healers/Monk';
import { UnitsForTurn } from '../services/UnitsForTurn';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('AttackTurn', () => {
    let teamA: Team;
    let teamB: Team;
    let targetUnit: Unit;

    beforeEach(() => {
        teamA = new Team('A');
        teamB = new Team('B');

        targetUnit = new Centaur([3, 1]);
        teamB.getUnits()[0] = targetUnit;
    });

    describe('processAttackTurn', () => {
        it('should heal target if current unit has healing power', () => {
            const healer = new Monk([1, 2]);
            healer.initiative = 100;
            healer.healingPower = 10;
            teamA.getUnits()[0].currentHp -= 20;
            teamA.getUnits()[1] = healer;

            AttackTurn.processAttackTurn(teamA, teamB, teamA.getUnits()[0]);

            expect(teamA.getUnits()[0].currentHp).toBeGreaterThan(
                teamA.getUnits()[0].maxHp - 20,
            );
        });

        it('should deal damage to the target if unit has damage power', () => {
            const attacker = new Bandit([1, 2]);
            attacker.damage = 25;
            teamA.getUnits()[1] = attacker;

            AttackTurn.processAttackTurn(teamA, teamB, targetUnit);

            expect(targetUnit.currentHp).toBeLessThan(targetUnit.maxHp);
        });
    });

    describe('skipTurn', () => {
        it('should mark unit turn as completed and continue to next unit', () => {
            const unit = UnitsForTurn.UnitsForTurn(teamA, teamB)[0];
            const nextUnit = UnitsForTurn.UnitsForTurn(teamA, teamB)[1];

            AttackTurn.skipTurn(
                unit,
                UnitsForTurn.UnitsForTurn(teamA, teamB),
                teamA,
                teamB,
            );

            expect(unit.hasCompletedTheTurn).toBe(true);
            expect(nextUnit.hasCompletedTheTurn).toBe(false);
        });
    });

    describe('getCurrentAttackingUnit', () => {
        it('should return the current attacking unit with uncompleted turn', () => {
            const unit1 = UnitsForTurn.UnitsForTurn(teamA, teamB)[0];
            const unit2 = UnitsForTurn.UnitsForTurn(teamA, teamB)[1];
            unit1.hasCompletedTheTurn = true;

            const currentUnit = AttackTurn.getCurrentAttackingUnit(
                UnitsForTurn.UnitsForTurn(teamA, teamB),
            );

            expect(currentUnit).toBe(unit2);
        });
    });
});
