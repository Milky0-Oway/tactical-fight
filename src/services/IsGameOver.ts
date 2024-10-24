import { Team } from '../units/Team';

export default class IsGameOver {
    public static IsGameOver = (team: Team): boolean => {
        let isGameOver = true;

        team.getUnits().forEach((unit) =>
            unit.isAlive()
                ? (isGameOver = false)
                : (isGameOver = isGameOver && true),
        );

        return isGameOver;
    };
}
