import { Units } from '../units/Unit';
import { UnitFactory } from '../units/UnitFactory';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Centaur Attributes', () => {
    test('Centaur has correct HP', () => {
        const centaur = UnitFactory.createUnit(Units.Centaur, [0, 0]);
        expect(centaur.maxHp).toBe(150);
    });

    test('Centaur has correct damage', () => {
        const centaur = UnitFactory.createUnit(Units.Centaur, [0, 0]);
        expect(centaur.damage).toBe(50);
    });

    test('Centaur has correct initiative', () => {
        const centaur = UnitFactory.createUnit(Units.Centaur, [0, 0]);
        expect(centaur.initiative).toBe(50);
    });
});
