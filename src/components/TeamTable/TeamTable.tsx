import React from 'react';
import { Team } from '../../units/Team';
import { Unit } from '../../units/Unit';
import { UnitCard } from '../UnitCard/UnitCard';
import { table } from './TeamTable.css';

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
}) => {
    const handleDefend = () => {
        if (attackingUnit) {
            attackingUnit.defend();
            attackingUnit.completeTurn();
            handleNewTurnAction();
        }
    };

    return (
        <div>
            <div className={table}>
                {team.getUnits().map((unit, index) => {
                    return (
                        <UnitCard
                            key={`${team.name}${unit.id}${index}`}
                            attackingUnit={attackingUnit}
                            attackingTeam={attackingTeam}
                            enemyTeam={enemyTeam}
                            unit={unit}
                            handleSetCurrentTarget={handleSetCurrentTarget}
                        />
                    );
                })}
            </div>
            {currentTeamTurn === team.name && (
                <div>
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
    handleNewTurnAction: () => void;
    handleSetCurrentTarget: (unit: Unit) => void;
    handleAction: () => void;
    handleCancel: () => void;
};
