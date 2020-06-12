/* eslint-disable prettier/prettier */
import React from 'react';

import Footer from './Footer';
import {
  Text,
  Content,
} from 'native-base';
import { Container, View } from 'native-base';
import TodoData from '../Data/TodoData';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';


export default class Analysis extends React.Component {
  monthDays: Array<Date>

  constructor(props: any) {
    super(props);
    this.monthDays = this.initializeMonthDays()
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
    let todos = TodoData.getTodosByDays(this.monthDays);
    let rowOne = {
      labels: new Array<string>(),
      data: new Array<number>(),
    };
    for (let i = 0; i < 15; i++) {
      if (todos[i].todos.length != 0) {
        rowOne.labels.push((i + 1).toString());
        let done = 0;
        for (let todo of todos[i].todos) {
          if (todo.completed) done++
        }
        rowOne.data.push(100 * done / todos[i].todos.length)
      }
    }
    let rowTwo = {
      labels: new Array<string>(),
      data: new Array<number>(),
    };
    for (let i = 15; i < todos.length; i++) {
      if (todos[i].todos.length != 0) {
        rowTwo.labels.push((i + 1).toString());
        let done = 0;
        for (let todo of todos[i].todos) {
          if (todo.completed) done++
        }
        rowTwo.data.push(100 * done / todos[i].todos.length)
      }
    }

    return (
      <Container>
        <Content >
          <View>
            {rowOne.data.length != 0 && <LineChart
              data={{
                labels: rowOne.labels,
                datasets: [
                  {
                    data: rowOne.data
                  }
                ]
              }}
              width={Dimensions.get("window").width}
              height={220}
              yAxisSuffix="%"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#99ccff",
                backgroundGradientTo: "#99ccff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "1",
                  stroke: "#000000"
                }
              }}
              bezier
              style={{
                borderRadius: 8,
                marginVertical: 8,
              }}
            />}
            {rowTwo.data.length != 0 && < LineChart
              data={{
                labels: rowTwo.labels,
                datasets: [
                  {
                    data: rowTwo.data
                  }
                ]
              }}
              width={Dimensions.get("window").width}
              height={220}
              yAxisSuffix="%"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#99ccff",
                backgroundGradientTo: "#99ccff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "1",
                  stroke: "#000000"
                }
              }}
              bezier
              style={{
                borderRadius: 8,
                marginVertical: 8,
              }}
            />}
          </View>
        </Content>
        <Footer />
      </Container>
    );
  }
}
