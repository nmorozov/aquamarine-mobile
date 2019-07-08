// react
import React, { Component } from 'react';
import { View, Image, TextInput, Modal } from 'react-native';

import Svg, {
  Path,
} from 'react-native-svg';

// UI
import { Button, Text } from 'native-base';

// styles
import styles from './styles';
import ThemeVariables from '../../../smart-home-theme/variables/material';

const MAX_HOUR = 23;
const MAX_MINUTE = 59;

class TopicTopPanel extends Component {
    constructor(props) {
      super(props);

      this.state = {
      };
    }

  render() {
    return (
      <View style={styles.componentContainer}>
        <View style={styles.topButtons.container}>
          <Button style={[styles.topButtons.button, styles.topButtons.bordered]}>
            <Svg width="27" height="25" viewBox="38 81 27 25">
              <Path d="M64.9793802,90.4480506 C64.9793275,90.4078099 64.9702571,90.3470307 64.9544896,90.312016 C64.9129876,90.1628639 64.8207552,90.0266203 64.6826966,89.9315058 L60.8176889,87.2689274 L60.8176889,84.4146568 C60.8176889,84.0362893 60.5080326,83.7294145 60.1262358,83.7294145 L55.6797261,83.7294145 L51.896404,81.1227551 C51.659943,80.9596494 51.3460153,80.95897 51.1088161,81.1213963 L47.3010779,83.7294145 L42.8740272,83.7294145 C42.4921249,83.7294145 42.1825741,84.0362893 42.1825741,84.4146568 L42.1825741,87.2353238 L38.298793,89.8954459 C38.1077363,90.0263067 38.004377,90.2355063 38.0011074,90.4494094 C38.0008965,90.4534334 38,90.4572485 38,90.4614293 L38.0206191,105.315751 C38.0208828,105.497461 38.0939727,105.671646 38.2237519,105.799998 C38.353373,105.928089 38.5289785,106 38.7120722,106 C38.7124414,106 38.7127051,106 38.7130215,106 L64.3094954,105.965142 C64.6912923,105.96462 65.0005267,105.657379 64.9999993,105.278959 L64.9793802,90.4480506 Z M60.8176361,88.9380821 L63.0271009,90.4598093 L60.8176361,91.982059 L60.8176361,88.9380821 Z M51.5007907,82.5192133 L53.2573727,83.7293622 L49.7340837,83.7293622 L51.5007907,82.5192133 Z M43.5654803,85.0998992 L59.4347299,85.0998992 L59.4347299,92.9348762 L54.1066598,96.6057726 L51.93432,94.935834 C51.930945,94.933221 51.9280446,94.9316009 51.924775,94.9292492 C51.681986,94.7487407 51.3385797,94.7421036 51.0866149,94.935834 L48.8985075,96.6178448 L43.5654803,92.9651874 L43.5654803,85.0998992 Z M42.1825741,88.9012383 L42.1825741,92.0180667 L39.9072968,90.4597047 L42.1825741,88.9012383 Z M39.3846992,91.7684695 L47.7520095,97.4991171 L39.4015742,103.917986 L39.3846992,91.7684695 Z M40.7355956,104.626798 L51.5104938,96.3443123 L62.2467377,104.597479 L40.7355956,104.626798 Z M55.2517339,97.4859996 L63.5983197,91.7354408 L63.6151947,103.915268 L55.2517339,97.4859996 Z M56.2921476,88 C56.6831076,88 57,88.223917 57,88.5 C57,88.776083 56.6831076,89 56.2921476,89 L46.7078524,89 C46.3170004,89 46,88.776083 46,88.5 C46,88.223917 46.3170004,88 46.7078524,88 L56.2921476,88 Z M56.2921476,92 C56.6831076,92 57,92.223917 57,92.5 C57,92.776083 56.6831076,93 56.2921476,93 L46.7078524,93 C46.3170004,93 46,92.776083 46,92.5 C46,92.223917 46.3170004,92 46.7078524,92 L56.2921476,92 Z" id="envelop" fill={ThemeVariables.mainApplicationColor}></Path>
            </Svg>
            <Text style={styles.topButtons.text}>ЗАКРЫТЬ{'\n'}ВОПРОС</Text>
          </Button>
          <Button style={[styles.topButtons.button, styles.topButtons.bordered]}>
            <Svg width="26" height="25" viewBox="3 0 27 26">
              <Path d="M17.8513408,0.117699483 C17.6191666,-0.039233161 17.3148984,-0.039233161 17.0827242,0.117699483 L4.31819937,8.74816533 C4.10732129,8.88217181 3.98593721,9.12019944 4.00130351,9.36958104 C4.01666981,9.61896263 4.16635807,9.84028743 4.39209277,9.94739088 C4.61782747,10.0544943 4.88393485,10.0304504 5.08681592,9.88461981 L6.62404903,8.8442424 L6.62404903,22.5311071 L5.04564004,22.5311071 C4.66662647,22.5311071 4.35937526,22.8383583 4.35937526,23.2173719 C4.35937526,23.5963855 4.35937526,25.166332 4.39209277,25.166332 L30.5419723,25.166332 C30.5419723,25.166332 30.5746898,23.5963855 30.5746898,23.2173719 C30.5746898,22.8383583 30.2674386,22.5311071 29.888425,22.5311071 L28.310016,22.5311071 L28.310016,8.84698746 L29.8472491,9.88736487 C30.0501302,10.0331955 30.3162376,10.0572394 30.5419723,9.95013594 C30.767707,9.84303249 30.9173952,9.62170769 30.9327615,9.37232609 C30.9481278,9.1229445 30.8267438,8.88491687 30.6158657,8.75091039 L17.8513408,0.117699483 Z M23.712042,22.5311071 L11.222023,22.5311071 L11.222023,10.6614715 C11.222023,10.5580906 11.263091,10.4589438 11.3361923,10.3858424 C11.4092937,10.3127411 11.5084405,10.2716731 11.6118214,10.2716731 L23.3222436,10.2716731 C23.4256246,10.2716731 23.5247713,10.3127411 23.5978727,10.3858424 C23.6709741,10.4589438 23.712042,10.5580906 23.712042,10.6614715 L23.712042,22.5311071 Z M26.9374865,22.5311071 L25.0845716,22.5311071 L25.0845716,10.6614715 C25.0845716,9.68816468 24.2955505,8.89914358 23.3222436,8.89914358 L11.6118214,8.89914358 C10.6385146,8.89914358 9.84949348,9.68816468 9.84949348,10.6614715 L9.84949348,22.5311071 L7.99657858,22.5311071 L7.99657858,7.91915748 L17.4670325,1.52042469 L26.9374865,7.91915748 L26.9374865,22.5311071 Z M21.389722,15.7947321 C21.7687356,15.7947321 22.0759868,16.1019833 22.0759868,16.4809969 C22.0759868,16.8600104 21.7687356,17.1672616 21.389722,17.1672616 L13.5443431,17.1672616 C13.1653295,17.1672616 12.8580783,16.8600104 12.8580783,16.4809969 C12.8580783,16.1019833 13.1653295,15.7947321 13.5443431,15.7947321 L21.389722,15.7947321 Z M21.389722,12.4100742 L21.389722,12.4100742 C21.7687356,12.4100742 22.0759868,12.7173254 22.0759868,13.096339 C22.0759868,13.4753525 21.7687356,13.7826037 21.389722,13.7826037 L13.5443431,13.7826037 C13.1653295,13.7826037 12.8580783,13.4753525 12.8580783,13.096339 C12.8580783,12.7173254 13.1653295,12.4100742 13.5443431,12.4100742 L21.389722,12.4100742 Z M21.389722,19.2040955 L21.389722,19.2040955 C21.7687356,19.2040955 22.0759867,19.5113467 22.0759867,19.8903603 C22.0759867,20.2693738 21.7687356,20.576625 21.389722,20.5766251 L13.5443431,20.5766251 C13.1653295,20.5766251 12.8580783,20.2693738 12.8580783,19.8903603 C12.8580783,19.5113467 13.1653295,19.2040955 13.5443431,19.2040955 L21.389722,19.2040955 Z" fill={ThemeVariables.mainApplicationColor} />
            </Svg>
            <Text style={styles.topButtons.text}>ОТВЕТИТЬ</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default TopicTopPanel;
