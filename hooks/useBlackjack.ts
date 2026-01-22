import { useState, useCallback } from 'react';
import { Card, GameStatus, HandStatus } from '../types/card';
import { createDeck, shuffleDeck, calculateHandValue, isBlackjack } from '../utils/deck';

export const useBlackjack = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('betting');
  const [playerStatus, setPlayerStatus] = useState<HandStatus>('playing');
  const [message, setMessage] = useState<string>('Place your bet to start!');
  const [playerChips, setPlayerChips] = useState<number>(1000);
  const [currentBet, setCurrentBet] = useState<number>(0);

  const startNewGame = useCallback((betAmount: number) => {
    if (betAmount > playerChips) {
      setMessage('Insufficient chips!');
      return;
    }

    const newDeck = shuffleDeck(createDeck());
    const player = [newDeck[0], newDeck[2]];
    const dealer = [newDeck[1], newDeck[3]];
    const remainingDeck = newDeck.slice(4);

    setDeck(remainingDeck);
    setPlayerHand(player);
    setDealerHand(dealer);
    setCurrentBet(betAmount);
    setGameStatus('playing');
    setPlayerStatus('playing');

    // Check for blackjack
    if (isBlackjack(player)) {
      setPlayerStatus('blackjack');
      setGameStatus('game-over');
      if (isBlackjack(dealer)) {
        setMessage('Push! Both have Blackjack!');
      } else {
        setMessage('Blackjack! You win!');
        setPlayerChips(prev => prev + betAmount * 1.5);
      }
    } else if (isBlackjack(dealer)) {
      setGameStatus('game-over');
      setMessage('Dealer has Blackjack. You lose!');
      setPlayerChips(prev => prev - betAmount);
    } else {
      setMessage('Hit or Stand?');
    }
  }, [playerChips]);

  const hit = useCallback(() => {
    if (gameStatus !== 'playing' || playerStatus !== 'playing') return;

    const newCard = deck[0];
    const newPlayerHand = [...playerHand, newCard];
    const newDeck = deck.slice(1);

    setPlayerHand(newPlayerHand);
    setDeck(newDeck);

    const { value } = calculateHandValue(newPlayerHand);

    if (value > 21) {
      setPlayerStatus('bust');
      setGameStatus('game-over');
      setMessage('Bust! You lose!');
      setPlayerChips(prev => prev - currentBet);
    } else if (value === 21) {
      stand();
    }
  }, [deck, playerHand, gameStatus, playerStatus, currentBet]);

  const stand = useCallback(() => {
    if (gameStatus !== 'playing') return;

    setPlayerStatus('stand');
    setGameStatus('dealer-turn');
    setMessage('Dealer is playing...');

    // Dealer logic
    setTimeout(() => {
      let newDealerHand = [...dealerHand];
      let newDeck = [...deck];
      let dealerValue = calculateHandValue(newDealerHand).value;

      while (dealerValue < 17) {
        newDealerHand.push(newDeck[0]);
        newDeck = newDeck.slice(1);
        dealerValue = calculateHandValue(newDealerHand).value;
      }

      setDealerHand(newDealerHand);
      setDeck(newDeck);

      // Determine winner
      const playerValue = calculateHandValue(playerHand).value;

      if (dealerValue > 21) {
        setMessage('Dealer busts! You win!');
        setPlayerChips(prev => prev + currentBet);
      } else if (dealerValue > playerValue) {
        setMessage('Dealer wins!');
        setPlayerChips(prev => prev - currentBet);
      } else if (dealerValue < playerValue) {
        setMessage('You win!');
        setPlayerChips(prev => prev + currentBet);
      } else {
        setMessage('Push! It\'s a tie!');
      }

      setGameStatus('game-over');
    }, 1000);
  }, [dealerHand, deck, playerHand, gameStatus, currentBet]);

  const placeBet = useCallback((amount: number) => {
    startNewGame(amount);
  }, [startNewGame]);

  const resetGame = useCallback(() => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameStatus('betting');
    setPlayerStatus('playing');
    setCurrentBet(0);
    setMessage('Place your bet to start!');
  }, []);

  return {
    playerHand,
    dealerHand,
    gameStatus,
    playerStatus,
    message,
    playerChips,
    currentBet,
    hit,
    stand,
    placeBet,
    resetGame,
  };
};
