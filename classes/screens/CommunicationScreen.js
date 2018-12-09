import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';

import GetJSON from '../Utility/GetJSON';
import CommunicationListItem from '../adaptor/CommunicationListItem';
import Colors from '../Utility/Colors';
import translate from '../Utility/Languages';


export default class CommunicationScreen extends React.Component {

  static navigationOptions = {
    title: translate("COMMUNICATION_title"),
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.white
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount(){
    var request = new GetJSON("https://pocketschool.altervista.org/api/api.php",
    function(data){
      console.log(data.data);
      var communication = data.data;
      this.setState({data: communication, loading:false});
    }.bind(this));

    this.setState({loading:true});

    request.getData({
      action: "getPosts",
      data: {
        group_id: 1
      }
    });
  }

  _keyExtractor = (item, index) => item.communication_id.toString();

  _onPressItem = (id: string) => {
    console.log("communication_id: " + id);
  };

  _renderItem = ({item}) => (
   <CommunicationListItem
     id={item.communication_id}
     onPressItem={this._onPressItem}
     title={item.title}
     description = {item.description}
     author = {item.name + " " + item.lastname}
     date = {item.date}
     to = {item.to}
   />
 );

  render() {
    return (
      <View style={styles.container}>
          {this.state.loading && (<ActivityIndicator
            size="large"
            color="#0000ff"
          />
          )}
          <FlatList
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
