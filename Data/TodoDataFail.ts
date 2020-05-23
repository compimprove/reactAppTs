import AsyncStorage from '@react-native-community/async-storage';
import Todo from '../Model/Todo';

export default class TodoData {
    static todoLastKey: number = 0;
    static todos: Map<number, Todo>;
    static ready: boolean = false;
    static timeOutNumber = 200;


    static notReady(): boolean {
        return (this.ready == false);
    }

    static up() {
        let todosTablePrepared = false;
        let todoLastKeyPrepared = false;

        AsyncStorage.getItem('todos').then(todos => {
            let todosParse = JSON.parse(todos as string);
            if (todos != '{}' && typeof (todosParse) == 'object') {
                TodoData.todos = new Map<number, Todo>(todosParse);
            } else {
                TodoData.todos = new Map<number, Todo>();
            }
            console.log(TodoData.todos);
            todosTablePrepared = true;
            TodoData.ready = todosTablePrepared && todoLastKeyPrepared;
        });

        AsyncStorage.getItem('todoLastKey').then(todoLastKey => {
            TodoData.todoLastKey = (todoLastKey == null) ? 0 : Number.parseInt(todoLastKey);
            todoLastKeyPrepared = true;
            TodoData.ready = todosTablePrepared && todoLastKeyPrepared;
        });
    }

    static save(todo: Todo) {
        if (this.notReady()) {
            setTimeout(TodoData.save.bind(todo), this.timeOutNumber);
        }
        TodoData.todoLastKey++;
        todo.id = TodoData.todoLastKey;
        TodoData.todos.set(todo.id, todo);
        console.log(this.todos);
    }

    static get(id: number): Todo | undefined {
        if (this.notReady()) {
            setTimeout(TodoData.get.bind(id), this.timeOutNumber);
        }
        return TodoData.todos.get(id);
    }

    static getTodos(date: Date): Array<Todo> {
        if (this.notReady()) {
            setTimeout(TodoData.getTodos.bind(date), this.timeOutNumber);
        }
        let result = new Array<Todo>();
        TodoData.todos.forEach(todo => {
            if (todo.dateStart <= date && date <= todo.dateEnd) {
                result.push(todo);
            }
        })
        return result;
    }

    static delete(todo: Todo) {
        if (this.notReady()) {
            setTimeout(TodoData.delete.bind(todo), this.timeOutNumber);
        }
        TodoData.todos.delete(todo.id);
    }

    static destroy() {
        if (this.notReady()) {
            setTimeout(TodoData.destroy, this.timeOutNumber);
        }
        AsyncStorage.multiSet([
            ['todos', JSON.stringify(Array.from(TodoData.todos.entries()))],
            ['todoLastKey', TodoData.todoLastKey.toString()],
        ]);
    }
}