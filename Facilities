import React, { Component } from 'react';

import { 
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableHighlight,
  Button} from 'react-native';

class Facilities extends Component {
  constructor(props){
    super(props);

    this.state={
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!=r2}),
    }
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;

    fetch("https://d532hurrpb.execute-api.us-east-1.amazonaws.com/dev/getFacilityListByUser", {
      method: 'POST',
      headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
      body: "id=" + params.userid // <-- Post parameters
    })
    .then((response) => response.json())
    .then((responseJson) =>{
      data = responseJson;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data.facilityList)
      })
    })
    .catch((error) =>{
      alert(error);
    });
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: 'Facilities',
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
            <TouchableHighlight onPress={() => this.props.navigation.navigate(
              'Resources', {
                userid: this.props.navigation.state.params.userid,
                faciltyId:rowData.Id})}>
              <View style={{padding:10,margin:10}}>
                <Text style={{fontWeight:'bold',textAlign:'center'}}>{rowData.Name}  {rowData.Landmark}</Text>
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

module.exports = Facilities;
