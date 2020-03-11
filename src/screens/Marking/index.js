import React, { useState } from 'react'

import {
    View,
    Alert,
    UIManager,
    LayoutAnimation
} from 'react-native'

import {
    Container,
    Content,
    Body,
    Left,
    Icon,
    Right,
    Header,
    Title,
    Button,
    List,
    ListItem,
    Text,
    Spinner,
    Card,
    CardItem
} from 'native-base'

import TimetableCard from '../Timetable/TimetableCard'
import { TouchableOpacity } from 'react-native-gesture-handler'

UIManager.setLayoutAnimationEnabledExperimental(true)
const Marking = ({ navigation, route }) => {
    const [marking, setMarking] = useState(false)
    const [students, setStudents] = useState([
        {id: 1907001, marked: false},
        {id: 1907002, marked: false},
        {id: 1907003, marked: false},
        {id: 1907004, marked: false},
        {id: 1907005, marked: false},
        {id: 1907006, marked: false},
        {id: 1907007, marked: false},
        {id: 1907008, marked: false},
    ])

    const manualMark = (student) => {
        if(!student.marked) {
            Alert.alert(
                'Manual Mark',
                'Do you want to mark this student manually?',
                [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'Yes', onPress: () => setStudents(prevStudents => prevStudents.map(item => item.id === student.id ? {...item, marked: true} : item))}
                ]
            )
        } else {
            Alert.alert(
                'Manual Mark',
                'Do you want to unmark this student?',
                [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'Yes', onPress: () => setStudents(prevStudents => prevStudents.map(item => item.id === student.id ? {...item, marked: false} : item))}
                ]
            )
        }
    }

    const startAttendance = () => {
        setMarking(true)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        setTimeout(() => setStudents(prevStudents => prevStudents.map(item => item.id === 1907008 ? {...item, marked: true} : item)), 1000)
        setTimeout(() => setStudents(prevStudents => prevStudents.map(item => item.id === 1907005 ? {...item, marked: true} : item)), 2000)
        setTimeout(() => setStudents(prevStudents => prevStudents.map(item => item.id === 1907003 ? {...item, marked: true} : item)), 2500)
        setTimeout(() => setStudents(prevStudents => prevStudents.map(item => item.id === 1907004 ? {...item, marked: true} : item)), 2700)
        setTimeout(() => setStudents(prevStudents => prevStudents.map(item => item.id === 1907001 ? {...item, marked: true} : item)), 4500)
    }

    const stopAttendance = () => {
        setMarking(false)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    }
    
    return (
        <Container>
            <Header hasTabs>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back"/>
                    </Button>
                </Left>
                <Body>
                    <Title>Marking</Title>
                </Body>
                <Right/>
            </Header>
            <View>
                <CardItem bordered style={{flexDirection: 'column', alignItems: "flex-start"}}>
                    <Text>{route.params.item.type}</Text>
                    <Text>{route.params.item.moduleName}</Text>
                    <Text>{route.params.item.staff}</Text>
                    <Text>{route.params.item.start}</Text>
                    <Text>{route.params.item.end}</Text>
                </CardItem>
            </View>
            <Content padder>
                {/*<TimetableCard item={route.params.item} />*/}
                    {
                        marking ? (
                            <View style={{flexDirection: "column", alignItems: "center"}}>
                                <Button danger onPress={stopAttendance}><Text>Stop attendance</Text></Button>
                                    <Text>Marking...</Text>
                                <Spinner color='#712177'/>
                            </View>
                        ) : (
                            <View style={{flexDirection: "row", justifyContent: "center"}}>
                                <Button success onPress={startAttendance}><Text>Start attendance</Text></Button>
                            </View>
                        )
                    }
                <List>
                    {           // alphabetic sorting +     mark sorting
                        students.sort((a, b) => a.id - b.id).sort((a, b) => b.marked - a.marked).map(student => {
                            return (
                                <TouchableOpacity key={student.id} activeOpacity={0.5} onPress={() => manualMark(student)}>
                                    <ListItem>
                                        <Left><Text>{student.id}</Text></Left>
                                        {student.marked ? <Icon name="md-checkbox-outline" style={{color: 'green'}}/> : <Icon name="md-square-outline" style={{color: 'red'}}/>}
                                    </ListItem>
                                </TouchableOpacity>
                            )
                        })
                    }
                </List>
            </Content>
        </Container>
    )
}

export default Marking