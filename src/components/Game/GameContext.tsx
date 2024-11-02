import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Team, teams } from '../../units/Team';
import { Unit, UnitType } from '../../units/Unit';
import { AttackTurn } from '../../services/AttackTurn';
import { UnitsForTurn } from '../../services/UnitsForTurn';
import IsGameOver from '../../services/IsGameOver';

interface GameContextType {
    turn: string;
    teamA: Team;
    teamB: Team;
    currentUnit: Unit | null;
    selectedTarget: Unit | null;
    attackingTeam: Team;
    enemyTeam: Team;
    winner: string | null;
    hoverUnit: Unit| null;
    setHoverUnit: (unit: Unit | null) => void;
    handleNewTurn: () => void;
    handleSetTarget: (unit: Unit) => void;
    handleAction: () => void;
    handleCancel: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(
    undefined,
);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [turn, setTurn] = useState(teams.A);
    const [teamA] = useState(new Team(teams.A));
    const [teamB] = useState(new Team(teams.B));
    const [winner, setWinner] = useState<string | null>(null);
    const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
    const [hoverUnit, setHoverUnit] = useState<Unit | null>(null);
    const [selectedTarget, setSelectedTarget] = useState<Unit | null>(null);
    const attackingTeam = turn === teams.A ? teamA : teamB;
    const enemyTeam = turn === teams.A ? teamB : teamA;

    useEffect(() => {
        const nextUnit = AttackTurn.getCurrentAttackingUnit(
            UnitsForTurn.UnitsForTurn(attackingTeam),
            attackingTeam,
        );
        setCurrentUnit(nextUnit);
    }, [attackingTeam]);

    const handleNewTurn = () => {
        const nextUnit = AttackTurn.getCurrentAttackingUnit(
            UnitsForTurn.UnitsForTurn(attackingTeam),
            attackingTeam,
        );
        setCurrentUnit(nextUnit);
        setSelectedTarget(null);
    };

    const handleSetTarget = (unit: Unit) => {
        setSelectedTarget(unit);
    };

    const handleAction = () => {
        if (currentUnit) {
            if (
                currentUnit.type === UnitType.Melee ||
                currentUnit.type === UnitType.HealerSingle ||
                currentUnit.type === UnitType.Paralyzer ||
                currentUnit.type === UnitType.Range
            ) {
                if (selectedTarget)
                    AttackTurn.processAttackTurn(
                        attackingTeam,
                        enemyTeam,
                        selectedTarget,
                    );
            } else if (currentUnit.type === UnitType.HealerMass) {
                AttackTurn.processAttackTurn(
                    attackingTeam,
                    enemyTeam,
                    attackingTeam.getUnits(),
                );
            } else {
                AttackTurn.processAttackTurn(
                    attackingTeam,
                    enemyTeam,
                    enemyTeam.getUnits(),
                );
            }
        }

        if (IsGameOver.IsGameOver(teamA)) setWinner(teams.B);
        if (IsGameOver.IsGameOver(teamB)) setWinner(teams.A);

        handleNewTurn();
    };

    const handleCancel = () => {
        if (currentUnit)
            AttackTurn.skipTurn(
                currentUnit,
                UnitsForTurn.UnitsForTurn(attackingTeam),
                attackingTeam,
            );

        handleNewTurn();
    };

    const handleTurnChange = useCallback(() => {
        AttackTurn.switchTurn(teamA, teamB);
        setTurn((prevTurn) => (prevTurn === teams.A ? teams.B : teams.A));
    }, [teamA, teamB]);

    useEffect(() => {
        if (attackingTeam.isAttackTurnCompleted) {
            handleTurnChange();
        }
    }, [attackingTeam.isAttackTurnCompleted, handleTurnChange]);

    return (
        <GameContext.Provider
            value={{
                turn,
                teamA,
                teamB,
                currentUnit,
                selectedTarget,
                attackingTeam,
                enemyTeam,
                winner,
                hoverUnit,
                setHoverUnit,
                handleNewTurn,
                handleSetTarget,
                handleAction,
                handleCancel,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
