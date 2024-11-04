import { Units } from '../units/Unit';
import { UnitFactory } from '../units/UnitFactory';

global.crypto = {
    randomUUID: () => '1-1-1-1-1',
    subtle: {} as SubtleCrypto,
    getRandomValues: (array) => array,
};

describe('Unit Actions', () => {
    test('Unit can be damaged', () => {
        const unit = UnitFactory.createUnit(Units.Archimage, [0, 0]);
        unit.takeDamage(20);
        expect(unit.currentHp).toBe(70);
    });

    test('When unit is defending, he receives damage/2', () => {
        const unit = UnitFactory.createUnit(Units.Archimage, [0, 0]);
        unit.defend();
        unit.takeDamage(20);
        expect(unit.currentHp).toBe(80);
    });

    test("When unit receives damage more than it's maxHP, currentHP = 0", () => {
        const unit = UnitFactory.createUnit(Units.Archimage, [0, 0]);
        unit.takeDamage(100);
        expect(unit.currentHp).toBe(0);
    });

    test('Unit can be healed', () => {
        const unit = UnitFactory.createUnit(Units.Archimage, [0, 0]);
        unit.takeDamage(20);
        unit.heal(10);
        expect(unit.currentHp).toBe(80);
    });

    test("When unit receives heal more than it's maxHP, currentHP = maxHP", () => {
        const unit = UnitFactory.createUnit(Units.Archimage, [0, 0]);
        unit.heal(10);
        expect(unit.currentHp).toBe(90);
    });
});
