// react
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Svg, {
  Path,
  G,
} from 'react-native-svg';

// UI
import { Button, Text } from 'native-base';

// styles
import styles from './styles';
import ThemeVariables from '../../../smart-home-theme/variables/material';

import { openSmartGate } from '../../store/actions/smart_gate_actions';

const MAX_HOUR = 23;
const MAX_MINUTE = 59;

class HomeTopPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  onPressGate() {
    this.props.openSmartGate();
  }

  render() {
    return (
      <View style={styles.componentContainer}>
        <View style={styles.topButtons.container}>
          <Button
            style={[styles.topButtons.button, styles.topButtons.bordered]}
            onPress={() => {
              this.props.navigation.navigate('NumberGate');
            }}
          >
            {/*<Svg width="18" height="25" viewBox="0 0 18 25">
              <Path d="M15.0514791,9.60774905 L15.0514791,5.94765414 C15.051479,2.66285545 12.3421396,5.41802885e-16 9,0 C5.65786044,0 2.948521,2.66285545 2.94852095,5.94765414 L2.94852095,9.58334841 C2.94852095,9.58334841 2.94852095,9.58334841 2.94852095,9.60774905 C0.196053266,12.0653329 -0.735057188,15.9336812 0.605275631,19.3428872 C1.94560845,22.7520933 5.28133073,25 9,25 C12.7186693,25 16.0543915,22.7520933 17.3947244,19.3428872 C18.7350572,15.9336812 17.8039467,12.0653329 15.0514791,9.60774905 Z M4.8105145,5.94765414 C4.81051455,3.67356275 6.68621108,1.83004745 9,1.83004745 C11.3137889,1.83004745 13.1894854,3.67356275 13.1894855,5.94765414 L13.1894855,8.32061567 C10.5680299,6.96003283 7.43197005,6.96003283 4.8105145,8.32061567 L4.8105145,5.94765414 Z M9,23.1745008 C5.0579892,23.1745008 1.86235804,20.0336969 1.86235804,16.1593189 C1.86235804,12.2849409 5.0579892,9.14413703 9,9.14413703 C12.9420108,9.14413703 16.137642,12.2849409 16.137642,16.1593189 C16.137642,18.0198609 15.3856426,19.8041998 14.047075,21.1198016 C12.7085075,22.4354034 10.8930203,23.1745008 9,23.1745008 Z M9,15.5581174 C8.44771525,15.5581174 8,16.0058326 8,16.5581174 L8,18.5581174 C8,19.1104021 8.44771525,19.5581174 9,19.5581174 C9.55228475,19.5581174 10,19.1104021 10,18.5581174 L10,16.5581174 C10,16.0058326 9.55228475,15.5581174 9,15.5581174 Z" id="lock_1" fill={ThemeVariables.mainApplicationColor}></Path>
            </Svg>
            <Text style={styles.topButtons.text}>ПОСТАВИТЬ{'\n'}НА ОХРАНУ</Text>*/}
            <Svg width="27" height="25" viewBox="0 0 86 64">
              <Path d="M85.385,22.052 L85.385,20.961 C85.385,18.053 83.019,15.687 80.111,15.687 C79.965,15.687 79.819,15.703 79.677,15.735 C79.622,15.747 78.054,16.092 75.452,16.582 L69.636,3.496 C69.363,2.882 68.8,2.446 68.137,2.336 C67.564,2.239 53.994,0 42.423,0 C30.837,0 18.36,2.244 17.834,2.34 C17.183,2.458 16.633,2.891 16.364,3.495 L10.549,16.581 C7.946,16.091 6.378,15.747 6.323,15.735 C6.181,15.703 6.035,15.687 5.889,15.687 C2.981,15.687 0.615,18.053 0.615,20.961 L0.615,22.052 C0.615,24.56 2.374,26.664 4.723,27.197 L2.507,32.367 C2.401,32.616 2.345,32.885 2.345,33.155 L2.345,48.155 C2.345,48.462 2.436,48.744 2.562,49.008 C2.429,49.479 2.345,49.964 2.345,50.463 L2.345,58.539 C2.345,61.551 4.795,64.001 7.806,64.001 L15.883,64.001 C18.894,64.001 21.344,61.551 21.344,58.539 L21.344,53.939 C27.928,55.029 35.72,55.924 43.575,55.924 C51.118,55.924 58.44,55.099 64.652,54.068 L64.652,58.539 C64.652,61.551 67.102,64.001 70.114,64.001 L78.191,64.001 C81.202,64.001 83.652,61.551 83.652,58.539 L83.652,50.463 C83.652,49.965 83.568,49.48 83.435,49.008 C83.561,48.744 83.652,48.462 83.652,48.155 L83.652,33.155 C83.652,32.884 83.597,32.616 83.49,32.367 L81.274,27.197 C83.625,26.664 85.385,24.56 85.385,22.052 Z M19.585,6.099 C22.821,5.563 33.078,4 42.423,4 C51.844,4 62.989,5.588 66.422,6.113 L71.396,17.306 C64.118,18.54 53.137,20.052 43,20.052 C32.869,20.052 21.885,18.54 14.605,17.306 L19.585,6.099 Z M17.346,58.538 C17.346,59.344 16.69,60 15.885,60 L7.808,60 C7.002,60 6.347,59.344 6.347,58.538 L6.347,50.773 C8.715,51.389 12.571,52.322 17.347,53.228 L17.347,58.538 L17.346,58.538 Z M78.192,60 L70.115,60 C69.309,60 68.653,59.344 68.653,58.538 L68.653,53.351 C73.443,52.428 77.284,51.458 79.6530011,50.811 L79.653,58.538 C79.654,59.344 78.998,60 78.192,60 Z M81.385,22.052 C81.385,22.755 80.813,23.326 80.111,23.326 C79.937,23.326 79.763,23.348 79.594,23.394 C79.575,23.399 79.026,23.544 78.018,23.779 C77.442,23.914 76.954,24.296 76.687,24.824 C76.419,25.352 76.4,25.971 76.633,26.515 L79.654,33.564 L79.654,46.654 C75.018,47.957 59.591,51.923 43.577,51.923 C27.489,51.923 11.186,47.922 6.346,46.631 L6.346,33.564 L9.367,26.515 C9.6,25.971 9.58,25.352 9.313,24.824 C9.046,24.296 8.559,23.914 7.982,23.779 C6.974,23.545 6.425,23.399 6.406,23.394 C6.238,23.348 6.064,23.326 5.889,23.326 C5.186,23.326 4.615,22.755 4.615,22.052 L4.615,20.961 C4.615,20.315 5.098,19.779 5.723,19.697 C8.234,20.241 26.412,24.051 42.999,24.051 C59.586,24.051 77.765,20.24 80.276,19.697 C80.901,19.779 81.384,20.314 81.384,20.961 L81.384,22.052 L81.385,22.052 Z M16.462,31.154 C12.814,31.154 9.846,34.122 9.846,37.769 C9.846,41.416 12.814,44.384 16.462,44.384 C20.109,44.384 23.077,41.416 23.077,37.769 C23.077,34.122 20.109,31.154 16.462,31.154 Z M16.462,40.385 C15.02,40.385 13.846,39.212 13.846,37.77 C13.846,36.328 15.019,35.155 16.462,35.155 C17.904,35.155 19.077,36.328 19.077,37.77 C19.077,39.212 17.904,40.385 16.462,40.385 Z M69.538,31.154 C65.891,31.154 62.923,34.122 62.923,37.769 C62.923,41.416 65.891,44.384 69.538,44.384 C73.185,44.384 76.153,41.416 76.153,37.769 C76.153,34.122 73.186,31.154 69.538,31.154 Z M69.538,40.385 C68.096,40.385 66.923,39.212 66.923,37.77 C66.923,36.328 68.096,35.155 69.538,35.155 C70.98,35.155 72.153,36.328 72.153,37.77 C72.153,39.212 70.98,40.385 69.538,40.385 Z M56.846,33.462 C57.95,33.462 58.846,34.358 58.846,35.462 C58.846,36.566 57.95,37.462 56.846,37.462 L29.154,37.462 C28.05,37.462 27.154,36.566 27.154,35.462 C27.154,34.358 28.05,33.462 29.154,33.462 L56.846,33.462 Z M56.846,41.538 C57.95,41.538 58.846,42.434 58.846,43.538 C58.846,44.642 57.95,45.538 56.846,45.538 L29.154,45.538 C28.05,45.538 27.154,44.642 27.154,43.538 C27.154,42.434 28.05,41.538 29.154,41.538 L56.846,41.538 Z" id="envelop" fill={ThemeVariables.mainApplicationColor}></Path>
            </Svg>
            <Text style={styles.topButtons.text} >ДОБАВИТЬ{'\n'}НОМЕР</Text>
          </Button>
          <Button style={[styles.topButtons.button, styles.topButtons.bordered]}>
            <Svg width="25" height="25" viewBox="0 0 20 21">
              <G transform="translate(10, -11)">
                <Path d="M15,5 C9.48373306,5 5,9.483725 5,15 C5,20.5162778 9.48373333,25 15,25 C20.5162667,25 25,20.5162778 25,15 C25,9.483725 20.5162669,5 15,5 Z M15,6.55555556 C19.6699892,6.55555556 23.4444444,10.3300032 23.4444444,15 C23.4444444,19.6699889 19.6699894,23.4444444 15,23.4444444 C10.3300106,23.4444444 6.55555556,19.6699889 6.55555556,15 C6.55555556,10.3300032 10.3300108,6.55555556 15,6.55555556 Z M10.7824398,12.000949 C10.3374958,12.0428837 9.99808111,12.4174102 10.0000082,12.8643218 L10.0000082,17.3917579 C10.0000558,17.8685658 10.3865731,18.255083 10.863381,18.2551307 L15.0327899,18.2551307 C15.3441532,18.2595341 15.6337676,18.0959461 15.7907343,17.8270075 C15.947701,17.558069 15.947701,17.2254467 15.7907343,16.9565082 C15.6337676,16.6875697 15.3441532,16.5239816 15.0327899,16.5283851 L11.7267538,16.5283851 L11.7267538,13.7276946 L18.3809951,13.7276946 L18.3809951,17.3917579 C18.3765917,17.7031211 18.5401797,17.9927356 18.8091182,18.1497023 C19.0780568,18.3066689 19.4106791,18.3066689 19.6796176,18.1497023 C19.9485561,17.9927356 20.1121442,17.7031211 20.1077407,17.3917579 L20.1077407,12.8643218 C20.1076931,12.3875139 19.7211758,12.0009966 19.2443679,12.000949 L10.863381,12.000949 C10.8364154,11.9996837 10.8094053,11.9996837 10.7824398,12.000949 Z" id="open_1" transform="rotate(45.000000)" fill={ThemeVariables.mainApplicationColor} />
              </G>
            </Svg>
            <Text
              style={styles.topButtons.text}
              onPress={() => this.onPressGate()}>ОТКРЫТЬ{'\n'}ВОРОТА</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const actions = {
  openSmartGate,
};

export default connect(null, actions)(HomeTopPanel);