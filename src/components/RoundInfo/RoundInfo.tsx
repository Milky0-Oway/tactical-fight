import React from 'react';
import { container } from './RoundInfo.css';
import { useGameContext } from '../Game/useGameContext';
import { TeamInfo } from '../TeamInfo/TeamInfo';

export const RoundInfo: React.FC = () => {
    const { turn, teamA, teamB } = useGameContext();

    return (
        <div className={container}>
            <h2>Round Info</h2>
            <p>Current turn: team {turn}</p>
            <TeamInfo team={teamA} />
            <TeamInfo team={teamB} />
        </div>
    );
};
