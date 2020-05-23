/* eslint-disable prettier/prettier */
import React from 'react';

import {
    Text,
    Content,
} from 'native-base';
import Todo from '../Model/Todo';

function DayCalendar(props: { date: Date, todos: Array<Todo> }) {
    return (
        <Content>
            <Text>
                This is Content Section
            </Text>
        </Content>
    );
}

export default DayCalendar;
