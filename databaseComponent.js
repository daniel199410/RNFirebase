import React, { Component } from 'react';
import{
    AppRegistry, FlatList,
    StyleSheet, Text, View, Image, Alert, Platform,
    TouchableHighlight,
    RefreshControl, TextInput
} from 'react-native';

import firebase from 'react-native-firebase';

const iosConfig = {
    clientId: '724169613990-bi0r2mk7k5ub9jeki9rh0ddkcn0fe3i2.apps.googleusercontent.com',
    appId: '1:724169613990:android:ebc90ced9c52460f',
    apiKey: 'AIzaSyDNvEQD14IdH0c8ttCpt4vMxnLY9QKevvM',
    databaseURL: 'https://fir-e0aed.firebaseio.com',
    storageBucket: 'fir-e0aed.appspot.com',
    messagingSenderId: '724169613990',
    projectId: 'fir-e0aed',
    // persistance: true,
};

const androidConfig = {
    clientId: '724169613990-bi0r2mk7k5ub9jeki9rh0ddkcn0fe3i2.apps.googleusercontent.com',
    appId: '1:724169613990:android:ebc90ced9c52460f',
    apiKey: 'AIzaSyDNvEQD14IdH0c8ttCpt4vMxnLY9QKevvM',
    databaseURL: 'https://fir-e0aed.firebaseio.com',
    storageBucket: 'fir-e0aed.appspot.com',
    messagingSenderId: '724169613990',
    projectId: 'fir-e0aed',
    // persistance: true,
};

const animalApp = firebase.initializeApp(
    Platform.OS === 'ios' ? iosConfig : androidConfig,
    'animalApp'
);

const rootReef = firebase.database().ref();
const animalRef = rootReef.child('animals');

export default class DatabaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animals: [],
            newAnimalName: '',
            loading: false
        };
    }
  
    componentDidMount() {
        animalRef.on('value', (childSnapshot) => {
            const animals = [];
            childSnapshot.forEach(doc => {
                animals.push({
                    animalName: doc.toJSON().animal
                })
                this.setState({
                    animals: animals,
                    loading: false
                })
            })
        })
    }

    onPressAdd = () => {
        if(this.state.newAnimalName.trim() == ''){
            alert('Animal name is blank');
            return;
        }
        animalRef.push(this.state.newAnimalName)
    }
  
    render() {
        return (
            <View style = {{ flex: 1, marginTop: Platform.OS === 'ios' ? 31 : 0 }}>
                <View style = {{ 
                    backgroundColor: 'green',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 64
                }}>
                    <TextInput style = {{
                        height: 40,
                        width: 200,
                        margin: 10,
                        padding: 10,
                        borderColor: 'white',
                        borderWidth: 1,
                        color: 'white'
                    }}
                        keyboardType = 'default'
                        placeholderTextColor = 'white'
                        placeholder = 'enter animal name'
                        autoCapitalize = 'none'
                        onChangeText = {
                            (text) => {
                                this.setState({ newAnimalName: text })
                            }
                        }
                        value = { this.state.newAnimalName }
                    />
                    <TouchableHighlight
                        style = {{ marginRight: 10 }}
                        underlayColor = 'tomato'
                        onPress = { this.onPressAdd }
                    >
                        <Image
                            style = {{ width: 35, height: 35 }}
                            source = { require('./img/baseline_add_circle_outline_black_18dp.png') }
                        />
                    </TouchableHighlight>
                </View>
                <FlatList
                    data = { this.state.animals }
                    renderItem = {({item, index}) => {
                        return (
                            <Text style = {{
                                fontSize: 20,
                                fontWeight: 'bold',
                                margin: 30
                            }}>{ item.name }</Text>
                        )
                    }}></FlatList>
            </View>
        );
    }
  }