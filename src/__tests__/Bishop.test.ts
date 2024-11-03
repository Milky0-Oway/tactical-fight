import { Units } from '../units/Unit';
import { UnitFactory } from '../units/UnitFactory';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Bishop Attributes', () => {
    test('Bishop has correct HP', () => {
        const bishop = UnitFactory.createUnit(Units.Bishop, [0, 0]);
        expect(bishop.maxHp).toBe(130);
    });

    test('Bishop has correct healing power', () => {
        const bishop = UnitFactory.createUnit(Units.Bishop, [0, 0]);
        expect(bishop.healingPower).toBe(25);
    });

    test('Bishop has correct initiative', () => {
        const bishop = UnitFactory.createUnit(Units.Bishop, [0, 0]);
        expect(bishop.initiative).toBe(20);
    });
});
