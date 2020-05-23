import * as React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GoToButton(props: { screenName: string }) {
    const navigation = useNavigation();

    return (
        <Button
            title={`Go to ${props.screenName}`}
            onPress={() => navigation.navigate(props.screenName)}
        />
    );
}