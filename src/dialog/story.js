import React, { Fragment, Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ConfirmDialog, AlertDialog, PromptDialog } from '.';
import { Button, ButtonGroup, Icons } from '..';

class DialogTriggerer extends Component {
  state = {
    view: 'HIDDEN', /* 'TRANSITION_TO_VISIBLE', 'VISIBLE', 'TRANSITION_TO_HIDDEN' */
  }

  show = () => {
    this.setState({view: 'TRANSITION_TO_VISIBLE'}, () => {
      this.setState({view: 'VISIBLE'});
    });
  }

  hide = () => {
    this.setState({view: 'TRANSITION_TO_HIDDEN'}, () => {
      setTimeout(() => {
        this.setState({view: 'HIDDEN'});
      }, 500);
    });
  }

  render() {
    return (
      <Fragment>
        <Button onClick={this.show}>Open dialog</Button>
        {['TRANSITION_TO_VISIBLE', 'VISIBLE', 'TRANSITION_TO_HIDDEN'].includes(this.state.view) ?
            this.props.children(this.state.view === 'VISIBLE', this.hide) : null}
      </Fragment>
    );
  }
}

storiesOf('Dialog / Alert', module)
  .add('Alert Dialog', () => (
    <DialogTriggerer children={(visibility, hide) => (
      <AlertDialog
        prompt="You have clicked a button. Congratulations!"
        onSubmit={hide}
        onDismiss={hide}
        visible={visibility}
      />
    )} />
  ))
  .add('Alert Dialog (with custom title and confirm text)', () => (
    <DialogTriggerer children={(visibility, hide) => (
      <AlertDialog
        title="Fancy Title"
        prompt="You have clicked a button. Congratulations!"
        confirmText="Yay me!"
        onSubmit={hide}
        onDismiss={hide}
        visible={visibility}
      />
    )} />
  ))

storiesOf('Dialog / Confirm', module)
  .add('Confirm Dialog', () => (
    <DialogTriggerer children={(visibility, hide) => (
      <ConfirmDialog
        prompt="Do you like web development?"
        onSubmit={hide}
        onDismiss={hide}
        visible={visibility}
      />
    )} />
  ))
  .add('Confirm Dialog (with custom title and confirm text)', () => (
    <DialogTriggerer children={(visibility, hide) => (
      <ConfirmDialog
        title="Save changes"
        prompt="Would you like to leave without saving?"
        confirmText="Leave"
        onSubmit={hide}
        onDismiss={hide}
        visible={visibility}
      />
    )} />
  ))

storiesOf('Dialog / Prompt', module)
  .add('Prompt Dialog', () => (
    <DialogTriggerer children={(visibility, hide) => (
      <PromptDialog
        prompt="What is your favorite ice cream?"
        onSubmit={result => {
          console.log('Favorite ice cream:', result);
          hide();
        }}
        onDismiss={hide}
        visible={visibility}
      />
    )} />
  ))
  .add('Confirm Dialog (with custom title, confirm text, placeholder, and left icon)', () => (
    <DialogTriggerer children={(visibility, hide) => (
      <PromptDialog
        title="Favorite ice cream"
        prompt="What is your favorite ice cream?"
        confirmText="Give me some!"
        placeholder="ex: Chocolate"
        leftIcon={<Icons.Soup />}
        onSubmit={result => {
          console.log('Favorite ice cream:', result);
          hide();
        }}
        onDismiss={hide}
        visible={visibility}
      />
    )} />
  ))
