import React from 'react';
import { useGameContext } from '../Game/useGameContext';
import { text } from './Winner.css';

export const Winner: React.FC = () => {
    const { winner } = useGameContext();

    return <p className={text}>{winner} is a winner!</p>;
};
