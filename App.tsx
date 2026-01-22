import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, ImageBackground, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useBlackjack } from './hooks/useBlackjack';
import { Hand } from './components/Hand';
import { BettingControls } from './components/BettingControls';
import { GameControls } from './components/GameControls';

export default function App() {
  const {
    playerHand,
    dealerHand,
    gameStatus,
    message,
    playerChips,
    currentBet,
    hit,
    stand,
    placeBet,
    resetGame,
  } = useBlackjack();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f766e', '#14532d', '#1e3a8a']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>♠ BLACKJACK ♥</Text>
            <Text style={styles.subtitle}>Beat the Dealer to 21!</Text>
          </View>

          {gameStatus !== 'betting' && (
            <View style={styles.gameArea}>
              <Hand
                cards={dealerHand}
                label="Dealer"
                hideFirstCard={gameStatus === 'playing'}
              />

              <View style={styles.betInfo}>
                <Text style={styles.betText}>Current Bet: ${currentBet}</Text>
              </View>

              <Hand cards={playerHand} label="Player" />
            </View>
          )}

          <View style={styles.controls}>
            {gameStatus === 'betting' && (
              <BettingControls playerChips={playerChips} onPlaceBet={placeBet} />
            )}

            {(gameStatus === 'playing' || gameStatus === 'game-over') && (
              <GameControls
                onHit={hit}
                onStand={stand}
                onNewGame={resetGame}
                isPlaying={gameStatus === 'playing'}
                isGameOver={gameStatus === 'game-over'}
                message={message}
              />
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fbbf24',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  betInfo: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginVertical: 16,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  betText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  controls: {
    marginTop: 20,
  },
});
