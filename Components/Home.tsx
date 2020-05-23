/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {
  Container,
  Tab,
  Tabs,
} from 'native-base';

import WeekCalendar from './WeekCalendar';
import MonthCalendar from './MonthCalendar';
import Notes from './Notes';

class Home extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Week">
            <WeekCalendar />
          </Tab>
          <Tab heading="Month">
            <MonthCalendar />
          </Tab>
          <Tab heading="Notes">
            <Notes />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Home;
