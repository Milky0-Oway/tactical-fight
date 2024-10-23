import { Units } from '../units/Unit';

export const getRandomUnit: () => Units = () => {
    const unitTypes = [
        Units.Archimage,
        Units.Bandit,
        Units.Bishop,
        Units.Centaur,
        Units.ElfArcher,
        Units.Monk,
        Units.Sirena,
        Units.Skeleton,
        Units.SkeletonMage,
    ];
    const randomIndex = Math.floor(Math.random() * 9);
    return unitTypes[randomIndex];
};
