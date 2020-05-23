import Todo from "./Model/Todo";
import DateTodos from "./Model/DateTodo"
import TodoDataAsync from "./Data/TodoDataAsync"

export default class Helper {
    public static refreshApp: Function
    public static updateWeek: Function
    public static initializeWeekDays(currentDay: Date): Array<Date> {
        let weekDays = new Array<Date>();
        for (let i = 0; i <= 6; i++) {
            let differetiate = i - currentDay.getDay();
            let today = new Date(
                currentDay.getFullYear(),
                currentDay.getMonth(),
                currentDay.getDate());
            let weekDay = new Date(today.valueOf() + differetiate * 86400000)
            weekDays.push(weekDay);
        }
        return weekDays;
    }
    static async initializeTodos(days: Array<Date>): Promise<Array<DateTodos>> {
        let weekTodos = new Array<DateTodos>();
        for (let weekDay of days) {
            let todosForDay = await TodoDataAsync.getTodosDateAsync(weekDay);
            weekTodos.push(new DateTodos(weekDay, todosForDay))
        }
        return weekTodos;
    }
    
}

