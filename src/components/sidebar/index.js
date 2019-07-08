// React
import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { doLogOut } from '../../store/actions/auth_actions';

import {
  Content,
  Text,
  Container,
  Button,
  View,
} from 'native-base';

import Svg, {
  Path,
} from 'react-native-svg';

import styles from './style';

class SideBar extends Component {
  goTo = (name) => {
    this.props.close();
    this.props.navigation.navigate(name);
  }

  render() {
    return (
      <Container>
        <Content bounces={false} style={styles.content}>
          <Button style={styles.button} transparent onPress={() => { this.goTo("About") }}>
            <View style={styles.itemView}>
              <Text style={styles.text}>О ЖИЛОМ КОМПЛЕКСЕ</Text>
            </View>
          </Button>
          <Button style={styles.button} transparent onPress={() => { this.goTo("ChatForm") }}>
            <View style={styles.itemView}>
              <Text style={styles.text}>СВЯЗЬ С УК</Text>
            </View>
          </Button>
          <Button style={styles.button} transparent onPress={() => { this.goTo("Gallery") }}>
            <View style={styles.itemView}>
              <Text style={styles.text}>ГАЛЕРЕЯ</Text>
            </View>
          </Button>
          <Button style={styles.button} transparent onPress={() => { this.goTo("Contacts") }}>
            <View style={styles.itemView}>
              <Text style={styles.text}>КОНТАКТЫ</Text>
            </View>
          </Button>
          <Button style={styles.button} transparent onPress={() => { this.props.close(); this.props.doLogOut(this.props.navigation) }}>
            <View style={styles.itemView}>
              <Text style={styles.text}>ВЫХОД</Text>
            </View>
          </Button>
        </Content>
      </Container>
    );
  }
}

const actions = {
  doLogOut,
};

export default connect(null, actions)(SideBar);
