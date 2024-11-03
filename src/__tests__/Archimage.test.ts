import { Units } from '../units/Unit';
import { UnitFactory } from '../units/UnitFactory';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Archimage Attributes', () => {
    test('Archimage has correct HP', () => {
        const archimage = UnitFactory.createUnit(Units.Archimage, [0, 0]);
        expect(archimage.maxHp).toBe(90);
    });

    test('Archimage has correct damage', () => {
        const archimage = UnitFactory.createUnit(Units.Archimage, [0, 0]);
        expect(archimage.damage).toBe(30);
    });

    test('Archimage has correct initiative', () => {
        const archimage = UnitFactory.createUnit(Units.Archimage, [0, 0]);
        expect(archimage.initiative).toBe(40);
    });
});
