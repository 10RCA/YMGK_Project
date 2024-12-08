import { StyleSheet, Text, View, ImageBackground } from 'react-native';

function RulesScreen() {
  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Oyun Kuralları</Text>
        <View style={styles.rulesContainer}>
          <Text style={styles.ruleItem}>- Her oyuncu 1 TL ile para basmaya başlar.</Text>
          <Text style={styles.ruleItem}>- Başarılı olunan para basma işlemi sonrası 2 TL, 4 TL, 8 TL şeklinde katlanarak gider.</Text>
          <Text style={styles.ruleItem}>- Kırmızı ve Yeşil arasında giden Touchbarda Yeşil iken basmak gereklidir.</Text>
          <Text style={styles.ruleItem}>- Yeşil iken basılmadığı zaman oyuncu yanar.</Text>
        </View>
        <Text style={styles.description}>
          Bu oyun çocukların para kavramlarını öğrenmesi ve katlı sayıları kavramasını kolaylaştırmak için dizayn edilmiştir.
        </Text>
      </View>
    </ImageBackground>
  );
}

export default RulesScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Arka planın opaklığı için
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  rulesContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  ruleItem: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'left',
    marginHorizontal: 20,
    marginTop: 20,
  },
});

