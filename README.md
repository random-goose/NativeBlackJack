# Blackjack React Native Game

A fully functional Blackjack card game built with React Native and Expo, featuring authentic card shuffling and a polished UI.
Made as a personal project to learn the "art" of card counting.

## Features

- Full Blackjack gameplay with standard rules
- Fisher-Yates shuffle algorithm for random card dealing
- Beautiful animated card dealing
- Betting system with virtual chips
- Responsive UI with gradient backgrounds
- Soft/hard hand detection
- Dealer AI that follows standard casino rules

## How to Play

1. Start with $1,000 in chips
2. Select your bet amount using the chip buttons
3. Click "Deal Cards" to start the round
4. Choose to "Hit" (take another card) or "Stand" (keep your hand)
5. Try to get closer to 21 than the dealer without going over
6. Blackjack (21 with first two cards) pays 1.5x your bet

## Rules

- Dealer must hit on 16 or less, stand on 17 or more
- Aces count as 11 or 1 (automatically adjusted)
- Face cards (J, Q, K) count as 10
- Bust (over 21) loses automatically

## Running the App

### For Web
```bash
npm run web
```

### For Android
```bash
npm run android
```

### For iOS
```bash
npm run ios
```

## Game Logic

The game implements a standard 52-card deck with proper card shuffling using the Fisher-Yates algorithm. Each card is uniquely identified and properly dealt from the deck, ensuring authentic gameplay.

## Components

- **PlayingCard**: Animated card component with face-up/face-down states
- **Hand**: Displays a collection of cards with value calculation
- **BettingControls**: Chip selection and betting interface
- **GameControls**: Hit, Stand, and New Game buttons
- **useBlackjack**: Custom hook managing all game state and logic
