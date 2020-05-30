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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TodoData from '../Data/TodoData';


class ToDayCalendar extends React.Component<{}, { weekTodos: Array<DateTodos> | null }>{
  weekDays: Array<Date>

  constructor(props: any) {
    super(props);
    this.weekDays = Helper.initializeWeekDays(new Date());
    this.state = {
      weekTodos: null
    }
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    let weekTodos = TodoData.getTodosByDays(this.weekDays);
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

  todosData: Array<Todo | undefined>;

  constructor(props: { key: number, heading: string, todos: Array<Todo> }) {
    super(props);
    this.todosData = this.initializeData();
  }

  private notBelongToThisHour(hour: number, todo: Todo): boolean {
    return (todo.timeStart.getHours() >= hour + 1) ||
      (todo.timeEnd.getHours() <= hour)
  }

  initializeData(): Array<Todo | undefined> {
    let todos = this.props.todos.filter(todo => !todo.isAllDayEvent);
    let data = new Array<Todo | undefined>();

    for (let hour = 0; hour < 24; hour++) {
      for (let todo of todos) {
        if (this.notBelongToThisHour(hour, todo)) {
          data[hour] = undefined;
        } else {
          data[hour] = todo;
        }
      }
    }
    data[24] = undefined;
    return data;
  }

  render() {


    return (
      <Tab key={this.props.key} heading={this.props.heading}>
        <View key={this.props.key}>
          <AllDayEvents todos={this.props.todos.filter(todo => todo.isAllDayEvent)} />
          <FlatList
            keyExtractor={(item, hour) => hour.toString()}
            data={this.todosData}
            renderItem={({ item, index }) =>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Cell hour={index} />
                <HourView hour={index} todo={item} />
              </View>
            }
          />
        </View>
      </Tab>
    )
  }
}

function AllDayEvents(props: { todos: Array<Todo> }) {
  return (
    <View style={{
      height: 62,
      overflow: "hidden",
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      display: "flex",
      flexDirection: "row",
      marginTop: 3
    }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "gray", fontSize: 12 }}>All Day</Text>
      </View>
      <View style={{ flex: 5 }}>
        {props.todos.map(todo =>
          <View style={{
            backgroundColor: "#85aff2",
            padding: 1,
            paddingLeft: 5,
            marginTop: 1,
            borderRadius: 2,
            height: 20
          }}>
            <Text style={{ fontSize: 11 }}>{todo.name}</Text>
          </View>)
        }
      </View>
    </View>
  )
}

function HourView(props: { hour: number, todo: Todo | undefined }) {
  if (props.hour == 24) { return <></> }
  let { hour, todo } = props;
  let tokenColorEmpty = "#ffffff";
  let tokenColorHasTodo = "#bbd9ed";
  if (todo == undefined) {
    return (
      <View
        style={{
          backgroundColor: tokenColorEmpty,
          marginBottom: -9,
          marginTop: 9,
          height: CellHeight,
          borderBottomWidth: 1,
          borderTopWidth: props.hour == 0 ? 1 : 0,
          borderColor: "#e6e6ff",
          flex: 5,
        }}>
      </View>
    )
  } else {
    let isStartHourOfTodo = (hour == todo.timeStart?.getHours());
    let isEndHourOfTodo = (hour == todo.timeEnd?.getHours());
    return (
      <View
        style={{
          marginBottom: -9,
          marginTop: 9,
          height: CellHeight,
          borderBottomWidth: 1,
          borderColor: "#e6e6ff",
          flex: 5,
        }}>
        {isStartHourOfTodo && !isEndHourOfTodo &&
          <>
            <View
              style={{
                backgroundColor: tokenColorEmpty,
                height: todo.timeStart?.getMinutes(),
              }} >
            </View>
            <View
              style={{
                overflow: "visible",
                backgroundColor: tokenColorHasTodo,
                flex: 1
              }}>
              <TodoName todo={todo} />
            </View>
          </>
        }
        {isStartHourOfTodo && isEndHourOfTodo &&
          <>
            <View
              style={{
                backgroundColor: tokenColorEmpty,
                height: todo.timeStart?.getMinutes()
              }}>
            </View>
            <View
              style={{
                overflow: "hidden",
                backgroundColor: tokenColorHasTodo,
                height: todo.timeEnd.getMinutes() - todo.timeStart.getMinutes()
              }}>
              <TodoName todo={todo} />
            </View>
            <View
              style={{
                backgroundColor: tokenColorEmpty,
                flex: 1
              }}>
            </View>
          </>
        }
        {!isStartHourOfTodo && !isEndHourOfTodo &&
          <View
            style={{
              backgroundColor: tokenColorHasTodo,
              flex: 1
            }}>
          </View>
        }
        {!isStartHourOfTodo && isEndHourOfTodo &&
          <>
            <View
              style={{
                backgroundColor: tokenColorHasTodo,
                height: todo.timeEnd?.getMinutes()
              }}>
            </View>
            <View
              style={{
                backgroundColor: tokenColorEmpty,
                flex: 1
              }} >
            </View>
          </>
        }
      </View>
    )
  }
}

function TodoName(props: { todo: Todo }) {
  return (
    <>
      <Text
        style={{
          paddingTop: 4,
          paddingLeft: 6,
          fontSize: 13,
          color: '#3a4c5c'
        }}
      >
        {props.todo.name}
      </Text>
      <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 2, paddingLeft: 6, }}>
        <Icon
          name="map-marker"
          style={{
            paddingTop: 1,
            fontSize: 13,
            color: '#58738a'
          }}
        />
        <Text
          style={{
            paddingLeft: 2,
            fontSize: 13,
            color: '#58738a'
          }}>
          {props.todo.location}
        </Text>
      </View>
    </>
  )
}

function Cell(props: { hour: number }) {
  if (props.hour == 24) {
    return (
      <View style={{ height: CellHeight, flex: 1, marginBottom: 20 }}>
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
