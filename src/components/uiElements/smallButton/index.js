// react
import React, { Component } from 'react';

import _ from 'lodash';

// PropTypes
import PropTypes from 'prop-types';

// icons
import { Button, Icon } from 'native-base';

// styles
import styles from './styles';

class smallButton extends Component {
    componentDidMount() {
      if (!this.props.style) {
        this.props.style = {};
      }
    }

    render() {
      return (
        <Button small style={{ ...styles.buttonContainer, ...this.props.style }} onPress={this.props.onPress}>
          <Icon style={styles.arrow} name={`keyboard-arrow-${this.props.direction}`} />
        </Button>
      );
    }
}

export default smallButton;
