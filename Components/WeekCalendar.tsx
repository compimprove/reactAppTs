/* eslint-disable prettier/prettier */
import React from 'react';
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
import { StyleSheet } from 'react-native';
import AddTodoButton from './Button/AddTodoButton';
import Footer from './Footer';
import Helper from '../Helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTodos from '../Model/DateTodo';
import TodoData from '../Data/TodoData';



class WeekCalendar
  extends React.Component<{}, { weekTodos: Array<DateTodos> | null }>{
  weekDays: Array<Date>

  constructor(props: any) {
    super(props);
    this.weekDays = Helper.initializeWeekDays(new Date());
    this.state = {
      weekTodos: null
    }
  }

  componentDidMount() {
    let weekTodos = TodoData.getTodosByDays(this.weekDays);
    console.log(weekTodos);
    this.setState({
      weekTodos: weekTodos
    })
  }

  render() {
    let weekTodos = this.state.weekTodos;
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
            todo={todo} />
        )
      }
    </Card>
  )
}

function TodoView(props: { todo: Todo }) {
  const style = StyleSheet.create({
    left: {
      width: 100,
    },
    container: {
      display: "flex",
      flexDirection: "row",
    },
    location: {
      fontSize: 13,
      color: "gray"
    }
  })

  function toHourMinuteString(date: Date | undefined): string {
    if (date)
      return `${date.getHours()}:${date.getMinutes()}`
    else return 'undefined';
  }

  return (
    <CardItem bordered button>
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

        <View>
          <Text style={{ fontSize: 14 }}>
            {props.todo.name}
          </Text>
          <Text style={style.location}>
            {props.todo.location}
          </Text>
        </View>
      </Body>
    </CardItem>
  )
}





export default WeekCalendar;
