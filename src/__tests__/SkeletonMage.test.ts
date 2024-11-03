import { Units } from '../units/Unit';
import { UnitFactory } from '../units/UnitFactory';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Skeleton Mage Attributes', () => {
    test('Skeleton Mage has correct HP', () => {
        const unit = UnitFactory.createUnit(Units.SkeletonMage, [0, 0]);
        expect(unit.maxHp).toBe(50);
    });

    test('Skeleton Mage has correct damage', () => {
        const unit = UnitFactory.createUnit(Units.SkeletonMage, [0, 0]);
        expect(unit.damage).toBe(20);
    });

    test('Skeleton Mage has correct initiative', () => {
        const unit = UnitFactory.createUnit(Units.SkeletonMage, [0, 0]);
        expect(unit.initiative).toBe(40);
    });
});
