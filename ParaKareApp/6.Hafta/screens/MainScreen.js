import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

function MainScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>ParaKare'ye Hoş Geldiniz!</Text>
        <Button title="Başla" onPress={() => navigation.navigate('Home')} />
        <Button title="Nasıl Oynanır" onPress={() => navigation.navigate('Rules')} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Görüntünün nasıl ölçekleneceğini ayarlar
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Şeffaf bir beyaz arka plan
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Görüntüyle metin arasında boşluk sağlar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Metin rengini daha belirgin yapar
    marginBottom: 20,
  },
});

export default MainScreen;

