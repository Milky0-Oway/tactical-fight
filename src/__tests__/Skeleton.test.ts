import { Units } from '../units/Unit';
import { UnitFactory } from '../units/UnitFactory';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Skeleton Attributes', () => {
    test('Skeleton has correct HP', () => {
        const skeleton = UnitFactory.createUnit(Units.Skeleton, [0, 0]);
        expect(skeleton.maxHp).toBe(100);
    });

    test('Skeleton has correct damage', () => {
        const skeleton = UnitFactory.createUnit(Units.Skeleton, [0, 0]);
        expect(skeleton.damage).toBe(25);
    });

    test('Skeleton has correct initiative', () => {
        const skeleton = UnitFactory.createUnit(Units.Skeleton, [0, 0]);
        expect(skeleton.initiative).toBe(50);
    });
});
