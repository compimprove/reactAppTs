import React from "react";
import { Footer, FooterTab, Button, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function AppFooter() {
    const navigation = useNavigation();
    return (
        <Footer>
            <FooterTab>
                <Button onPress={() => navigation.navigate('ToDayCalendar')}>
                    <Text>Today</Text>
                </Button>
                <Button onPress={() => navigation.navigate('WeekCalendar')}>
                    <Text>Week</Text>
                </Button>
                <Button onPress={() => navigation.navigate('MonthCalendar')}>
                    <Text>Month</Text>
                </Button>
            </FooterTab>
        </Footer>
    )
}