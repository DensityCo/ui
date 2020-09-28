import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import './styles.module.scss';
import DatePicker, { DatePickerContext } from './index';

import moment from 'moment';


storiesOf('DatePicker', module)
  .add('Example usage', () => (
    <DatePicker
      date={moment.utc()}
      onChange={action('date')}
      focused={true}
      onFocusChange={action('focus change')}
      anchor="ANCHOR_LEFT"
    />
  ))
  .add('Example usage with disabled arrows', () => (
    <DatePicker
      date={moment.utc()}
      onChange={action('date')}
      focused={true}
      onFocusChange={action('focus change')}
      anchor="ANCHOR_LEFT"
      arrowRightDisabled arrowLeftDisabled
    />
  ))
  .add('Anchor to the right', () => (
    <div style={{paddingLeft: 300}}>
      <DatePicker
        date={moment.utc()}
        onChange={action('date')}
        focused={true}
        onFocusChange={action('focus change')}
        anchor="ANCHOR_RIGHT"
      />
    </div>
  ))
  .add('Passes through other props to the underlying react-dates picker', () => (
    <DatePicker
      date={moment.utc()}
      onChange={action('date')}
      focused={true}
      onFocusChange={action('focus change')}

      // Other props
      numberOfMonths={2}
      isOutsideRange={day => moment().startOf('day').diff(day) > 0}
    />
  ))
  .add('Interactive', () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = { focus: false, date: moment.utc() };
      }
      render() {
        return <DatePicker
          date={this.state.date}
          onChange={date => {
            action('date')(date);
            this.setState({date});
          }}
          focused={this.state.focus}
          arrowRightDisabled={moment(this.state.date).date() >= moment.utc().date()}
          onFocusChange={e => this.setState({focus: e.focused})}
        />;
      }
    }

    return <Wrapper />;
  })
  .add('With deprecated ANALYTICS_CONTROL_BAR context', () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = { focus: false, date: moment.utc() };
      }
      render() {
        return <DatePickerContext.Provider value="ANALYTICS_CONTROL_BAR">
          <DatePicker
            date={this.state.date}
            onChange={date => {
              action('date')(date);
              this.setState({date});
            }}
            focused={this.state.focus}
            arrowRightDisabled={moment(this.state.date).date() >= moment.utc().date()}
            onFocusChange={e => this.setState({focus: e.focused})}
          />
        </DatePickerContext.Provider>;
      }
    }

    return <Wrapper />;
  })
