import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Button, Text } from 'native-base';

export default function AddTodoButton() {
    const navigation = useNavigation();

    return (
        <View style={{ position: "absolute", bottom: 10, right: 10 }}>
            <Button rounded large onPress={() => navigation.navigate('AddTodo')}>
                <Text>+</Text>
            </Button>
        </View>

    );
}