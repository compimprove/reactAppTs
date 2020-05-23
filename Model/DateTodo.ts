import Todo from "./Todo";

export default class DateTodos {
    date: Date
    todos: Array<Todo>

    constructor(date: Date, todos: Array<Todo>) {
        this.date = date;
        this.todos = todos;
    }
}