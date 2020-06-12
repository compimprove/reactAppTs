import { ImportantLevel } from './Enum';

export default class Todo {
    id: number = 0;
    name: string = '';
    location: string = '';
    description: string = '';
    importantLevel: ImportantLevel;
    reminder: boolean = false;
    timeStart: Date | undefined;
    timeEnd: Date | undefined;
    isAllDayEvent: boolean = false;
    dateStart: Date;
    dateEnd: Date | undefined;
    completed: boolean;

    constructor(data: {
        name: string,
        location: string,
        description: string,
        importantLevel: ImportantLevel,
        dateStart: Date,
        dateEnd: Date | undefined,
        timeStart: Date,
        timeEnd: Date,
        isAllDayEvent: boolean,
        reminder: boolean,
        completed: undefined | boolean,
    }) {
        this.name = data.name;
        this.location = data.location;
        this.reminder = data.reminder;
        this.description = data.description;
        this.importantLevel = data.importantLevel == undefined ?
            ImportantLevel.low : data.importantLevel;
        this.completed = (data.completed == undefined) ? false : data.completed;
        this.isAllDayEvent = data.isAllDayEvent as boolean;
        this.dateStart = new Date(
            data.dateStart.getFullYear(),
            data.dateStart.getMonth(),
            data.dateStart.getDate(),
        )
        if (data.isAllDayEvent && data.dateEnd)
            this.dateEnd = new Date(
                data.dateEnd.getFullYear(),
                data.dateEnd.getMonth(),
                data.dateEnd.getDate(),
            )
        else if (!data.isAllDayEvent) {
            this.timeStart = new Date(
                data.dateStart.getFullYear(),
                data.dateStart.getMonth(),
                data.dateStart.getDate(),
                data.timeStart.getHours(),
                data.timeStart.getMinutes()
            )
            this.timeEnd = new Date(
                data.dateStart.getFullYear(),
                data.dateStart.getMonth(),
                data.dateStart.getDate(),
                data.timeEnd.getHours(),
                data.timeEnd.getMinutes()
            )
        } else {
            console.log(data);
            throw `Todo constructor has wrong param`
        }
    }

    public static createTodoFromJson(data: {
        id: number,
        name: string,
        location: string,
        description: string,
        importantLevel: ImportantLevel,
        dateStart: string,
        dateEnd: string | undefined,
        timeStart: string,
        timeEnd: string,
        isAllDayEvent: boolean,
        reminder: boolean,
        completed: boolean | undefined
    }): Todo {

        let todo = new Todo({
            name: data.name,
            location: data.location,
            description: data.description,
            importantLevel: data.importantLevel,
            dateStart: new Date(data.dateStart),
            dateEnd: (data.dateEnd == undefined) ? undefined : new Date(data.dateEnd),
            timeStart: new Date(data.timeStart),
            timeEnd: new Date(data.timeEnd),
            isAllDayEvent: data.isAllDayEvent,
            reminder: data.reminder,
            completed: data.completed,
        })
        todo.id = data.id
        return todo;
    }

    toString(): string {
        let result = this.name
        result += "  " + this.location;
        return result;
    }
}


