import React, { createContext, useState, useEffect } from 'react';
import { Team, teams } from '../../units/Team';
import { Unit, UnitType } from '../../units/Unit';
import { AttackTurn } from '../../services/AttackTurn';
import { UnitsForTurn } from '../../services/UnitsForTurn';
import IsGameOver from '../../services/IsGameOver';

interface GameContextType {
    teamA: Team;
    teamB: Team;
    currentUnit: Unit | null;
    selectedTarget: Unit | null;
    winner: string | null;
    hoverUnit: Unit | null;
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
    const [teamA] = useState(new Team(teams.A));
    const [teamB] = useState(new Team(teams.B));
    const [winner, setWinner] = useState<string | null>(null);
    const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
    const [hoverUnit, setHoverUnit] = useState<Unit | null>(null);
    const [selectedTarget, setSelectedTarget] = useState<Unit | null>(null);

    useEffect(() => {
        const nextUnit = AttackTurn.getCurrentAttackingUnit(
            UnitsForTurn.UnitsForTurn(teamA, teamB),
        );
        setCurrentUnit(nextUnit);
    }, [teamA, teamB]);

    const handleNewTurn = () => {
        const nextUnit = AttackTurn.getCurrentAttackingUnit(
            UnitsForTurn.UnitsForTurn(teamA, teamB),
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
                    AttackTurn.processAttackTurn(teamA, teamB, selectedTarget);
            } else if (currentUnit.type === UnitType.HealerMass) {
                AttackTurn.processAttackTurn(
                    teamA,
                    teamB,
                    teamA.getUnits().includes(currentUnit)
                        ? teamA.getUnits()
                        : teamB.getUnits(),
                );
            } else {
                AttackTurn.processAttackTurn(
                    teamA,
                    teamB,
                    teamB.getUnits().includes(currentUnit)
                        ? teamA.getUnits()
                        : teamB.getUnits(),
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
                UnitsForTurn.UnitsForTurn(teamA, teamB),
                teamA,
                teamB,
            );

        handleNewTurn();
    };

    return (
        <GameContext.Provider
            value={{
                teamA,
                teamB,
                currentUnit,
                selectedTarget,
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
