import React, { useEffect, useState } from 'react';
import { Unit, UnitType } from '../../units/Unit';
import { PossibleTargets } from '../../services/PossibleTargets';
import * as styles from './UnitCard.css';
import classNames from 'classnames/bind';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useGameContext } from '../Game/useGameContext';

const cx = classNames.bind(styles);

export const UnitCard: React.FC<UnitCardProps> = ({ attackingUnit, unit }) => {
    const {
        attackingTeam,
        enemyTeam,
        hoverUnit,
        selectedTarget,
        handleSetTarget,
    } = useGameContext();

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
            handleSetTarget(unit);
        }
    };

    const cardClass = cx({
        card: true,
        paralyzed: unit.isParalyzed,
        defend: unit.isDefending,
        dead: !unit.isAlive(),
        possible: possibleTargets.includes(unit),
        current: isCurrent,
        selected: unit === selectedTarget,
        hover: unit === hoverUnit,
    });

    return (
        <div onClick={handleClick} className={cardClass}>
            <img className={styles.image} src={unit.image} alt="Unit Image" />
            <div className={styles.cardText}>
                <h2>{unit.name}</h2>
                <p className={styles.hpText}>
                    {unit.currentHp}/{unit.maxHp}
                </p>
                <div className={styles.hpOutline}>
                    <div
                        className={styles.hp}
                        style={assignInlineVars({
                            width: `${(unit.currentHp / unit.maxHp) * 100}%`,
                        })}
                    />
                </div>
            </div>
        </div>
    );
};

type UnitCardProps = {
    attackingUnit: Unit | null;
    unit: Unit;
};
