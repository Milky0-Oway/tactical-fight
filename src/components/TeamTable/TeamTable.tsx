import React from 'react';
import { Team, teams } from '../../units/Team';
import { UnitCard } from '../UnitCard/UnitCard';
import * as styles from './TeamTable.css';
import classNames from 'classnames/bind';
import { useGameContext } from '../Game/useGameContext';

const cx = classNames.bind(styles);

export const TeamTable: React.FC<TeamTableProps> = ({ team }) => {
    const { turn, currentUnit, handleNewTurn, handleAction, handleCancel } =
        useGameContext();

    const handleDefend = () => {
        if (currentUnit) {
            currentUnit.defend();
            currentUnit.completeTurn();
            handleNewTurn();
        }
    };

    return (
        <div
            className={cx({
                container: true,
                teamA: team.name === teams.A,
                teamB: team.name === teams.B,
            })}
        >
            <div className={styles.table}>
                {team.getUnits().map((unit, index) => {
                    return (
                        <UnitCard
                            key={`${team.name}${unit.id}${index}`}
                            attackingUnit={currentUnit}
                            unit={unit}
                        />
                    );
                })}
            </div>
            {turn === team.name && (
                <div className={styles.buttons}>
                    <button onClick={handleDefend}>Defend</button>
                    <button onClick={handleAction}>Do action</button>
                    <button onClick={handleCancel}>Skip</button>
                </div>
            )}
        </div>
    );
};

type TeamTableProps = {
    team: Team;
};
