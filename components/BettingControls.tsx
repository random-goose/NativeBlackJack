import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BettingControlsProps {
  playerChips: number;
  onPlaceBet: (amount: number) => void;
}

const BET_AMOUNTS = [10, 25, 50, 100, 250];

export const BettingControls: React.FC<BettingControlsProps> = ({ playerChips, onPlaceBet }) => {
  const [selectedBet, setSelectedBet] = useState<number>(25);

  const handleBet = () => {
    if (selectedBet <= playerChips) {
      onPlaceBet(selectedBet);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chipsText}>Chips: ${playerChips}</Text>
      <View style={styles.betAmounts}>
        {BET_AMOUNTS.map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.betChip,
              selectedBet === amount && styles.selectedChip,
              amount > playerChips && styles.disabledChip,
            ]}
            onPress={() => setSelectedBet(amount)}
            disabled={amount > playerChips}
          >
            <Text style={[
              styles.betChipText,
              selectedBet === amount && styles.selectedChipText,
              amount > playerChips && styles.disabledChipText,
            ]}>
              ${amount}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.dealButton, selectedBet > playerChips && styles.disabledButton]}
        onPress={handleBet}
        disabled={selectedBet > playerChips}
      >
        <Text style={styles.dealButtonText}>Deal Cards</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  chipsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  betAmounts: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  betChip: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedChip: {
    backgroundColor: '#22c55e',
    transform: [{ scale: 1.1 }],
  },
  disabledChip: {
    backgroundColor: '#6b7280',
    opacity: 0.5,
  },
  betChipText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedChipText: {
    color: '#fff',
  },
  disabledChipText: {
    color: '#d1d5db',
  },
  dealButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
    borderWidth: 2,
    borderColor: '#16a34a',
  },
  disabledButton: {
    backgroundColor: '#6b7280',
    borderColor: '#4b5563',
  },
  dealButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
