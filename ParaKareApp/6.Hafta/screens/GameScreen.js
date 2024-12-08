import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button, Modal, ScrollView, Animated, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function GameScreen({ navigation }) {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [money, setMoney] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [levelComplete, setLevelComplete] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let interval;
    if (!gameOver && !levelComplete) {
      interval = setInterval(() => {
        setPosition((prevPosition) => {
          let newPosition = prevPosition + direction * 5;
          if (newPosition > 300 || newPosition < 0) {
            setDirection(direction * -1);
          }
          return newPosition;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [direction, gameOver, levelComplete]);

  useEffect(() => {
    if (gameOver || levelComplete) {
      saveScore(money);
    }
  }, [gameOver, levelComplete, money]);

  useEffect(() => {
    if (money >= 256) {
      setLevelComplete(true);
    }
  }, [money]);

  const saveScore = async (newScore) => {
    try {
      const existingScores = await AsyncStorage.getItem('scoreHistory');
      let scores = existingScores ? JSON.parse(existingScores) : [];
      scores.push(newScore);
      scores.sort((a, b) => b - a);
      await AsyncStorage.setItem('scoreHistory', JSON.stringify(scores));
      setScoreHistory(scores);
    } catch (e) {
      console.error('Error saving score', e);
    }
  };

  const loadScores = async () => {
    try {
      const existingScores = await AsyncStorage.getItem('scoreHistory');
      if (existingScores) {
        setScoreHistory(JSON.parse(existingScores));
      }
    } catch (e) {
      console.error('Error loading scores', e);
    }
  };

  const handleRetry = () => {
    setPosition(0);
    setDirection(1);
    setMoney(1);
    setGameOver(false);
    setLevelComplete(false);
  };

  const handleMainMenu = () => {
    navigation.navigate('Home', { score: money });
  };

  const handleShowScores = async () => {
    await loadScores();
    setShowScores(true);
  };

  const handlePress = () => {
    if (position >= 200) {
      setMoney((prevMoney) => prevMoney * 2);
    } else {
      setGameOver(true);
    }

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {levelComplete ? (
          <View style={styles.gameOverContainer}>
            <Text style={styles.congratulationsText}>Tebrikler, 1. bölümü geçtiniz!</Text>
            <Button title="Ana Menüye Dön" onPress={handleMainMenu} />
            <Button title="Geçmiş Skorlar" onPress={handleShowScores} />
          </View>
        ) : gameOver ? (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Oyun Bitti!</Text>
            <Text style={styles.scoreText}>Skorunuz: {money} TL</Text>
            <Button title="Tekrar Oyna" onPress={handleRetry} />
            <Button title="Ana Menüye Dön" onPress={handleMainMenu} />
            <Button title="Geçmiş Skorlar" onPress={handleShowScores} />
          </View>
        ) : (
          <TouchableOpacity style={styles.touchArea} onPress={handlePress}>
            <View style={styles.bar}>
              <View style={styles.redBar} />
              <View style={styles.greenBar} />
            </View>
            <View style={[styles.triangle, { left: position }]} />
          </TouchableOpacity>
        )}
        <View style={styles.moneyContainer}>
          <Text style={styles.moneyText}>Para: {money} TL</Text>
        </View>

        {!gameOver && !levelComplete && (
          <Animated.View style={[styles.coinContainer, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.coinText}>{money} TL</Text>
          </Animated.View>
        )}

        <Modal visible={showScores} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Geçmiş Skorlar</Text>
              <ScrollView>
                {scoreHistory.map((score, index) => (
                  <Text key={index} style={styles.modalScore}>
                    {index + 1}. Skor: {score} TL
                  </Text>
                ))}
              </ScrollView>
              <Button title="Kapat" onPress={() => setShowScores(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchArea: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#333',
    position: 'absolute',
    bottom: 60,
  },
  moneyContainer: {
    position: 'absolute',
    top: 50,
  },
  moneyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bar: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  redBar: {
    flex: 2,
    backgroundColor: 'red',
  },
  greenBar: {
    flex: 1,
    backgroundColor: 'green',
  },
  gameOverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  congratulationsText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
  },
  coinContainer: {
    position: 'absolute',
    top: '40%',
    backgroundColor: '#f0c419',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  coinText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalScore: {
    fontSize: 18,
    marginVertical: 5,
  },
});
