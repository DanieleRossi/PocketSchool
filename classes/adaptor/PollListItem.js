import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import translate from '../Utility/Languages';
import Colors from '../Utility/Colors';

export default class PollListItem extends React.PureComponent {

  _getAnswerPercentage(count, total){
    return Math.round((count*100)/total) + "%";
  }

  _getLayoutAnswers(){
    var answers = this.props.answers;

    var total = parseInt(answers[0].total) + parseInt(answers[1].total);
    var firstAnswer = answers[0];
    var secondAnswer = answers[1];
    var layout = (
      <View style={styles.horizontal}>
        <View style={{padding: 5, backgroundColor: Colors.primaryLight,
                      width: this._getAnswerPercentage(firstAnswer.total, total)}}>
          <Text style={styles.answerLayout}>
            {firstAnswer.answer.answer}
            {"\n"}
            {this._getAnswerPercentage(firstAnswer.total, total)}
          </Text>
        </View>
        <View style={{padding: 5, backgroundColor: Colors.primaryDark,
                      width: this._getAnswerPercentage(secondAnswer.total, total)}}>
          <Text style={styles.answerLayout}>
            {secondAnswer.answer.answer}
            {"\n"}
            {this._getAnswerPercentage(secondAnswer.total, total)}
          </Text>
        </View>
      </View>
    );


    return layout;
  }

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {this.props.title}
            </Text>
            {this.props.closed == 1 && (<Text style={styles.message}>
              {translate("POLL_closed")}
            </Text>)}
          </View>
          {this._getLayoutAnswers()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
  answerLayout:{
    textAlign: 'center',
    color: Colors.white,
    fontWeight: 'bold'
  },
  header:{
    flex: 1,
    flexDirection: 'column',
  },
  title:{
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  message:{
    fontSize: 15,
    color: "red",
  },
});
