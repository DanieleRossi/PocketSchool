import React from 'react';
import { StyleSheet, Text, View,
  ScrollView, Button, Image,
  ActivityIndicator, TextInput,} from 'react-native';

import { Icon } from 'react-native-elements';

import GetJSON from '../Utility/GetJSON';
import Colors from '../Utility/Colors';
import translate from "../Utility/Languages";

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    title: translate('LOGIN_title'),
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.white,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: "",
      password: "",
    };
  }

  _login = () => {
    var request = new GetJSON("https://pocketschool.altervista.org/api/api.php",
    function(data){
      console.log(data.data);
      if(data.success){
        this.props.navigation.navigate("Home");
      }
    }.bind(this));

    this.setState({loading:true});

    var email = this.state.username;
    var password = this.state.password;

    request.getData({
      action: "checkUser",
      data: {
        email: email,
        password: password,
      }
    });
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: Colors.primaryLightOpacity}}>
        <View style={styles.container}>
            {this.state.loading && (<ActivityIndicator
              size="large"
              color="#0000ff"
            />
            )}
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={require('../../assets/logo_scritta.png')} />
            </View>
            <View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType='email-address'
                  placeholder={translate("LOGIN_email_hint")}
                  style={styles.textInput}
                  selectionColor={Colors.accentLightOpacity}
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => this.setState({username: text})}
                  />
                <Icon
                  name="email" type="material-community"
                  tintColor={Colors.black}
                  size={32}
                  style={styles.iconInput}/>
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType='default'
                  placeholder={translate("LOGIN_password_hint")}
                  style={styles.textInput}
                  selectionColor={Colors.accentLightOpacity}
                  underlineColorAndroid='transparent'
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({password: text})}
                  />
                <Icon
                  name="lock" type="material-community"
                  tintColor={Colors.black}
                  size={32}
                  style={styles.iconInput}/>
              </View>
              <Button
                onPress={this._login}
                title={translate("LOGIN_button_login")} />
            </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    margin: 15,
  },
  textInput: {
    flex: 1,
    paddingStart: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingEnd: 0,
  },
  iconInput: {
    padding: 5,
  }
});
