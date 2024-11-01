import React from 'react';
import { Team, teams } from '../../units/Team';
import { Unit } from '../../units/Unit';
import { UnitCard } from '../UnitCard/UnitCard';
import * as styles from './TeamTable.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const TeamTable: React.FC<TeamTableProps> = ({
    currentTeamTurn,
    attackingUnit,
    attackingTeam,
    enemyTeam,
    team,
    handleNewTurnAction,
    handleSetCurrentTarget,
    handleAction,
    handleCancel,
    selectedUnit,
}) => {
    const handleDefend = () => {
        if (attackingUnit) {
            attackingUnit.defend();
            attackingUnit.completeTurn();
            handleNewTurnAction();
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
                            attackingUnit={attackingUnit}
                            attackingTeam={attackingTeam}
                            enemyTeam={enemyTeam}
                            unit={unit}
                            selectedUnit={selectedUnit}
                            handleSetCurrentTarget={handleSetCurrentTarget}
                        />
                    );
                })}
            </div>
            {currentTeamTurn === team.name && (
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
    currentTeamTurn: string;
    attackingUnit: Unit | null;
    attackingTeam: Team;
    enemyTeam: Team;
    team: Team;
    selectedUnit: Unit | null;
    handleNewTurnAction: () => void;
    handleSetCurrentTarget: (unit: Unit) => void;
    handleAction: () => void;
    handleCancel: () => void;
};
