import React from 'react';
import { container } from './RoundInfo.css';
import { useGameContext } from '../Game/useGameContext';
import { UnitsForTurn } from '../../services/UnitsForTurn';
import { UnitInfo } from '../UnitInfo/UnitInfo';

export const RoundInfo: React.FC = () => {
    const { teamA, teamB } = useGameContext();
    const units = UnitsForTurn.UnitsForTurn(teamA, teamB);

    return (
        <div className={container}>
            <h2>Round Info</h2>
            {units.map((unit) => {
                return <UnitInfo unit={unit} />;
            })}
        </div>
    );
};
