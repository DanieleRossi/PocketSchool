import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';

import GetJSON from '../Utility/GetJSON';
import PollListItem from '../adaptor/PollListItem';
import Colors from '../Utility/Colors';

export default class PollScreen extends React.Component {

  static navigationOptions = {
    title: 'Polls',
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.white,
    drawerLabel: 'Polls',
    drawerIcon: ( {tintColor} ) => (
      <Image
        source={require('../../assets/logo.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
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
      var polls = data.data;
      this.setState({data: polls, loading:false});
    }.bind(this));

    this.setState({loading:true});

    request.getData({
      action: "getPolls",
      data: {
        user_id: 1,
      }
    });
  }

  _keyExtractor = (item, index) => item.poll_id.toString();

  _onPressItem = (id: string) => {
    this.props.navigation.navigate("PollDetails",{
      poll_id: id,
    });
    console.log("poll_id: " + id);
  };

  _renderItem = ({item}) => (
   <PollListItem
     id={item.poll_id}
     onPressItem={this._onPressItem}
     title={item.question}
     description = {item.description}
     closed = {item.closed}
     answers = {item.answers}
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
