import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import './styles.module.scss';
import Switch from './';


storiesOf('Switch', module)
  .add('Switch', () => (
    <Switch value={true} onChange={action("onchange")} />
  ))
  .add('Disabled Switch', () => (
    <Switch value={true} disabled={true} onChange={action("onchange")} />
  ))
  .add('Interactive', () => (
    <SwitchWrapper initialValueState={true} />
  ))


class SwitchWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.initialValueState};
  }
  render() {
    return <Switch
      value={this.state.enabled}
      onChange={event => {
        this.setState({value: !this.state.value})
        this.props.onChange && this.props.onChange(event);
      }}
    />;
  }
}
