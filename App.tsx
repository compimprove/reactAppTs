import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import WeekCalendar from './Components/WeekCalendar';
import AddTodo from './Components/AddTodo';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header, Left, Body, Right, Button, Text, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MonthCalendar from './Components/MonthCalendar';
import ToDayCalendar from './Components/TodayCalendar';
import AsyncStorage from '@react-native-community/async-storage';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DateTimeFormat = new Intl.DateTimeFormat('en-US', { month: 'long' });

export default class App extends React.Component {

  componentDidMount() {
    //AsyncStorage.clear()
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WeekCalendar">
          <Stack.Screen
            name="WeekCalendar"
            component={WeekCalendar}
            options={{
              header: ({ navigation }) =>
                <AppHeader navigation={navigation} />,
            }} />
          <Stack.Screen
            name="ToDayCalendar"
            component={ToDayCalendar}
            options={{
              header: ({ navigation }) =>
                <TodayHeader navigation={navigation} />,
            }} />
          <Stack.Screen
            name="MonthCalendar"
            component={MonthCalendar}
            options={{
              header: ({ navigation }) =>
                <AppHeader navigation={navigation} />
            }} />
          <Stack.Screen
            name="AddTodo"
            component={AddTodo}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function AppHeader(props: { navigation: any }) {
  return (
    <Header>
      <Left>
        <Button transparent>
          <Icon name="home" style={{ color: 'white', fontSize: 20 }} />
        </Button>
      </Left>
      <Body>
        <Title>{DateTimeFormat.format(new Date())}</Title>
      </Body>
      <Right>
        <Button onPress={() => props.navigation.push('AddTodo')}>
          <Text>Add</Text>
        </Button>
      </Right>
    </Header>
  )
}

function TodayHeader(props: { navigation: any }) {
  return (
    <Header hasTabs>
      <Left>
        <Button transparent>
          <Icon name="home" style={{ color: 'white', fontSize: 20 }} />
        </Button>
      </Left>
      <Body>
        <Title>{new Date().toDateString()}</Title>
      </Body>
      <Right>
        <Button onPress={() => props.navigation.push('AddTodo')}>
          <Text>Add</Text>
        </Button>
      </Right>
    </Header>
  )
}

