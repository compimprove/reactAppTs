export default class Todo {
    id: number = 0;
    name: string = '';
    location: string = '';
    reminder: boolean = false;
    timeStart: Date;
    timeEnd: Date;
    isAllDayEvent: boolean = false;
    dateStart: Date;
    dateEnd: Date | undefined;

    constructor(data: {
        name: string,
        location: string,
        dateStart: Date,
        dateEnd: Date | undefined,
        timeStart: Date,
        timeEnd: Date,
        isAllDayEvent: boolean,
        reminder: boolean,
    }) {
        this.name = data.name;
        this.location = data.location;
        this.reminder = data.reminder;
        this.dateStart = data.dateStart;
        this.dateEnd = data.dateEnd;
        this.timeStart = data.timeStart;
        this.timeEnd = data.timeEnd;
        this.isAllDayEvent = data.isAllDayEvent as boolean;
    }

    public static createTodoFromJson(data: {
        name: string,
        location: string,
        dateStart: string,
        dateEnd: string | undefined,
        timeStart: string,
        timeEnd: string,
        isAllDayEvent: boolean,
        reminder: boolean,
    }): Todo {

        let todo = new Todo({
            name: data.name,
            location: data.location,
            dateStart: new Date(data.dateStart),
            dateEnd: (data.dateEnd == undefined) ? undefined : new Date(data.dateEnd),
            timeStart: new Date(data.timeStart),
            timeEnd: new Date(data.timeEnd),
            isAllDayEvent: data.isAllDayEvent,
            reminder: data.reminder,
        })
        return todo;
    }

    toString(): string {
        let result = this.name
        result += "  " + this.location;
        return result;
    }
}

