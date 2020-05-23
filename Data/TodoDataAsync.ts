import AsyncStorage from '@react-native-community/async-storage';
import Todo from '../Model/Todo';
import Helper from '../Helper';

const lastTodoKey_Key = 'lastTodoKey';
const todosKey_Key = 'todosKey';

export default class TodoDatabaseAsync {
    private static createTodoKey(todoId: number): string {
        return 'Todo' + todoId;
    }

    private static async getLastKey(): Promise<number> {
        let resultJson = await AsyncStorage.getItem(lastTodoKey_Key);
        if (resultJson == null || resultJson == "NaN") {
            return 0;
        } else {
            return Number.parseInt(resultJson as string);
        }

    }

    private static async getTodosKey(): Promise<Array<string>> {
        let todosKeyJson = await AsyncStorage.getItem(todosKey_Key);
        if (todosKeyJson == null) {
            return new Array<string>();
        } else {
            return JSON.parse(todosKeyJson);
        }
    }

    static async saveTodoAsync(todo: Todo) {
        let lastKey = await TodoDatabaseAsync.getLastKey();
        let todosKey = await TodoDatabaseAsync.getTodosKey();
        todo.id = lastKey + 1;

        const todoJson = JSON.stringify(todo);
        const key = this.createTodoKey(todo.id);
        let multiSet1 = [key, todoJson];
        let multiSet2 = [lastTodoKey_Key, (lastKey + 1).toString()];
        todosKey.push(key);
        let multiSet3 = [todosKey_Key, JSON.stringify(todosKey)];

        await AsyncStorage.multiSet([
            multiSet1, multiSet2, multiSet3
        ]);
        //await Helper.updateWeek();
    }

    static async getTodoAsync(id: number): Promise<Todo> {
        const key = this.createTodoKey(id);
        const todoJson = await AsyncStorage.getItem(key);
        const todo: Todo = (todoJson != null) ? JSON.parse(todoJson) : null;
        return todo;
    }

    static async getTodosAsync(): Promise<Array<Todo>> {
        let todosKey = await TodoDatabaseAsync.getTodosKey();
        if (todosKey.length == 0) {
            return new Array<Todo>();
        } else {
            let todosJson = await AsyncStorage.multiGet(todosKey);
            let todos: Array<Todo> = todosJson.map(value => {
                let tempTodo = (JSON.parse(value[1] as string));
                let todo = Todo.createTodoFromJson(tempTodo);
                return todo
            })
            return todos;
        }
    }

    static async getTodosDateAsync(date: Date): Promise<Array<Todo>> {
        let todos = await this.getTodosAsync();
        let result = todos.filter(function (todo) {
            if (todo.isAllDayEvent && todo.dateEnd != undefined) {
                return (todo.dateStart.valueOf() <= date.valueOf()
                    && date.valueOf() <= todo.dateEnd.valueOf())
            } else {
                return (date.valueOf() <= todo.dateStart.valueOf()
                    && todo.dateStart.valueOf() <= (date.valueOf() + 86400 * 1000))
            }
        });
        if (!result) {
            return new Array<Todo>();
        } else return result
    }


    static async updateTodoAsync(todo: Todo) {
        const key = this.createTodoKey(todo.id);
        await AsyncStorage.removeItem(key);
        const todoJson = JSON.stringify(todo);
        await AsyncStorage.setItem(key, todoJson);
    }

    static async deleteTodoAsync(id: number) {
        const key = this.createTodoKey(id);
        await AsyncStorage.removeItem(key);
    }
}