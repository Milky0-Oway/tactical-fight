import { Units } from '../units/Unit';
import { UnitFactory } from '../units/UnitFactory';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Monk Attributes', () => {
    test('Monk has correct HP', () => {
        const monk = UnitFactory.createUnit(Units.Monk, [0, 0]);
        expect(monk.maxHp).toBe(90);
    });

    test('Monk has correct healing power', () => {
        const monk = UnitFactory.createUnit(Units.Monk, [0, 0]);
        expect(monk.healingPower).toBe(40);
    });

    test('Monk has correct initiative', () => {
        const monk = UnitFactory.createUnit(Units.Monk, [0, 0]);
        expect(monk.initiative).toBe(20);
    });
});
