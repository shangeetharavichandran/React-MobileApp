import React, {Component} from 'react';
import './shim.js'

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View
} from 'react-native';

class SignIn extends Component {
  constructor(props) {
	    super(props)

	    this.state = {
	      userid: '',
	      pwd: ''
	    }
	}

  _click() {
  	const { email }  = this.state ;
  	const { pwd }  = this.state ;

    //Get user
    fetch("https://d532hurrpb.execute-api.us-east-1.amazonaws.com/dev/login", {
      method: 'POST',
      headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
      body: "email=" + email // <-- Post parameters
    })
    .then((response) => response.text())
    .then((responseText) => {
      var json = JSON.parse(responseText);

      if(json.user.length == 0)
      {
        alert("Email not existed");
      }
      else
      {
        var sha512 = require('js-sha512').sha512;
        var failure = true;

        for (var x = 0; x < json.user.length; x++) 
        {
          //Encode password
          var password = new Buffer(json.user[x].Salt + pwd, "utf8");

          var passwordByte = Buffer.alloc(password.length * 2);

          for(var i=0;i<password.length; i++)
          {
            passwordByte[2 * i] = password[i];
            passwordByte[2 * i + 1] = 0;
          }

          var hash = sha512(passwordByte);

          var hashedBytes = Buffer.alloc(hash.length/2);

          for(var i=0;i<hashedBytes.length; i++)
          {
            var _hash = hash[2 * i] + hash[2 * i + 1];

            hashedBytes[i] = parseInt(_hash, 16);
          }

          var hashedpwd =hashedBytes.toString("base64");

          if(json.user[x].Password == hashedpwd)
          {
            failure = false;
            this.props.navigation.navigate('Facilities', {userid: json.user[x].Id});
          }
        }

        if(failure)
        {
          alert("Incorrect Password");
        }
      }
    })
    .catch((error) => {
      alert(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>User Email</Text>
        <TextInput 
        	style={{width: 200}}
        	onChangeText={email => this.setState({email})}
        />

        <Text>Password</Text>
        <TextInput 
        	style={{width: 200}}
        	onChangeText={pwd => this.setState({pwd})}
        />

        <Button 
        	title="Sign in"   
        	onPress={this._click.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = SignIn;
