import React from 'react';
import { Team } from '../../units/Team';
import { UnitInfo } from '../UnitInfo/UnitInfo';
import { container, header } from './TeamInfo.css';
import { UnitsForTurn } from '../../services/UnitsForTurn';

export const TeamInfo: React.FC<TeamInfoProps> = ({ team }) => {
    return (
        <div className={container}>
            <h4 className={header}>Team {team.name}</h4>
            {UnitsForTurn.UnitsForTurn(team).map((unit) => (
                <UnitInfo unit={unit} />
            ))}
        </div>
    );
};

type TeamInfoProps = {
    team: Team;
};
