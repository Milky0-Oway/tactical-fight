import React, { useEffect, useState } from 'react';
import { Team } from '../../units/Team';
import { Unit, UnitType } from '../../units/Unit';
import { PossibleTargets } from '../../services/PossibleTargets';

export const UnitCard: React.FC<UnitCardProps> = ({
    attackingUnit,
    attackingTeam,
    enemyTeam,
    unit,
    handleSetCurrentTarget,
}) => {
    const [isCurrent, setIsCurrent] = useState(false);

    useEffect(() => {
        if (attackingTeam.getUnits().includes(unit) && unit.isAlive()) {
            setIsCurrent(unit === attackingUnit);
        } else {
            setIsCurrent(false);
        }
    }, [attackingTeam, unit, attackingUnit]);

    let possibleTargets: Unit[] = [];

    if (attackingUnit) {
        if (attackingUnit.type === UnitType.Melee) {
            possibleTargets = PossibleTargets.definePossibleMeleeTargets(
                attackingUnit,
                enemyTeam,
                attackingTeam,
            );
        } else if (
            attackingUnit.type === UnitType.HealerMass ||
            attackingUnit.type === UnitType.HealerSingle
        ) {
            possibleTargets = PossibleTargets.definePossibleHealTargets(
                attackingUnit,
                attackingTeam,
            );
        } else {
            possibleTargets =
                PossibleTargets.definePossibleRangeTargets(enemyTeam);
        }
    }

    const handleClick = () => {
        if (possibleTargets.includes(unit)) {
            handleSetCurrentTarget(unit);
        }
    };

    return (
        <div onClick={handleClick}>
            {isCurrent && <p>Current</p>}
            {!unit.isAlive() && <p>Dead</p>}
            {unit.isParalyzed && <p>Paralyzed</p>}
            {unit.isDefending && <p>Defending</p>}
            {possibleTargets.includes(unit) && <p>Possible target</p>}
            <h2>{unit.name}</h2>
            <p>
                {unit.currentHp}/{unit.maxHp}
            </p>
        </div>
    );
};

type UnitCardProps = {
    attackingUnit: Unit | null;
    attackingTeam: Team;
    enemyTeam: Team;
    unit: Unit;
    handleSetCurrentTarget: (unit: Unit) => void;
};
