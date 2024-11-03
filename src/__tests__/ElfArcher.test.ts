import { Units } from '../units/Unit';
import { UnitFactory } from '../units/UnitFactory';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Elf Archer Attributes', () => {
    test('Elf Archer has correct HP', () => {
        const unit = UnitFactory.createUnit(Units.ElfArcher, [0, 0]);
        expect(unit.maxHp).toBe(90);
    });

    test('Elf Archer has correct damage', () => {
        const unit = UnitFactory.createUnit(Units.ElfArcher, [0, 0]);
        expect(unit.damage).toBe(45);
    });

    test('Elf Archer has correct initiative', () => {
        const unit = UnitFactory.createUnit(Units.ElfArcher, [0, 0]);
        expect(unit.initiative).toBe(60);
    });
});
