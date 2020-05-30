export default class Todo {
    id: number = 0;
    name: string = '';
    location: string = '';
    reminder: boolean = false;
    timeStart: Date | undefined;
    timeEnd: Date | undefined;
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

