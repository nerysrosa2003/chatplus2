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
import Global from '../utils/Global/Global';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


var radio_props = [
    {label: 'Yes', value: 'YES' },
    {label: 'No', value: 'NO' }
];

export default class SignUpScreen extends Component {
    static navigationOptions = {
        header: null,
        headerBackTitle: null,
	};

    constructor(props){
		super(props);

		this.state = {

            showIndicator: false,

            user_name: '',
            full_name: '',
            tags: '',
            user_location: '',
            web_page: '',
            email: '',
            phone_number: '',
            userCode: '',
            password: '',
            confim_password: '',
            father: 'No',

            update_account: Global.update_account

		}
    }

    async componentDidMount() {
        
    }

    componentWillUnmount() {
        this.setState({
            update_account: false
        });
        Global.update_account = false;
    }

    initialization() {
        
    }

    signup = async() => {
        Keyboard.dismiss();
        if(this.state.user_name == "") {
            Alert.alert("Warning!", "Please input Username.");
            return;
        } 

        if(this.state.email != '') {
            let regExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if(regExpression.test(this.state.email) === false) {
                Alert.alert("Warning!", 'Please use valid Email address.');
                return;
            };
        }
        
        if(this.state.password < 6) {
            Alert.alert("Warning!", "Password have to be at least 6 characters.");
            return;
        }
        if(this.state.password != this.state.confim_password) {
            Alert.alert("Warning!", "Password does not match.");
            return;
        }
        console.log({
            username: this.state.user_name,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone_number,
        })
        this.setState({showIndicator: true})
        await fetch(Global.base_url + 'signup', {
            method: 'POST',
            headers: {
                // 'Authorization': 'Basic ' + base64.encode(Global.auth_user_name + ":" + Global.auth_password),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.user_name,
                password: this.state.password,
                email: this.state.email,
                phone: this.state.phone_number,
            })
        })
        .then(response => response.json())
        .then(async responseData => {
            console.log(responseData)
        })
        .catch(function(error) {
            console.log(error)
            Alert.alert('Warning!', "Network error!");
        });
        this.setState({showIndicator: false})
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
                    {/* <KeyboardAwareScrollView style = {{width: '100%'}} showsVerticalScrollIndicator = {false}> */}
                        <View style = {{width: '100%', alignItems: 'center'}}>
                            <View style = {styles.input_view}>
                                <TextInput style = {styles.input_text} placeholder = {'Username'} autoCapitalize={'none'} onChangeText = {(text) => this.setState({user_name: text})}>{this.state.user_name}</TextInput>
                            </View>
                            <View style = {styles.input_view}>
                                <TextInput style = {styles.input_text} placeholder = {'Email Address'} autoCapitalize={'none'} onChangeText = {(text) => this.setState({email: text})}>{this.state.email}</TextInput>
                            </View>
                            <View style = {styles.input_view}>
                                <TextInput style = {styles.input_text} placeholder = {'Phone numbers'} keyboardType = {'number-pad'} onChangeText = {(text) => this.setState({phone_number: text})}>{this.state.phone_number}</TextInput>
                            </View>
                            <View style = {styles.input_view}>
                                <TextInput style = {styles.input_text} placeholder = {'Password'} secureTextEntry = {true} onChangeText = {(text) => this.setState({password: text})}>{this.state.password}</TextInput>
                            </View>
                            <View style = {styles.input_view}>
                                <TextInput style = {styles.input_text} placeholder = {'Confirm Password'} secureTextEntry = {true} onChangeText = {(text) => this.setState({confim_password: text})}>{this.state.confim_password}</TextInput>
                            </View>

                            <TouchableOpacity style = {styles.button_view} onPress = {() => this.signup()}>
                                <Text style = {styles.button_text}>{"CREATE ACCOUNT"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style = {{marginTop: 20, marginBottom: 30}} onPress = {() => this.props.navigation.navigate("SignInScreen")}>
                                <Text style = {styles.common_text}>Already a member? Login</Text>
                            </TouchableOpacity>
                        </View>
                    {/* </KeyboardAwareScrollView> */}
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
        height: '80%',
        alignItems: 'center'
    },
    input_view: {
        width: '100%',
        height: 40,
        borderBottomColor: '#ff0000',
        borderBottomWidth: 1,
        marginTop: 10
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
    button_view: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#ff0000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    button_text: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    back_button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 10
    }
})