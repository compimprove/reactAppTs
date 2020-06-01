import React, { useState } from 'react';
import Todo from '../Model/Todo';
import DateTimePicker from '@react-native-community/datetimepicker';
import TodoData from '../Data/TodoData';
import {
    Text,
    Content,
    Form,
    Item,
    Label,
    Input,
    Button,
    Switch,
    View,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function TodoDetail(props: {
    route: any,
    navigation: any,
    updateState: Function
}) {
    const currentTime = new Date();
    let todo: Todo = props.route.params.todo;
    console.log(todo);
    const [dateStart, setDateStart] = useState(todo.dateStart);
    const [dateEnd, setDateEnd] = useState(
        todo.dateEnd == undefined ? new Date(
            currentTime.getFullYear(),
            currentTime.getMonth(),
            currentTime.getDate()
        ) : todo.dateEnd
    );
    const [timeStart, setTimeStart] = useState(
        todo.timeStart == undefined ? new Date() : todo.timeStart
    );
    const [timeEnd, setTimeEnd] = useState(
        todo.timeEnd == undefined ? new Date() : todo.timeEnd
    );
    const [name, setName] = useState(todo.name);
    const [location, setLocation] = useState(todo.location);

    const [isAllDayEvent, setAllDayEvent] = useState(todo.isAllDayEvent);
    const toggleSwitchAllDayEvent = () => setAllDayEvent(previousState => !previousState);
    const [reminder, setReminder] = useState(todo.reminder);
    const toggleSwitchReminder = () => setReminder(previousState => !previousState);
    const navigation = useNavigation();

    const updateTodoLocalFunc = () => {
        updateTodo(todo.id, {
            dateStart,
            timeStart,
            dateEnd,
            timeEnd,
            name,
            location,
            reminder,
            isAllDayEvent
        });
        props.updateState();
        navigation.goBack();
    }

    const deleteTodoLocalFunc = () => {
        TodoData.delete(todo);
        props.updateState();
        navigation.goBack();
    }

    return (
        <Content style={{ backgroundColor: 'white' }}>
            <Form>
                <Item>
                    <Icon name="subtitles-outline" style={{ color: 'gray', width: 60, fontSize: 20, paddingBottom: 10 }} />
                    <Input
                        style={{ fontSize: 15, height: 60 }}
                        placeholder="Title"
                        onChangeText={text => setName(text)}
                        value={name} />
                </Item>
                <Item>
                    <Icon name="map-marker" style={{ color: 'gray', width: 60, fontSize: 20, paddingBottom: 10 }} />
                    <Input
                        style={{ fontSize: 15, height: 60 }}
                        placeholder="Location"
                        onChangeText={text => setLocation(text)}
                        value={location} />
                </Item>
                <Item style={{ height: 60 }}>
                    <Icon name="clock-outline" style={{ color: 'gray', width: 60, fontSize: 20, paddingBottom: 5 }} />
                    <Label style={{ paddingLeft: 5, width: 180, fontSize: 15 }}>
                        All Day Events
                    </Label>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchAllDayEvent}
                        value={isAllDayEvent}
                    />
                </Item>
                <PickDateTime
                    time={{ timeStart, setTimeStart, timeEnd, setTimeEnd }}
                    date={{ dateStart, setDateStart, dateEnd, setDateEnd }}
                    isAllDayEvent={isAllDayEvent}
                    setAllDayEvent={setAllDayEvent}

                />
                <Item last style={{ height: 60 }}>
                    <Icon name="bell-outline" style={{ color: 'gray', width: 60, fontSize: 20, paddingBottom: 5 }} />
                    <Label style={{ paddingLeft: 5, width: 180, fontSize: 15 }}>
                        Reminder
                    </Label>
                    <Switch
                        style={{ paddingLeft: 5 }}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchReminder}
                        value={reminder}
                    />
                </Item>

                <View style={{ marginTop: 20, display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                    <Icon.Button
                        style={{ width: 90 }} name="content-save"
                        onPress={updateTodoLocalFunc}>
                        Save
                    </Icon.Button>
                    <Icon.Button
                        backgroundColor="#f7513b"
                        style={{ width: 90 }} name="delete-outline"
                        onPress={deleteTodoLocalFunc}>
                        Delete
                    </Icon.Button>
                </View>
            </Form>
        </Content >
    );
}

function createDateTimePickerFunction(
    setShow: Function,
    setDateTime: Function,
    defaultTime: Date) {
    return (e: any, selectedDateTime: Date | undefined) => {
        setShow(false);
        setDateTime(selectedDateTime || defaultTime);

    }
}

function getTimeString(time: Date): string {
    return `${time.getHours()}:${time.getMinutes()}`
}

function getDateString(date: Date): string {
    return `${date.getDate()}/${date.getMonth()}`;
}

function getDate(date: Date, time: Date): Date {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
    );
}


function updateTodo(id: number, arg: {
    dateStart: Date,
    timeStart: Date,
    dateEnd: Date,
    timeEnd: Date,
    name: string,
    location: string,
    reminder: boolean,
    isAllDayEvent: boolean,
}
) {
    let todo = new Todo(arg);
    TodoData.update(id, todo);
}



function PickDateTime(props: {
    date: any,
    time: any,
    isAllDayEvent: boolean,
    setAllDayEvent: Function,
}) {
    const [showPickDateStart, setShowPickDateStart] = useState(false);
    const [showPickDateEnd, setShowPickDateEnd] = useState(false);
    const [showPickTimeStart, setShowPickTimeStart] = useState(false);
    const [showPickTimeEnd, setShowPickTimeEnd] = useState(false);

    return (
        <>
            <Item style={{ height: 100 }} >
                <Label style={{ width: 60 }}>
                </Label>
                <View onTouchEnd={() => setShowPickDateStart(true)} style={{
                    paddingLeft: 5,
                    width: 100,
                    borderRightColor: "gray",
                    borderRightWidth: 1,
                    height: 70
                }}>
                    <Text style={{ fontSize: 13, color: 'gray', paddingBottom: 5 }}>
                        {props.isAllDayEvent ? "Date Start" : "Date"}
                    </Text>
                    <Text>{getDateString(props.date.dateStart)}</Text>
                </View>
                {props.isAllDayEvent &&
                    <View onTouchEnd={() => setShowPickDateEnd(true)} style={{
                        minWidth: 100,
                        height: 70,
                        paddingLeft: 15
                    }}>
                        <Text style={{ fontSize: 13, color: 'gray', paddingBottom: 5 }}>Date End</Text>
                        <Text>{getDateString(props.date.dateEnd)}</Text>
                        <Text style={{ fontSize: 13, color: 'gray', paddingTop: 5 }}>
                            {`Duration: ${(props.date.dateEnd - props.date.dateStart) / 86400000}  days`}
                        </Text>
                    </View>
                }
                {!props.isAllDayEvent &&
                    <View style={{
                        minWidth: 100,
                        height: 70,
                        paddingLeft: 15
                    }}>
                        <Text style={{ fontSize: 13, color: 'gray', paddingBottom: 5 }}>Time</Text>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <Text onPress={() => setShowPickTimeStart(true)}>
                                {`${getTimeString(props.time.timeStart)} -> `}
                            </Text>
                            <Text onPress={() => setShowPickTimeEnd(true)}>
                                {`${getTimeString(props.time.timeEnd)}`}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 13, color: 'gray', paddingTop: 5 }}>
                            {`Duration: ${getTimeDurationString(
                                props.time.timeStart,
                                props.time.timeEnd)}`}
                        </Text>
                    </View>
                }
            </Item>

            {showPickDateStart && <DateTimePicker
                value={props.date.dateStart}
                maximumDate={props.isAllDayEvent ? props.date.dateEnd : undefined}
                mode="date"
                display="calendar"
                is24Hour={true}
                onChange={createDateTimePickerFunction(
                    setShowPickDateStart,
                    props.date.setDateStart,
                    props.date.dateStart)}
            />}
            {showPickDateEnd && <DateTimePicker
                value={props.date.dateEnd}
                minimumDate={props.isAllDayEvent ? props.date.dateStart : undefined}
                mode="date"
                display="calendar"
                is24Hour={true}
                onChange={createDateTimePickerFunction(
                    setShowPickDateEnd,
                    props.date.setDateEnd,
                    props.date.dateEnd)}
            />}
            {showPickTimeStart && <DateTimePicker
                value={props.time.timeStart}
                mode="time"
                display="clock"
                is24Hour={true}
                onChange={createDateTimePickerFunction(
                    setShowPickTimeStart,
                    props.time.setTimeStart,
                    props.time.timeStart)}
            />}
            {showPickTimeEnd && <DateTimePicker
                value={props.time.timeEnd}
                mode="time"
                display="clock"
                is24Hour={true}
                onChange={createDateTimePickerFunction(
                    setShowPickTimeEnd,
                    props.time.setTimeEnd,
                    props.time.timeEnd)}
            />}
        </>
    )
}

function getTimeDurationString(start: Date, end: Date): string {
    let startTime = new Date(0, 0, 0, start.getHours(), start.getMinutes());
    let endTime = new Date(0, 0, 0, end.getHours(), end.getMinutes());
    if (endTime < startTime) {
        return 'Invalid';
    } else {
        let durationHours = end.getHours() - start.getHours();
        let durationMinutes = end.getMinutes() - start.getMinutes();
        return `${durationHours} hrs, ${durationMinutes} mins`;
    }
}