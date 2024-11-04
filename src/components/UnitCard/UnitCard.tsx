import React from 'react';
import { Unit } from '../../units/Unit';
import * as styles from './UnitCard.css';
import classNames from 'classnames/bind';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useGameContext } from '../Game/useGameContext';

const cx = classNames.bind(styles);

export const UnitCard: React.FC<UnitCardProps> = ({ attackingUnit, unit }) => {
    const {
        teamA,
        teamB,
        currentUnit,
        hoverUnit,
        selectedTarget,
        handleSetTarget,
    } = useGameContext();

    let possibleTargets: Unit[] = [];

    if (attackingUnit) {
        possibleTargets = attackingUnit.definePossibleTargets(
            {
                alingTeam: teamA.getUnits().includes(attackingUnit)
                    ? teamA
                    : teamB,
                enemyTeam: teamB.getUnits().includes(attackingUnit)
                    ? teamA
                    : teamB,
            },
            attackingUnit,
        );
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
        current: unit === currentUnit,
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
