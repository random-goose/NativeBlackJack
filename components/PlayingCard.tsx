import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Card } from '../types/card';

interface PlayingCardProps {
  card: Card;
  faceDown?: boolean;
  index?: number;
}

export const PlayingCard: React.FC<PlayingCardProps> = ({ card, faceDown = false, index = 0 }) => {
  const isRed = card.suit === '♥' || card.suit === '♦';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const translateYAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 100,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [card.id, index]);

  if (faceDown) {
    return (
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          },
        ]}
      >
        <View style={styles.cardBack}>
          <View style={styles.cardBackPattern} />
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
        },
      ]}
    >
      <View style={styles.cardFront}>
        <View style={styles.topLeft}>
          <Text style={[styles.rank, isRed && styles.redText]}>{card.rank}</Text>
          <Text style={[styles.suit, isRed && styles.redText]}>{card.suit}</Text>
        </View>
        <View style={styles.center}>
          <Text style={[styles.centerSuit, isRed && styles.redText]}>{card.suit}</Text>
        </View>
        <View style={styles.bottomRight}>
          <Text style={[styles.rank, isRed && styles.redText]}>{card.rank}</Text>
          <Text style={[styles.suit, isRed && styles.redText]}>{card.suit}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 100,
    margin: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardFront: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#333',
    padding: 6,
    position: 'relative',
  },
  cardBack: {
    flex: 1,
    backgroundColor: '#1e40af',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#333',
    padding: 4,
  },
  cardBackPattern: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#60a5fa',
  },
  topLeft: {
    position: 'absolute',
    top: 4,
    left: 6,
    alignItems: 'center',
  },
  bottomRight: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    alignItems: 'center',
    transform: [{ rotate: '180deg' }],
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  suit: {
    fontSize: 14,
    color: '#000',
  },
  centerSuit: {
    fontSize: 36,
    color: '#000',
  },
  redText: {
    color: '#dc2626',
  },
});
