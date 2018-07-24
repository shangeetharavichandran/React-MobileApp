//Shangeetha Ravichandran
import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

class Resource extends Component {
  constructor(props) {
	    super(props)

      const { params } = this.props.navigation.state;

      this.state = {
          Id: params.resourceId,
          FacilityID: params.facilityID,
          Name: params.name,
          Quantity: params.quantity.toString(),
          Description: params.description,
          Color: params.color,
          Size: params.size,
          Comment: params.comment
      }
	}

  _click() {
  	const { Id }  = this.state ;
  	const { FacilityID }  = this.state ;
    const { Name }  = this.state ;
    const { Quantity }  = this.state ;
    const { Description }  = this.state ;
    const { Color }  = this.state ;
    const { Size }  = this.state ;
    const { Comment }  = this.state ;

    fetch("https://d532hurrpb.execute-api.us-east-1.amazonaws.com/dev/updateResource", {
      method: 'POST',
      headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
      body: "id=" + Id + "&facilityId=" + FacilityID + "&name=" + Name + "&quantity=" + Quantity + "&description=" + Description + "&color=" + Color + "&size=" + Size + "&comments=" + Comment
    })
    .then((response) => response.text())
    .then((responseText) => {
      var json = JSON.parse(responseText);

      if(json.rowAffected[0] == 1)
      {
        alert("Updated Successfully");

        this.props.navigation.navigate('Resources', {
          userid: this.props.navigation.state.params.userid,
          faciltyId: FacilityID})
      }
      else
      {
        alert("Updated Failed!");
      }
    })
    .catch((error) => {
      alert(error);
    });
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: 'Resource',
    headerRight: (
      <View>
        <Button 
          title="Log Out"
          onPress={() => {navigation.navigate('SignIn')}}
        />
      </View>)
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>Name: {this.state.Name}</Text>

        <Text>Quantity</Text>
        <TextInput 
          style={{width: 200}}
          onChangeText={Quantity => this.setState({Quantity})}
          defaultValue={this.state.Quantity}
        />

        <Text>Description</Text>
        <TextInput 
          style={{width: 200}}
          onChangeText={Description => this.setState({Description})}
          defaultValue={this.state.Description}
        />

        <Text>Color</Text>
        <TextInput 
          style={{width: 200}}
          onChangeText={Color => this.setState({Color})}
          defaultValue={this.state.Color}
        />

        <Text>Size</Text>
        <TextInput 
          style={{width: 200}}
          onChangeText={Size => this.setState({Size})}
          defaultValue={this.state.Size}
        />

        <Text>Comment</Text>
        <TextInput 
          style={{width: 200}}
          onChangeText={Comment => this.setState({Comment})}
          defaultValue={this.state.Comment}
        />   

        <Button 
          title="Save"   
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

module.exports = Resource;
