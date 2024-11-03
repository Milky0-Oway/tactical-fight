import React from 'react';
import { Unit } from '../../units/Unit';
import { useGameContext } from '../Game/useGameContext';

export const UnitInfo: React.FC<UnitInfoProps> = ({ unit }) => {
    const { currentUnit, setHoverUnit } = useGameContext();

    const handleMouseOver = () => {
        setHoverUnit(unit);
    };

    const handleMouseLeave = () => {
        setHoverUnit(null);
    };

    return (
        <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <p>
                {unit.name} ({unit.isAlive() ? 'Alive' : 'Dead'}
                {unit === currentUnit && ', Current'}
                {unit.isDefending && ', Defending'}
                {unit.isParalyzed && ', Paralyzed'})
            </p>
        </div>
    );
};

type UnitInfoProps = {
    unit: Unit;
};
