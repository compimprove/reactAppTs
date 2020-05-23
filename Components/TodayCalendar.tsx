/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Text,
  Content,
  Header,
  Tabs,
  Tab,
  Container,
} from 'native-base';
import Footer from './Footer';
import Helper from '../Helper';
import * as theme from '../native-base-theme/variables/commonColor.js';
import { ScrollView, FlatList, View } from 'react-native';
import DateTodos from '../Model/DateTodo';
import Todo from '../Model/Todo';


class ToDayCalendar extends React.Component<{}, { weekTodos: Array<DateTodos> | null }>{
  weekDays: Array<Date>

  constructor(props: any) {
    super(props);
    this.weekDays = Helper.initializeWeekDays(new Date());
    this.state = {
      weekTodos: null
    }
  }

  async componentDidMount() {
    let weekTodos = await Helper.initializeTodos(this.weekDays);
    this.setState({
      weekTodos: weekTodos
    })
  }

  render() {
    let i = -1;
    return (
      <>
        <Container>
          <View style={{
            height: 40,
            backgroundColor: theme.default.brandPrimary,
            display: "flex",
            flexDirection: 'row',
            justifyContent: "center"
          }}>
            <Text style={{ color: "white", textAlign: "center", flex: 1 }}>S</Text>
            <Text style={{ color: "white", textAlign: "center", flex: 1 }}>M</Text>
            <Text style={{ color: "white", textAlign: "center", flex: 1 }}>T</Text>
            <Text style={{ color: "white", textAlign: "center", flex: 1 }}>W</Text>
            <Text style={{ color: "white", textAlign: "center", flex: 1 }}>T</Text>
            <Text style={{ color: "white", textAlign: "center", flex: 1 }}>F</Text>
            <Text style={{ color: "white", textAlign: "center", flex: 1 }}>S</Text>
          </View>
          {this.state.weekTodos &&
            <Tabs>
              {this.weekDays.map(date =>
                <DayTab
                  key={++i}
                  heading={date.getDate().toString()}
                  todos={this.state.weekTodos[i].todos}
                />
              )}
            </Tabs>
          }
        </Container>
        <Footer />
      </>
    );
  }
}

enum HourQuarter {
  quarterOne,
  quarterTwo,
  quarterThree,
  quarterFour
}

class DayTab
  extends React.Component<{ key: number, heading: string, todos: Array<Todo> }, {}> {

  data: Array<{ hour: number, todo: Todo }>;

  constructor(props: { key: number, heading: string, todos: Array<Todo> }) {
    super(props);
    this.data = this.initializeData();

  }

  initializeData(): Array<{ hour: number, todo: Todo }> {
    let todos = new Array<Todo>();
    for (let todo of this.props.todos) {
      if (!todo.isAllDayEvent) todos.push(todo);
    }
    let data = new Array();
    for (let hour = 0; hour <= 24; hour++) {
      data.push({ hour: hour, })
    }
    return data;
  }

  render() {

    return (
      <Tab key={this.props.key} heading={this.props.heading}>
        <View key={this.props.key}>
          <FlatList
            keyExtractor={item => item.hour.toString()}
            data={this.data}
            renderItem={({ item }) =>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Cell hour={item.hour} />
                <TodosView hour={item.hour} todo={item.todo} />
              </View>
            }
          />
        </View>
      </Tab>
    )
  }
}

function TodosView(props: { hour: number, todo: Todo }) {

  if (props.hour == 24) { return <></> }
  else {
    return (
      <View
        style={{
          backgroundColor: "#fcfcff",
          marginBottom: -9,
          marginTop: 9,
          height: CellHeight,
          borderBottomWidth: 1,
          borderColor: "#e6e6ff",
          flex: 5,
          paddingLeft: 10,
          paddingTop: 5
        }}>
        <Text style={{ fontSize: 12, color: '#4c4c94' }}>
        </Text>
      </View>
    )
  }
}

function Cell(props: { hour: number }) {
  if (props.hour == 24) {
    return (
      <View>
        <Text style={{ color: "gray", fontSize: 12 }}>{`${props.hour}:00`}</Text>
      </View>
    )
  } else return (
    <View style={{ height: CellHeight, flex: 1 }}>
      <Text style={{ color: "gray", fontSize: 12 }}>{`${props.hour}:00`}</Text>
    </View>
  )
}

const CellHeight = 60;

export default ToDayCalendar;
