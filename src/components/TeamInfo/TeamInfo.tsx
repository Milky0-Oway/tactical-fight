import React from 'react';
import { Team } from '../../units/Team';
import { UnitInfo } from '../UnitInfo/UnitInfo';
import { container, header } from './TeamInfo.css';

export const TeamInfo: React.FC<TeamInfoProps> = ({ team }) => {
    return (
        <div className={container}>
            <h4 className={header}>Team {team.name}</h4>
            {team.getUnits().map((unit) => (
                <UnitInfo unit={unit} />
            ))}
        </div>
    );
};

type TeamInfoProps = {
    team: Team;
};
