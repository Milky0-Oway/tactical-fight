import { Team } from '../units/Team';

export default class IsGameOver {
    public static IsGameOver = (team: Team): boolean => {
        let isGameOver = true;

        team.getUnits().forEach((unit) => {
            if (unit.isAlive()) isGameOver = false;
        });

        return isGameOver;
    };
}
