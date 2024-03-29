import React, { useContext } from "react"
import {
    Alert,
} from 'react-native'
import { 
    Container, 
    Header, 
    Left, 
    Body, 
    Title, 
    Right, 
    Button,
    Icon
} from 'native-base'

import Timetable from './Timetable'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthContext } from '../../App'

const Tab = createBottomTabNavigator()

const TabView = (props) => {
    const { signOut } = useContext(AuthContext)

    const logout = () => {
        Alert.alert(
            'Logout',
            'Do you want to logout?',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Ok', onPress: () => signOut()}
            ]
        )
    }

    return (
        <Container>
            <Header hasTabs>
                <Left />
                <Body>
                    <Title>Attend Lecturer</Title>
                </Body>
                <Right>
                    <Button transparent onPress={logout}>
                        <Icon name='md-log-out' />
                    </Button>
                </Right>
            </Header>
            {/*<Tabs tabBarPosition={'bottom'}>
                <Tab heading={ <TabHeading><Icon name="md-person" /><Text>Profile</Text></TabHeading>}>
                    <Profile />
                </Tab>
                <Tab heading={ <TabHeading><Icon name="md-calendar" /><Text>Timetable</Text></TabHeading>}>
                    <Timetable />
                </Tab>
            </Tabs>*/}
            {/*<Tab.Navigator
                lazy={true}
                tabBarOptions={{
                    activeTintColor: "white",
                    style: { backgroundColor: '#712177' }
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconColor = focused ? 'white' : 'grey'
                        let iconName
                        if(route.name === 'Profile') {
                            iconName = 'md-person'
                        } else {
                            iconName = 'md-calendar'
                        }
                        return <Icon name={iconName} style={{color: iconColor}}/>
                    }
                })}
            >
                <Tab.Screen name='Profile' component={Profile} />
                <Tab.Screen name='Timetable' component={Timetable} />
            </Tab.Navigator>*/}
            <Timetable {...props}/>
      </Container>
    )
}

export default TabView