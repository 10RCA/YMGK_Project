import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function HomeScreen({ navigation, route }) {
  const [sections, setSections] = useState([
    { id: 1, stars: 0 },
    { id: 2, stars: 0 },
    { id: 3, stars: 0 },
    { id: 4, stars: 0 },
    { id: 5, stars: 0 },
    { id: 6, stars: 0 },
    { id: 7, stars: 0 },
    { id: 8, stars: 0 },
  ]);

  useEffect(() => {
    if (route.params?.score) {
      const newScore = route.params.score;
      let newStars = 0;

      if (newScore > 128) {
        newStars = 3;
      } else if (newScore > 16) {
        newStars = 2;
      } else {
        newStars = 1;
      }

      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === 1 ? { ...section, stars: newStars } : section
        )
      );
    }
  }, [route.params?.score]);

  const renderStars = (stars) => {
    let starElements = [];
    for (let i = 0; i < 3; i++) {
      starElements.push(
        <Icon
          key={i}
          name={i < stars ? 'star' : 'star-o'}
          size={24}
          color="#ffd700"
          style={{ marginHorizontal: 2 }}
        />
      );
    }
    return starElements;
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bölümler</Text>
        <View style={styles.sectionsContainer}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={styles.sectionBox}
              onPress={() => {
                if (section.id === 1) {
                  navigation.navigate('Game');
                }
              }}
            >
              <View style={styles.starsContainer}>
                {renderStars(section.stars)}
              </View>
              <Text style={styles.sectionText}>Bölüm {section.id}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Görselin tüm ekranı kaplamasını sağlar
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff', // Başlık rengini arka plana göre daha belirgin yapar
  },
  sectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  sectionBox: {
    width: 120,
    height: 150,
    backgroundColor: 'rgba(52, 152, 219, 0.8)', // Şeffaf bir mavi arka plan
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderRadius: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sectionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
