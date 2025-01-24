import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function SectionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bölümler</Text>
      <View style={styles.sectionsContainer}>
        <TouchableOpacity style={styles.sectionBox}>
          <Text style={styles.sectionText}>Bölüm 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionBox}>
          <Text style={styles.sectionText}>Bölüm 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionBox}>
          <Text style={styles.sectionText}>Bölüm 3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SectionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  sectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  sectionBox: {
    width: 100,
    height: 100,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderRadius: 10,
  },
  sectionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
