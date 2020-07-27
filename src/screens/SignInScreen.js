import React, {Fragment, Component} from 'react';
import {
    YellowBox,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions,
    Linking,
    Share,
    Platform,
    Alert,
    Keyboard,
    TextInput
} from 'react-native';

const base64 = require('base-64');
import { SkypeIndicator } from 'react-native-indicators';
import Global from '../utils/Global/Global'
import AsyncStorage from '@react-native-community/async-storage';

// LogBox.ignoreAllLogs()

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class SignInScreen extends Component {
    static navigationOptions = {
        header: null,
        headerBackTitle: null,
	};

    constructor(props){
		super(props);

		this.state = {

            showIndicator: false,
            auth_user_name: 'luis',
            auth_password: 'luis',
            user_name: '',
            password: '',
            phone_number: '',
            user_email: '',

		}
    }

    async UNSAFE_componentWillMount() {
        
    }

    login = async() => {
        Keyboard.dismiss();
        if(this.state.user_name == "") {
            Alert.alert("Warning!", "Please input Username.");
            return;
        };
        if(this.state.password == "") {
            Alert.alert("Warning!", "Please input Password.");
            return;
        };
       
        
        this.setState({showIndicator: true})
        await fetch(Global.base_url + 'login', {
            method: 'POST',
            headers: {
                // 'Authorization': 'Basic ' + base64.encode(Global.auth_user_name + ":" + Global.auth_password),
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //     "username": "water",
            //     "password": "wateffr",
            //     "phone": "3333333333",
            //     "email": "myemail.com"
            // })
            body: JSON.stringify({
                "username": this.state.user_name,
                "password": this.state.password
            })
        })
        .then(response => response.json())
        .then(async responseData => {
            if(responseData.message) {
                if(responseData.message == "Incorrect username") {
                    Alert.alert("Warning!", "Incorrecet username. Please try again.");
                    return;
                }
                if(responseData.message == "Incorrect password") {
                    Alert.alert("Warning!", "Incorrecet password. Please try again.");
                    return;
                }
            }
            
            // if(responseData.error == "Unauthorized") {
            //     Alert.alert('Warning!', "Username or Password is incorrect");
            // } else {
                
            //     try {
            //         // await AsyncStorage.setItem("signin_status", "ok");
            //         // await AsyncStorage.setItem("user_name", this.state.user_name);
            //         // await AsyncStorage.setItem("password", this.state.password);
            //     } catch(error) {
            //         // console.warn(error.message);
            //     }

            //     // if(data.paname != "") {
            //     //     Global.user_type = "advocate";
            //     //     this.props.navigation.navigate("AdvocateHome");
            //     // } else {
            //     //     Global.user_type = "e-patient";
            //     //     this.props.navigation.navigate("Home");
            //     // }
            // }
        })
        .catch(function(error) {
            console.log(error)
            Alert.alert('Warning!', "Network error.");
        });
        this.setState({showIndicator: false})
    }

    forget_password() {
        Alert.alert("www.epatientindex.com", "Please email to support@epatientindex.com.",
        [
            {text: 'Cancel', onPress: null},
            {text: 'OK', onPress: async() => {
                Linking.openURL('mailto:support@epatientindex.com');
            }}
        ],
        { cancelable: true })
    }

    render() {
        return (

            <View style = {styles.container}>
            {
                this.state.showIndicator &&
                <View style = {{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', opacity: 0.3, zIndex: 100}}>
                    <View style = {{flex: 1}}>
                        <SkypeIndicator color = '#ffffff' />
                    </View>
                </View>
            }
                <View style = {styles.logo_view}>
                    <Image style = {{width: '60%', height: '60%'}} resizeMode = {'contain'} source={require('../assets/images/logo.png')}/>
                </View>
                <View style = {styles.medium_view}>
                    <View style = {{width: '100%', height: '33%', justifyContent: 'center'}}>
                        <View style = {styles.input_view}>
                            <TextInput style = {styles.input_text} placeholder = {'Username'} autoCapitalize={'none'} onChangeText = {(text) => this.setState({user_name: text})}></TextInput>
                        </View>
                    </View>
                    <View style = {{width: '100%', height: '33%', justifyContent: 'center'}}>
                        <View style = {styles.input_view}>
                            <TextInput style = {styles.input_text} placeholder = {'Password'} secureTextEntry = {true} onChangeText = {(text) => this.setState({password: text})}></TextInput>
                        </View>
                    </View>
                    <View style = {{width: '100%', height: '33%', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress = {() => {}}>
                            <Text style = {styles.common_text}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.bottom_view}>
                        <TouchableOpacity style = {styles.button_view} onPress = {() => this.login()}>
                            <Text style = {styles.button_text}>LOGIN</Text>
                        </TouchableOpacity>
                        <View style = {{marginTop: 30, marginBottom: 30}}>
                            <Text style = {styles.common_text}>No account yet?</Text>
                        </View>
                        <TouchableOpacity style = {[styles.button_view, {marginBottom: 5}]} onPress = {() => this.props.navigation.navigate("SignUpScreen")}>
                            <Text style = {styles.button_text}>CREATE ACCOUNT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    logo_view: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    medium_view: {
        width: '90%',
        height: 150,
        alignItems: 'center'
    },
    input_view: {
        width: '100%',
        height: 40,
        borderBottomColor: '#ff0000',
        borderBottomWidth: 1
    },
    input_text: {
        width: '100%',
        height: '100%',
        fontSize: 16,
        color: '#000000',
        padding: 0
    },
    common_text: {
        color: '#000000',
        fontSize: 14
    },
    bottom_view: {
        width: '90%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    button_view: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#ff0000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_text: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold'
    }
})