import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import Colors from '../Utility/Colors';

export default class CommunicationListItem extends React.PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/logo.png')} style={styles.image}/>
          </View>
          <View>
            <Text style={styles.title}>
              {this.props.title}
            </Text>
            <View>
              <Text style={styles.subtitle}>
                {this.props.to != "" ? this.props.author + " - " + this.props.to :  this.props.author}
              </Text>
              <Text style={styles.subtitle}>
                {this.props.date}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text>
            {this.props.description}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  header:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  imageContainer: {
    margin: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  title:{
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle:{
    fontSize: 15,
    color: "grey",
  },
  descriptionContainer: {
    padding: 10,
  },
});
