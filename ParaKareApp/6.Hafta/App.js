import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';  // MainScreen'i ayrı bir dosyaya taşıdık
import HomeScreen from './screens/HomeScreen';
import RulesScreen from './screens/RulesScreen';
import GameScreen from './screens/GameScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ title: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: false }} />
        <Stack.Screen name="Rules" component={RulesScreen} options={{ title: 'Oyun Kuralları' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Oyun' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
