import React, { Fragment, Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Modal from './index';
import AppBar, { AppBarTitle, AppBarSection } from '../app-bar/index';
import Button from '../button/index';
import fontVariables from '../../variables/fonts.json';

class ModalTriggerer extends Component {
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
        <Button onClick={this.show}>Open modal</Button>
        {['TRANSITION_TO_VISIBLE', 'VISIBLE', 'TRANSITION_TO_HIDDEN'].includes(this.state.view) ?
            this.props.children(this.state.view === 'VISIBLE', this.hide) : null}
      </Fragment>
    );
  }
}

storiesOf('Modal', module)
  .add('Modal with app bar', () => (
    <ModalTriggerer children={(visibility, hide) => (
      <Modal visible={visibility}>
        <AppBar>
          <AppBarTitle>
            My title
          </AppBarTitle>
          <AppBarSection>
            <Button type="primary" onClick={hide}>Close</Button>
          </AppBarSection>
        </AppBar>
      </Modal>
    )} />
  ))
  .add('Modal with fixed size', () => (
    <ModalTriggerer children={(visibility, hide) => (
      <Modal width={500} height={300} visible={visibility}>
        <AppBar>
          <AppBarTitle>
            Foo
          </AppBarTitle>
          <AppBarSection>
            <Button type="primary" onClick={hide}>Close</Button>
          </AppBarSection>
        </AppBar>
      </Modal>
    )} />
  ))
  .add('Modal with onBlur handler', () => (
    <ModalTriggerer children={(visibility, hide) => (
      <Modal width={500} height={300} visible={visibility} onBlur={action('onBlur')}>
        <AppBar>
          <AppBarTitle>
            Foo
          </AppBarTitle>
          <AppBarSection>
            <Button type="primary" onClick={hide}>Close</Button>
          </AppBarSection>
        </AppBar>

        <p style={{fontFamily: fontVariables.fontBase}}>Click on the backdrop!</p>
      </Modal>
    )} />
  ))
  .add('Modal with onEscape handler', () => (
    <ModalTriggerer children={(visibility, hide) => (
      <Modal width={500} height={300} visible={visibility} onEscape={action('onEscape')}>
        <AppBar>
          <AppBarTitle>
            Foo
          </AppBarTitle>
          <AppBarSection>
            <Button type="primary" onClick={hide}>Close</Button>
          </AppBarSection>
        </AppBar>

        <p style={{fontFamily: fontVariables.fontBase}}>Press escape!</p>
      </Modal>
    )} />
  ))
  .add('Modal that overflows the vertical height', () => (
    <ModalTriggerer children={(visibility, hide) => (
      <Modal width={500} height={'150vh'} visible={visibility}>
        <p style={{fontFamily: fontVariables.fontBase}}>Really tall modal</p>
        <Button type="primary" onClick={hide}>Close</Button>
      </Modal>
    )} />
  ))
