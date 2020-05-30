/* eslint-disable prettier/prettier */
import React from 'react';
import * as theme from '../native-base-theme/variables/commonColor.js';
import {
  Text,
  Content,
  List,
  ListItem,
  View,
  Container,
} from 'native-base';
import Footer from './Footer';
import { FlatList, SafeAreaView } from 'react-native';
import DateTodos from '../Model/DateTodo';
import Helper from '../Helper';
import Todo from '../Model/Todo';
import TodoData from '../Data/TodoData';

const DateTimeFormat = new Intl.DateTimeFormat('en-US', { month: 'short' });

class MonthCalendar extends React.Component<{}, { dateTodos: Array<DateTodos> | null }> {
  monthDays: Array<Date>


  constructor(props: any) {
    super(props);
    this.monthDays = this.initializeMonthDays();
    this.state = {
      dateTodos: null,
    }
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    let daysInMonth = this.monthDays.length;
    let remainNumberOfCellRender = (7 - daysInMonth % 7);
    let lastMonthDay = this.monthDays[daysInMonth - 1];
    for (let i = 1; i <= remainNumberOfCellRender; i++) {
      this.monthDays.push(new Date(lastMonthDay.valueOf() + 86400 * 1000 * i));
    };
    this.updateData();
  }

  updateData() {
    let todos = TodoData.getTodosByDays(this.monthDays);
    this.setState({ dateTodos: todos });
  }

  private initializeMonthDays(): Array<Date> {
    let monthdays = new Array<Date>();
    let currentDate = new Date();
    let daysInThisMonth = this.getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    for (let i = 1; i <= daysInThisMonth; i++) {
      let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      monthdays.push(date);
    }
    return monthdays;
  }

  private getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  render() {
    return (
      <>
        <Container>
          <View style={{
            paddingTop: 10,
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
          {this.state.dateTodos &&
            <SafeAreaView>
              <FlatList
                numColumns={7}
                horizontal={false}
                data={this.state.dateTodos}
                keyExtractor={dateTodos => dateTodos.date.getDate().toString()}
                renderItem={({ item }) => <DateTodosView dateTodos={item} />}
              />
            </SafeAreaView>
          }
        </Container>
        <Footer />
      </>
    );
  }
}

function DateTodosView(props: { dateTodos: DateTodos }) {

  return (
    <View
      style={{ flex: 1, height: 108, borderTopWidth: 1, borderTopColor: 'gray', overflow: "hidden" }}
    >
      <Text style={{
        alignSelf: "center",
        color: (props.dateTodos.date.getDate() == 1) ? 'black' : 'gray',
        fontWeight: (props.dateTodos.date.getDate() == 1) ? "bold" : undefined,
        fontSize: 12,
      }}>
        {props.dateTodos.date.getDate() == 1 ?
          `1 ${DateTimeFormat.format(props.dateTodos.date)}` :
          props.dateTodos.date.getDate()
        }
      </Text>
      {props.dateTodos.todos.map(todo => <TodoView todo={todo} />)}
    </View>
  )
}

function TodoView(props: { todo: Todo }) {
  return (
    <View style={{
      marginTop: 4,
      paddingLeft: 5,
      backgroundColor: "#daeff7",
      borderRadius: 3,
      height: 18,
      overflow: "hidden",
    }}>
      <Text style={{
        fontSize: 12,
        fontWeight: "bold",
        color: props.todo.isAllDayEvent ? "#e6a69a" : "#3460c7"
      }}>
        {props.todo.name}
      </Text>
    </View>
  )
}

export default MonthCalendar;
