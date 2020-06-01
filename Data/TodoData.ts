import AsyncStorage from '@react-native-community/async-storage';
import Todo from '../Model/Todo';
import DateTodos from '../Model/DateTodo';

export default class TodoData {
    private static todoLastKey: number = 0;
    static todos: Map<number, Todo>;

    private static async saveAsync() {
        await AsyncStorage.multiSet([
            ['todos', JSON.stringify(Array.from(TodoData.todos.entries()))],
            ['todoLastKey', TodoData.todoLastKey.toString()],
        ]);
    }


    static async up() {
        let todos = await AsyncStorage.getItem('todos')
        if (todos == null) {
            TodoData.todos = new Map<number, Todo>();
        } else {
            let todosParse = JSON.parse(todos as string);
            TodoData.todos = new Map<number, Todo>();
            console.log(todosParse);
            for (let element of todosParse) {
                TodoData.todos.set(element[0], Todo.createTodoFromJson(element[1]));
            }
            console.log(TodoData.todos);
        }

        let todoLastKey = await AsyncStorage.getItem('todoLastKey')
        TodoData.todoLastKey = (todoLastKey == null) ? 0 : Number.parseInt(todoLastKey);
    }

    static save(todo: Todo) {
        todo.id = ++TodoData.todoLastKey;
        TodoData.todos.set(todo.id, todo);
        console.log(this.todos);
        this.saveAsync();
    }

    static get(id: number): Todo | undefined {
        return TodoData.todos.get(id);
    }

    private static getTodosByDate(date: Date): Array<Todo> {
        let result = new Array<Todo>();
        TodoData.todos.forEach(todo => {
            if (todo.isAllDayEvent && todo.dateEnd != undefined) {
                if (todo.dateStart.valueOf() <= date.valueOf()
                    && date.valueOf() <= todo.dateEnd.valueOf()) {
                    result.push(todo);
                }
            } else {
                if (date.valueOf() == todo.dateStart.valueOf())
                    result.push(todo);
            }
        });
        return result;
    }

    public static getTodosByDays(days: Array<Date>): Array<DateTodos> {
        let weekTodos = new Array<DateTodos>();
        for (let weekDay of days) {
            let todosForDay = TodoData.getTodosByDate(weekDay);
            weekTodos.push(new DateTodos(weekDay, todosForDay))
        }
        return weekTodos;
    }

    static update(id: number, todo: Todo) {
        console.log(id);
        console.log(TodoData.todos);
        todo.id = id;
        TodoData.todos.set(id, todo);
        console.log(TodoData.todos);
        this.saveAsync();
    }

    static delete(todo: Todo) {
        TodoData.todos.delete(todo.id);
        console.log(TodoData.todos);
        this.saveAsync();
    }

    static async destroy() {
        await this.saveAsync();
    }
}