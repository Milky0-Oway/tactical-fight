import { Game } from './components/Game/Game';
import { GameProvider } from './components/Game/GameContext';

function App() {
    return (
        <GameProvider>
            <Game />
        </GameProvider>
    );
}

export default App;
