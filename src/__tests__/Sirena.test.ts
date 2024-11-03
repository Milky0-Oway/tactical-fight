import { Units } from '../units/Unit';
import { UnitFactory } from '../units/UnitFactory';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Sirena Attributes', () => {
    test('Sirena has correct HP', () => {
        const sirena = UnitFactory.createUnit(Units.Sirena, [0, 0]);
        expect(sirena.maxHp).toBe(80);
    });

    test('Sirena has correct initiative', () => {
        const sirena = UnitFactory.createUnit(Units.Sirena, [0, 0]);
        expect(sirena.initiative).toBe(20);
    });
});
