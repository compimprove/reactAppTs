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
import { useNavigation } from '@react-navigation/native';
import { ImportantLevelColor } from '../Model/Enum';

const DateTimeFormat = new Intl.DateTimeFormat('en-US', { month: 'long' });

class MonthCalendar extends React.Component<{}, { dateTodos: Array<DateTodos> | null }> {
  monthDays: Array<Date>


  constructor(props: any) {
    super(props);
    this.monthDays = this.initializeMonthDays()
    this.state = {
      dateTodos: null,
    }
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    let firstMonthDay = this.monthDays[0];
    let temp = new Array<Date>();
    for (let i = 0; i < firstMonthDay.getDay(); i++) {
      temp.push(new Date(firstMonthDay.valueOf()
        - 86400 * 1000 * (firstMonthDay.getDay() - i)));
    }
    this.monthDays = temp.concat(this.monthDays);

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
      let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      monthdays.push(date);
    }

    return monthdays;
  }

  private getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  render() {
    let weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    let dateTodos = TodoData.getTodosByDays(this.monthDays);

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
            {weekDays.map((value, index) =>
              <Text
                key={index}
                style={{ color: "white", textAlign: "center", flex: 1 }}>
                {value}
              </Text>
            )}
          </View>
          {dateTodos &&
            <SafeAreaView>
              <FlatList
                numColumns={7}
                horizontal={false}
                data={dateTodos}
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
  let isFirstMonthDay = props.dateTodos.date.getDate() == 1
  let isToday = props.dateTodos.date.getDate() == new Date().getDate();

  return (
    <View
      key={props.dateTodos.date.getDate()}
      style={{ flex: 1, height: 108, borderTopWidth: 1, borderTopColor: 'gray', overflow: "hidden" }}
    >
      <Text style={{
        alignSelf: "center",
        color: isFirstMonthDay || isToday ? 'black' : 'gray',
        fontWeight: isFirstMonthDay || isToday ? "bold" : undefined,
        fontSize: 12,
      }}>
        {isFirstMonthDay ?
          `1 ${DateTimeFormat.format(props.dateTodos.date)}` :
          props.dateTodos.date.getDate()
        }
      </Text>
      {props.dateTodos.todos.map(todo => <TodoView todo={todo} />)}
    </View>
  )
}

function TodoView(props: { todo: Todo }) {
  const navigation = useNavigation();
  let touchEvent = () => {
    navigation.navigate('TodoDetail', { todo: props.todo })
  }
  return (
    <View
      onTouchEnd={touchEvent}
      style={{
        marginTop: 4,
        paddingLeft: 5,
        backgroundColor: "#fffaeb",
        borderRadius: 3,
        height: 18,
        overflow: "hidden",
      }}>
      <Text style={{
        fontSize: 12,
        fontWeight: "bold",
        color: ImportantLevelColor[props.todo.importantLevel],
      }}>
        {props.todo.name}
      </Text>
    </View>
  )
}

export default MonthCalendar;
