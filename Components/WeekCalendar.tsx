/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Text,
  Content,
  Button,
  Card,
  CardItem,
  Body,
  View,
  Container
} from 'native-base';

import Todo from '../Model/Todo';
import { StyleSheet, Alert, ShadowPropTypesIOS } from 'react-native';
import AddTodoButton from './Button/AddTodoButton';
import Footer from './Footer';
import Helper from '../Helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTodos from '../Model/DateTodo';
import TodoData from '../Data/TodoData';
import { useNavigation } from '@react-navigation/native';
import { ImportantLevelColor, ImportantLevel } from '../Model/Enum';
import * as theme from '../native-base-theme/variables/commonColor.js';



class WeekCalendar
  extends React.Component {
  weekDays: Array<Date>

  constructor(props: any) {
    super(props);
    this.weekDays = Helper.initializeWeekDays(new Date());
  }

  // componentDidMount() {
  //   let weekTodos = TodoData.getTodosByDays(this.weekDays);
  //   console.log(weekTodos);
  //   this.setState({
  //     weekTodos: weekTodos
  //   })
  // }

  render() {
    let weekTodos = TodoData.getTodosByDays(this.weekDays);
    console.log('WeekCalendar is being rendered');
    if (weekTodos && weekTodos.length > 0) {
      return (
        <Container>
          <Content padder>
            {weekTodos.map(dateTodos =>
              <DayView
                key={dateTodos.date.toDateString()}
                todosForDay={dateTodos.todos}
                date={dateTodos.date} />)}
          </Content>
          <Footer />
        </Container>
      );
    }
    else {
      return (
        <Text>Loading...</Text>
      )
    }
  }
}

function DayView(props: { todosForDay: Array<Todo>, date: Date }) {
  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let tomorrow = new Date(today.valueOf() + 86400000);
  let isToday = (today.valueOf() == props.date.valueOf())
  let isTomorrow = (tomorrow.valueOf() == props.date.valueOf())
  let hasPassed = (today.valueOf() > props.date.valueOf())
  let isFuture = (!isToday && !isTomorrow && !hasPassed);
  let id = 0;
  return (
    <Card>
      <CardItem header button bordered>
        {isToday && <Text style={{ fontWeight: "bold", fontSize: 14 }}>Today - {props.date.toDateString()}</Text>}
        {isTomorrow && <Text style={{ fontWeight: "bold", fontSize: 14 }}>Tomorrow - {props.date.toDateString()}</Text>}
        {hasPassed && <Text style={{ color: 'gray', fontWeight: "bold", fontSize: 14 }}>{props.date.toDateString()}</Text>}
        {isFuture && <Text style={{ fontWeight: "bold", fontSize: 14 }}>{props.date.toDateString()}</Text>}
      </CardItem>
      {props.todosForDay.length == 0 && <CardItem bordered>
        <Body>
          <View>
            <Text style={{ color: "gray", fontSize: 14 }}>No event</Text>
          </View>
        </Body>
      </CardItem>
      }
      {props.todosForDay.length > 0 &&
        props.todosForDay.map(todo =>
          <TodoView
            key={id++}
            todo={todo}
            hasPassed={hasPassed} />
        )
      }
    </Card>
  )
}

function TodoView(props: { todo: Todo, hasPassed: boolean }) {
  const style = StyleSheet.create({
    left: {
      width: 80,
    },
    container: {
      display: "flex",
      flexDirection: "row",
    },
    location: {
      fontSize: 13,
      color: "gray"
    },
    description: {
      borderTopColor: "#cfd8ff",
      borderTopWidth: 0.5,
      paddingTop: 5,
      fontSize: 13,
      color: "#524b39",
      fontStyle: "italic"
    }
  })

  let [completed, setComplete] = useState(props.todo.completed);
  console.log(completed)
  function saveTodo() {
    props.todo.completed = completed;
    TodoData.update(props.todo.id, props.todo);
  }

  const navigation = useNavigation();
  function toHourMinuteString(date: Date | undefined): string {
    if (date)
      return `${date.getHours()}:${date.getMinutes()}`
    else return 'undefined';
  }

  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <CardItem
        style={{ flex: 1 }}
        bordered
        button
        onPress={() => navigation.navigate('TodoDetail', { todo: props.todo })}
      >
        <Body style={style.container}>
          {!props.todo.isAllDayEvent && <View style={style.left}>
            <Text style={{ fontSize: 14 }}>
              {toHourMinuteString(props.todo.timeStart)}
            </Text>
            <Text style={{ fontSize: 14 }}>
              {toHourMinuteString(props.todo.timeEnd)}
            </Text>
          </View>
          }
          {props.todo.isAllDayEvent && <View style={style.left}>
            <Text style={{ color: 'green', fontSize: 14 }}>
              All Day
          </Text>
          </View>
          }

          <View style={{ flex: 1 }}>
            <View style={{ display: "flex", flexDirection: "row" }} >
              <Icon name="checkbox-blank-circle"
                style={{
                  color: props.hasPassed ?
                    "gray" : ImportantLevelColor[props.todo.importantLevel],
                  marginRight: 7
                }} />
              <Text style={{ fontSize: 14 }}>
                {props.todo.name}
              </Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={style.location}>
                {props.todo.location}
              </Text>
            </View>
            {!props.todo.isAllDayEvent &&
              <View style={{ marginLeft: 20 }}>
                <View style={{ height: 5 }}></View>
                <Text style={style.description} >
                  {props.todo.description}
                </Text>
              </View>
            }
          </View>
        </Body>
      </CardItem>
      <View style={{ marginTop: 13, marginRight: 2 }}>
        <CheckCompletedButton
          title="Done"
          item={completed}
          setItem={setComplete}
          saveTodo={saveTodo} />
      </View>
    </View>

  )
}

function CheckCompletedButton(props:
  { item: boolean, setItem: Function, saveTodo: Function, title: string }
) {
  let primaryColor = theme.default.brandPrimary;

  return (
    <View
      style={{
        padding: 10,
        borderColor: primaryColor,
        borderWidth: 0.5,
        borderRadius: 3,
      }}
      onTouchEnd={() => {
        console.log("props.item" + props.item)
        props.setItem(!props.item)
        props.saveTodo()
      }}
    >
      {!props.item && <Icon name="progress-clock" />}
      {props.item && <Icon name="check" style={{ fontWeight: 'bold', color: '#4cad36' }} />}
    </View>
  )
}




export default WeekCalendar;
