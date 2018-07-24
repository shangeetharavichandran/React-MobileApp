import React, { Component } from 'react';

import { 
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableHighlight,
  Button} from 'react-native';

class Resources extends Component {
  constructor(props){
    super(props);

    this.state={
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!=r2})
    }
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;

    fetch("https://d532hurrpb.execute-api.us-east-1.amazonaws.com/dev/getResourceListByFacility", {
      method: 'POST',
      headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
      body: "id=" + params.faciltyId // <-- Post parameters
    })
    .then((response) => response.json())
    .then((responseJson) =>{
      data = responseJson;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data.resourceList)
      })
    })
    .catch((error) =>{
      alert(error);
    });
  }

  getResource(id){
    const { params } = this.props.navigation.state;

    fetch("https://d532hurrpb.execute-api.us-east-1.amazonaws.com/dev/getResourceById", {
        method: 'POST',
        headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
          }),
        body: "id=" + id // <-- Post parameters
      })
      .then((response) => response.json())
      .then((responseJson) =>{
        this.props.navigation.navigate('Resource', {
                userid: this.props.navigation.state.params.userid,
                resourceId: responseJson.resource[0].Id,
                facilityID: responseJson.resource[0].FacilityID,
                name: responseJson.resource[0].Name,
                quantity: responseJson.resource[0].Quantity,
                description: responseJson.resource[0].Description,
                color: responseJson.resource[0].Color,
                size: responseJson.resource[0].Size,
                comment: responseJson.resource[0].Comment
              });
      })
      .catch((error) =>{
        alert(error);
      });
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: 'Resources',
    headerRight: (
      <View>
        <Button 
          title="Log Out"
          onPress={() => {navigation.navigate('SignIn')}}
        />
      </View>)
  });

  render(){
    return(
      <View style={styles.container}>  
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData)=>
            <TouchableHighlight onPress={() => this.getResource(rowData.Id)}>
              <View style={{padding:10,margin:10}}>
                <Text style={{fontWeight:'bold',textAlign:'center'}}>{rowData.Name}  Quantity:{rowData.Quantity}</Text>
              </View>
            </TouchableHighlight>}
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

module.exports = Resources;
