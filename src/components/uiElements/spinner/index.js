import React from 'react';
import { Spinner } from 'native-base';
import ThemeVariables from '../../../../smart-home-theme/variables/material';

const spinner = () => <Spinner animating color={ThemeVariables.mainApplicationColor} />;

export default spinner;
