import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GameControlsProps {
  onHit: () => void;
  onStand: () => void;
  onNewGame: () => void;
  isPlaying: boolean;
  isGameOver: boolean;
  message: string;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onHit,
  onStand,
  onNewGame,
  isPlaying,
  isGameOver,
  message,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
      </View>

      {isPlaying && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.hitButton} onPress={onHit}>
            <Text style={styles.buttonText}>Hit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.standButton} onPress={onStand}>
            <Text style={styles.buttonText}>Stand</Text>
          </TouchableOpacity>
        </View>
      )}

      {isGameOver && (
        <TouchableOpacity style={styles.newGameButton} onPress={onNewGame}>
          <Text style={styles.buttonText}>New Round</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  messageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fbbf24',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  hitButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1d4ed8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
  },
  standButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#b91c1c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
  },
  newGameButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#16a34a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
