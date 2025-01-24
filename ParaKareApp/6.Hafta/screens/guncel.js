import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function HomeScreen() {
  // Varsayılan olarak her bölüm için 3 boş yıldız (başarısız)
  const [sections] = useState([
    { id: 1, stars: 0 },
    { id: 2, stars: 0 },
    { id: 3, stars: 0 },
    { id: 4, stars: 0 },
    { id: 5, stars: 0 },
    { id: 6, stars: 0 },
    { id: 7, stars: 0 },
    { id: 8, stars: 0 },
  ]);

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
    <View style={styles.container}>
      <Text style={styles.title}>Bölümler</Text>
      <View style={styles.sectionsContainer}>
        {sections.map((section) => (
          <View key={section.id} style={styles.sectionBox}>
            <View style={styles.starsContainer}>
              {renderStars(section.stars)}
            </View>
            <Text style={styles.sectionText}>Bölüm {section.id}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  sectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  sectionBox: {
    width: 120,
    height: 150,
    backgroundColor: '#3498db',
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
