import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import Mypage from './components/Mypage';
import Start from './components/Start';
import Info from './components/Info';
import Cafeteria from './components/Cafeteria';
import Category from './components/Category';
import Restaurant from './components/Restaurant';
import Menu from './components/Menu';
import Result from './components/Result';
import Detail from './components/Detail';
import Random from './components/Random';




const Stack = createStackNavigator();

function App () {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Mypage" component={Mypage} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Cafeteria" component={Cafeteria} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Random" component={Random} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;