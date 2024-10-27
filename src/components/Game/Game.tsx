import { useEffect, useState } from 'react';
import { Team, teams } from '../../units/Team';
import { AttackTurn } from '../../services/AttackTurn';
import { UnitsForTurn } from '../../services/UnitsForTurn';
import { Unit, UnitType } from '../../units/Unit';
import IsGameOver from '../../services/IsGameOver';
import { TeamTable } from '../TeamTable/TeamTable';

export const Game: React.FC = () => {
    const [turn, setTurn] = useState(teams.A);
    const [teamA] = useState(new Team(teams.A));
    const [teamB] = useState(new Team(teams.B));
    const [winner, setWinner] = useState<string | null>(null);
    const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
    const [selectedTarget, setSelectedTarget] = useState<Unit | null>(null);
    const attackingTeam = turn === teams.A ? teamA : teamB;
    const enemyTeam = turn === teams.A ? teamB : teamA;

    useEffect(() => {
        const nextUnit = AttackTurn.getCurrentAttackingUnit(
            UnitsForTurn.UnitsForTurn(attackingTeam),
        );
        if (nextUnit) nextUnit.isCurrent = true;
        setCurrentUnit(nextUnit);
    }, [attackingTeam]);

    const handleNewTurn = () => {
        AttackTurn.processAttackTurn(attackingTeam, enemyTeam, null);
        const nextUnit = AttackTurn.getCurrentAttackingUnit(
            UnitsForTurn.UnitsForTurn(attackingTeam),
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

        setSelectedTarget(null);
    };

    const handleCancel = () => {
        if (currentUnit)
            AttackTurn.skipTurn(
                currentUnit,
                UnitsForTurn.UnitsForTurn(attackingTeam),
            );

        handleNewTurn();
    };

    const handleTurnChange = () => {
        AttackTurn.switchTurn(teamA, teamB);
        setTurn((prevTurn) => (prevTurn === teams.A ? teams.B : teams.A));
    };

    useEffect(() => {
        if (attackingTeam.isAttackTurnCompleted) {
            handleTurnChange();
        }
    }, [attackingTeam.isAttackTurnCompleted]);

    if (winner) {
        return <p>{winner} is winner!</p>;
    }

    return (
        <div>
            {selectedTarget && <p>{selectedTarget.name} is chosen</p>}
            <TeamTable
                team={teamA}
                currentTeamTurn={turn}
                attackingUnit={currentUnit}
                attackingTeam={attackingTeam}
                enemyTeam={enemyTeam}
                handleNewTurnAction={handleNewTurn}
                handleAction={handleAction}
                handleSetCurrentTarget={handleSetTarget}
                handleCancel={handleCancel}
            />
            <TeamTable
                team={teamB}
                currentTeamTurn={turn}
                attackingUnit={currentUnit}
                attackingTeam={attackingTeam}
                enemyTeam={enemyTeam}
                handleNewTurnAction={handleNewTurn}
                handleAction={handleAction}
                handleSetCurrentTarget={handleSetTarget}
                handleCancel={handleCancel}
            />
        </div>
    );
};
