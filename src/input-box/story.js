import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import './styles.module.scss';
import InputBox, { InputBoxContext } from './index';
import Icon from '../icons/index';

storiesOf('InputBox', module)
  .add('Empty', () => (
    <InputBox type="text" />
  ))
  .add('type=text', () => (
    <InputBox type="text" defaultValue="foo!" />
  ))
  .add('type=password', () => (
    <InputBox type="password" placeholder="Type your password" />
  ))
  .add('type=text with icon on the left', () => (
    <InputBox type="text" leftIcon={<Icon.Search width={18} height={18} />} placeholder="Search" />
  ))
  .add('type=text with text on the left', () => (
    <InputBox type="text" leftIcon={<span>Text</span>} placeholder="Textbox here" />
  ))
  .add('type=text with a forwarded ref to the underlying input used to autofocus', () => {
    const inputRef = React.createRef();
    setTimeout(() => {
      action('Input element Ref')(inputRef);
      inputRef.current.focus();
    }, 250);
    return (
      <InputBox
        type="text"
        width={500}
        ref={inputRef}
        placeholder="Take a look at 'actions' panel to see ref"
      />
    );
  })
  .add('type=text that is invalid', () => (
    <InputBox
      type="text"
      placeholder="Hello world"
      invalid
    />
  ))
  .add('type=select', () => (
    <InputBox
      type="select"
      choices={[
        {id: 0, label: "Foo"},
        {id: 1, label: "Bar"},
        {id: 2, label: "Disabled", disabled: true},
        {id: 3, label: "Baz"},
      ]}
      onChange={action("selected")}
    />
  ))
  .add('type=select, interactive', () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);

        const choices = [
          {id: 0, label: "Foo"},
          {id: 1, label: "Bar"},
          {id: 2, label: "Disabled", disabled: true},
          {id: 3, label: "Baz"},
        ];

        this.state = {
          value: null,
          choices,
        };
      }

      render() {
        return <InputBox
          type="select"
          value={this.state.value}
          choices={this.state.choices}
          onChange={value => this.setState({value})}
        />;
      }
    }

    return <Wrapper />;
  })
  .add('type=select, disabled', () => (
    <InputBox
      type="select"
      disabled
      choices={[
        {id: 0, label: "Foo"},
        {id: 1, label: "Bar"},
        {id: 2, label: "Disabled", disabled: true},
        {id: 3, label: "Baz"},
      ]}
      onChange={action("selected")}
    />
  ))
  .add('type=select with placeholder', () => (
    <InputBox
      type="select"
      choices={[]}
      placeholder="Custom placeholder"
      onChange={action("selected")}
    />
  ))
  .add('type=select with a ton of items that scrolls inside the select area and a max height', () => (
    <InputBox
      type="select"
      choices={[
        {id: 1, label: 'foo'},
        {id: 2, label: 'foo'},
        {id: 3, label: 'foo'},
        {id: 4, label: 'foo'},
        {id: 5, label: 'foo'},
        {id: 6, label: 'foo'},
        {id: 7, label: 'foo'},
        {id: 8, label: 'foo'},
        {id: 9, label: 'foo'},
        {id: 10, label: 'foo'},
        {id: 11, label: 'foo'},
        {id: 12, label: 'foo'},
        {id: 13, label: 'foo'},
        {id: 14, label: 'foo'},
        {id: 15, label: 'foo'},
        {id: 16, label: 'foo'},
        {id: 17, label: 'foo'},
        {id: 18, label: 'foo'},
        {id: 19, label: 'foo'},
        {id: 20, label: 'foo'},
        {id: 21, label: 'foo'},
        {id: 22, label: 'foo'},
        {id: 23, label: 'foo'},
        {id: 24, label: 'foo'},
        {id: 25, label: 'foo'},
        {id: 26, label: 'foo'},
        {id: 27, label: 'foo'},
        {id: 28, label: 'foo'},
        {id: 29, label: 'foo'},
        {id: 30, label: 'foo'},
      ]}
      onChange={action("selected")}
      menuMaxHeight={500}
    />
  ))
  .add('type=select that is invalid', () => (
    <InputBox
      type="select"
      choices={[
        {id: 0, label: "Foo"},
        {id: 1, label: "Bar"},
        {id: 2, label: "Disabled", disabled: true},
        {id: 3, label: "Baz"},
      ]}
      placeholder="Select a label"
      onChange={action("selected")}
      invalid
    />
  ))
  .add('disabled box', () => (
    <InputBox disabled placeholder="I am disabled" />
  ))
  .add('disabled box with value', () => (
    <InputBox disabled value="I am disabled w/ value" />
  ))
  .add('textarea', () => (
    <InputBox type="textarea" placeholder="I am a textarea." style={{height: 300}} />
  ))
  .add('input box with custom width', () => (
    <InputBox type="text" width={300} placeholder="I am disabled" />
  ))
  .add('select box with custom width', () => (
    <InputBox type="select" width={300} />
  ))
  .add('select box with right anchor', () => (
    <InputBox
      type="select"
      choices={[
        {id: 0, label: "Foo"},
        {id: 1, label: "Bar"},
        {id: 2, label: "Disabled", disabled: true},
        {id: 3, label: "Baz"},
      ]}
      anchor="ANCHOR_RIGHT"
      width={160}
      listBoxWidth={180}
    />
  ))
  .add('select box with "LIST_VIEW" context', () => (
    <InputBoxContext.Provider value="LIST_VIEW">
      <InputBox type="select" width={300} />
    </InputBoxContext.Provider>
  ))
  .add('select box with "NAVBAR_INLINE" context', () => (
    <InputBoxContext.Provider value="NAVBAR_INLINE">
      <InputBox type="select" width={160} />
    </InputBoxContext.Provider>
  ))
  .add('select box with ANALYTICS_CONTROL_BAR context', () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);

        const choices = [
          {id: 0, label: "Foo"},
          {id: 1, label: "Bar"},
          {id: 2, label: "Disabled", disabled: true},
          {id: 3, label: "Baz"},
        ];

        this.state = {
          value: null,
          choices,
        };
      }

      render() {
        return <InputBoxContext.Provider value="ANALYTICS_CONTROL_BAR">
          <InputBox
            type="select"
            value={this.state.value}
            choices={this.state.choices}
            onChange={value => this.setState({value})}
          />
        </InputBoxContext.Provider>;
      }
    }

    return <Wrapper />;
  })
