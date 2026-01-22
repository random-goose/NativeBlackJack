import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../types/card';
import { PlayingCard } from './PlayingCard';
import { calculateHandValue } from '../utils/deck';

interface HandProps {
  cards: Card[];
  label: string;
  hideFirstCard?: boolean;
}

export const Hand: React.FC<HandProps> = ({ cards, label, hideFirstCard = false }) => {
  const { value, isSoft } = calculateHandValue(
    hideFirstCard && cards.length > 1 ? cards.slice(1) : cards
  );

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {cards.length > 0 && (
          <Text style={styles.value}>
            {hideFirstCard && cards.length > 1 ? '?' : value}
            {isSoft && !hideFirstCard && ' (soft)'}
          </Text>
        )}
      </View>
      <View style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <PlayingCard
            key={card.id}
            card={card}
            faceDown={hideFirstCard && index === 0}
            index={index}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fbbf24',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
