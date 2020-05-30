import Todo from "./Model/Todo";
import DateTodos from "./Model/DateTodo"
import TodoData from './Data/TodoData';

export default class Helper {
    public static refreshApp: Function
    public static updateWeekCalendar: Function
    public static updateTodayCalendar: Function
    public static updateMonthCalendar: Function

    public static updateAll() {
        this.updateMonthCalendar();
        this.updateTodayCalendar();
        this.updateWeekCalendar();
    }
    public static initializeWeekDays(currentDay: Date): Array<Date> {
        let weekDays = new Array<Date>();
        let today = new Date(
            currentDay.getFullYear(),
            currentDay.getMonth(),
            currentDay.getDate());
        for (let i = 0; i <= 6; i++) {
            let differetiate = i - currentDay.getDay();
            let weekDay = new Date(today.valueOf() + differetiate * 86400000)
            weekDays.push(weekDay);
        }
        return weekDays;
    }
}

