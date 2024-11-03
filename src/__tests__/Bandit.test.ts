import { Units } from '../units/Unit';
import { UnitFactory } from '../units/UnitFactory';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Bandit Attributes', () => {
    test('Bandit has correct HP', () => {
        const bandit = UnitFactory.createUnit(Units.Bandit, [0, 0]);
        expect(bandit.maxHp).toBe(75);
    });

    test('Bandit has correct damage', () => {
        const bandit = UnitFactory.createUnit(Units.Bandit, [0, 0]);
        expect(bandit.damage).toBe(30);
    });

    test('Bandit has correct initiative', () => {
        const bandit = UnitFactory.createUnit(Units.Bandit, [0, 0]);
        expect(bandit.initiative).toBe(60);
    });
});
