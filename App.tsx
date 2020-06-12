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
import Analysis from './Components/Analysis';
import TodoDetail from './Components/TodoDetail';
import AsyncStorage from '@react-native-community/async-storage';
import Helper from './Helper';
import Todo from 'Model/Todo';
import TodoData from './Data/TodoData';
import DateTodos from './Model/DateTodo';
const Stack = createStackNavigator();

const DateTimeFormat = new Intl.DateTimeFormat('en-US', { month: 'long' });

export default class App
  extends React.Component<{}, {
    load: boolean
  }> {
  weekDays: Array<Date>;

  constructor(props: any) {
    super(props);
    this.state = {
      load: false,
    }
    this.weekDays = Helper.initializeWeekDays(new Date());
    this.updateState = this.updateState.bind(this)
  }

  updateState() {
    this.setState({
      load: true,
    })
  }

  async componentDidMount() {
    //AsyncStorage.clear();
    await TodoData.up();
    this.setState({
      load: true
    })
  }



  async componentWillUnmount() {
    await TodoData.destroy();
  }

  render() {
    if (this.state.load)
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="WeekCalendar">
            <Stack.Screen
              name="WeekCalendar"
              options={{
                header: ({ navigation }) =>
                  <AppHeader navigation={navigation} />,
              }}>
              {props => <WeekCalendar
                {...props}
              />}
            </Stack.Screen>
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
              name="Analysis"
              component={Analysis}
              options={{
                header: ({ navigation }) =>
                  <AppHeader navigation={navigation} />
              }} />
            <Stack.Screen
              name="AddTodo">
              {props => <AddTodo {...props} updateState={this.updateState} />}
            </Stack.Screen>
            <Stack.Screen
              name="TodoDetail"
            >
              {props => <TodoDetail {...props} updateState={this.updateState} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    else {
      return <></>
    }
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

