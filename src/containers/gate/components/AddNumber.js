// React
import React, { Component } from 'react';
import {
  Picker,
  TextInput,
  View
} from 'react-native';

import Dialog, {
  SlideAnimation,
  DialogTitle,
  DialogButton,
  DialogContent
} from 'react-native-popup-dialog';

import styles from './../styles'

// Own const
import {
  ALLOW_CHAR,
  NUM_UNALTERED
} from './../const';

class AddNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstChars: 'A',
      secondChars1: 'A',
      secondChars2: 'A',
      digits: '',
      regionDigits: '',
      visible: this.props.visiblePopUp,
      text: '',
      type: NUM_UNALTERED,
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ visible: newProps.visiblePopUp });
  }

  showItems (data) {
    return data.map((item, index) => {
      return (
        <Picker.Item key={index} label={item} value={item} />
      );
    })
  }

  addNum() {
    if (
      this.state.digits.length === 3
      && this.state.regionDigits.length >= 2
    ) {
      this.props.updateData(this.state.type, -1, {
        firstChars: this.state.firstChars,
        digits: this.state.digits,
        secondChars: this.state.secondChars1 + this.state.secondChars2,
        regionDigits: this.state.regionDigits
      });
      this.props.close();
    }
  }

  onChangeText(text) {
    this.setState({text});
  }

  render() {
    return (
      <View style={styles.container}>
        <Dialog
          visible={this.state.visible}
          actions={[
            <DialogButton
              key="CANCEL"
              text="CANCEL"
              onPress={() => {
                this.props.close();
              }}
            />,
            <DialogButton
              key="OK"
              text="OK"
              onPress={() => {
                this.addNum();
              }}
            />,
          ]}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          dialogTitle={<DialogTitle title="Добавление номера"/>}
        >
          <DialogContent style={{height: 100}}>
            <View style={styles.numberContainer}>
              <Picker
                selectedValue={this.state.firstChars}
                style={{ height: 40, width: 80 }}
                onValueChange={firstChars => this.setState({firstChars})}>
                {this.showItems(ALLOW_CHAR)}
              </Picker>
              <TextInput
                style={{height: 40, width: 80, borderColor: 'gray', borderWidth: 1}}
                keyboardType='numeric'
                // onChangeText={this.onChangeText}
                onChangeText={digits => this.setState({ digits })}
                value={this.state.digits}
                maxLength={3}
              />
              <Picker
                selectedValue={this.state.secondChars1}
                style={{ height: 40, width: 80 }}
                onValueChange={secondChars1 => this.setState({secondChars1})}>
                {this.showItems(ALLOW_CHAR)}
              </Picker>
              <Picker
                selectedValue={this.state.secondChars2}
                style={{ height: 40, width: 80 }}
                onValueChange={secondChars2 => this.setState({secondChars2})}>
                {this.showItems(ALLOW_CHAR)}
              </Picker>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                keyboardType='numeric'
                onChangeText={regionDigits => this.setState({ regionDigits })}
                value={this.state.regionDigits}
                maxLength={3}
              />
            </View>
            <View style={styles.block}>
              <Picker
                selectedValue={this.state.type}
                style={{ height: 40, width: 200 }}
                onValueChange={type => this.setState({type})}>
                <Picker.Item label={'Постоянные'} value={'numUnaltered'} />
                <Picker.Item label={'Временные'} value={'numTemporary'} />
              </Picker>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}

export default AddNumber;