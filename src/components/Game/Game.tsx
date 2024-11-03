import React from 'react';
import { TeamTable } from '../TeamTable/TeamTable';
import { useGameContext } from './useGameContext';
import { game } from './Game.css';
import { RoundInfo } from '../RoundInfo/RoundInfo';

export const Game: React.FC = () => {
    const { winner, teamA, teamB } = useGameContext();

    if (winner) {
        return <p>{winner} is winner!</p>;
    }

    return (
        <div className={game}>
            <div>
                <TeamTable team={teamA} />
                <TeamTable team={teamB} />
            </div>
            <RoundInfo />
        </div>
    );
};
