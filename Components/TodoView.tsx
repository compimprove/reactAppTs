import React from 'react';
import Todo from 'Model/Todo';
import { Text } from 'native-base';


export default function TodoView(props: { todos: Array<Todo> }) {
    console.log(props.todos);
    return (
        <>{props.todos.map(todo => {
            <Text>{todo.toString()}</Text>
        })}</>
    )
}