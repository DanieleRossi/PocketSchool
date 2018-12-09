import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator} from 'react-native';

import GetJSON from '../Utility/GetJSON';
import Colors from '../Utility/Colors';
import translate from "../Utility/Languages";

let poll_id;

export default class PollScreen extends React.Component {

  static navigationOptions = {
    title: translate('POLL_details_title'),
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.white,
  };

  constructor(props) {
    super(props);
    poll_id = this.props.navigation.getParam('poll_id', -1);
    this.state = {
      data: {},
      loading: true
    };
  }

  componentDidMount(){
    var request = new GetJSON("https://pocketschool.altervista.org/api/api.php",
    function(data){
      var poll = data.data;
      console.log(poll);
      this.setState({data: poll, loading:false});
    }.bind(this));

    this.setState({loading:true});

    request.getData({
      action: "getPoll",
      data: {
        user_id: 1,
        poll_id: poll_id,
      }
    });
  }

  _votePoll(answer_id){
    var request = new GetJSON("https://pocketschool.altervista.org/api/api.php",
    function(data){
      console.log(data.data);
    }.bind(this));

    request.getData({
      action: "_votePoll",
      data: {
        user_id: 1,
        poll_id: poll_id,
        answer_id: answer_id,
      }
    });
  }

  _getAnswerPercentage(count, total){
    return Math.round((count*100)/total) + "%";
  }

  getUserAnswer(){
    if(this.state.data.user != undefined && this.state.data.user.vote){
      return (
        <View>
          <Text>
            {translate('POLL_DETAILS_user_vote')}: {this.state.data.user.answer}
          </Text>
        </View>
      );
    }
  }

  getVoteButttons(){
    if(this.state.data.user != undefined && !this.state.data.user.vote){
      var buttons = [];
      var answers = this.state.data.answers;
      for (var i = 0; i < answers.length; i++) {
        buttons[i] = (
          <Button onClick={this._votePoll(answers[i].answer.answer_id)}>
            {answers[i].answer.answer}
          </Button>
        );
      }

      return (
        <View>
          {buttons[0]}
          {buttons[1]}
        </View>
      );
    }
  }

  getLayoutAnswer(){
    var answers = this.state.data.answers;
    if(answers != undefined){
      var total = parseInt(answers[0].total) + parseInt(answers[1].total);
      var firstAnswer = answers[0];
      var secondAnswer = answers[1];
      var first, second;
      first = (
        <View style={styles.horizontal}>
          <View style={{backgroundColor: Colors.primaryLight,
                        width: this._getAnswerPercentage(firstAnswer.total, total)}}>
            <Text style={styles.answerLayout}>
              {firstAnswer.answer.answer} {firstAnswer.total}
            </Text>
          </View>
          <View style={{backgroundColor: Colors.lightGrey,
                        width: this._getAnswerPercentage((total - firstAnswer.total), total)}}>
          </View>
        </View>
      );

      second = (
        <View style={styles.horizontal}>
          <View style={{backgroundColor: Colors.primaryDark,
                        width: this._getAnswerPercentage(secondAnswer.total, total)}}>
            <Text style={styles.answerLayout}>
              {secondAnswer.answer.answer} {secondAnswer.total}
            </Text>
          </View>
          <View style={{backgroundColor: Colors.lightGrey,
                        width: this._getAnswerPercentage((total - secondAnswer.total), total)}}>
          </View>
        </View>
      );

      return (
        <View>
          {first}
          {second}
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
            {this.state.loading && (<ActivityIndicator
              size="large"
              color="#0000ff"
            />
            )}
            <View style={styles.header}>
              <Text style={styles.title}>
                {this.state.data.question}
              </Text>
              <Text>
                {this.state.data.description}
              </Text>
            </View>
            {this.getUserAnswer()}
            {this.getLayoutAnswer()}
            {this.getVoteButttons()}

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
  answerLayout:{
    textAlign: 'center',
    color: Colors.white,
    fontWeight: 'bold',
    padding: 10,
  },
});
