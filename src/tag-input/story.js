import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import moment from 'moment';

import './styles.module.scss';
import TagInput from './index';
import DateRangePicker from '../date-range-picker/index';

storiesOf('TagInput', module)
  .add('Default', () => (
    <TagInput
      choices={[
        // These are the choices that show up in the menu when the user types
        { id: 123, label: 'foo' },
        { id: 456, label: 'bar' },
        { id: 789, label: 'baz' },
        { id: 1, label: 'study: boston' },
        { id: 2, label: 'study: nyc' },
        { id: 3, label: 'study: grand forks' },
      ]}
      tags={[
        { id: 123, label: 'foo' },
        { id: 456, label: 'bar' },
      ]}
      placeholder="Start typing to add a tag"
      emptyTagsPlaceholder="There are no tags added to this space yet"
      onCreateNewTag={action('onCreateNewTag')}
      onAddTag={tag => action('onAddTag')}
      onRemoveTag={tag => action('onRemoveTag')}
    />
  ))
  .add('Interactive', () => {
    function Wrapper() {
      const [tags, setTags] = useState([
        { id: 123, label: 'foo' },
        { id: 456, label: 'bar' },
      ]);

      return (
        <TagInput
          choices={[
            // These are the choices that show up in the menu when the user types
            { id: 123, label: 'foo' },
            { id: 456, label: 'bar' },
            { id: 789, label: 'baz' },
            { id: 1, label: 'study: boston' },
            { id: 2, label: 'study: nyc' },
            { id: 3, label: 'study: grand forks' },
          ]}
          tags={tags}
          placeholder="Start typing to add a tag"
          emptyTagsPlaceholder="There are no tags added to this space yet"
          onCreateNewTag={text => setTags([...tags, {id: Math.random().toString(), label: text}])}
          onAddTag={tag => setTags([...tags, tag])}
          onRemoveTag={tag => setTags(tags.filter(i => i.id !== tag.id))}
        />
      );
    }

    return (
      <Wrapper />
    );
  })
  .add('With popup always showing when text field is focused', () => (
    <TagInput
      choices={[
        // These are the choices that show up in the menu when the user types
        { id: 123, label: 'foo' },
        { id: 456, label: 'bar' },
        { id: 789, label: 'baz' },
        { id: 1, label: 'study: boston' },
        { id: 2, label: 'study: nyc' },
        { id: 3, label: 'study: grand forks' },
      ]}
      tags={[
        { id: 123, label: 'foo' },
        { id: 456, label: 'bar' },
      ]}
      placeholder="Start typing to add a tag"
      emptyTagsPlaceholder="There are no tags added to this space yet"
      canCreateTags={false}
      // onCreateNewTag prop not required
      openDropdownOnFocus={true}
      onAddTag={tag => action('onAddTag')}
      onRemoveTag={tag => action('onRemoveTag')}
    />
  ))
  .add('With "Add new tag" option removed / tag creation disabled', () => (
    <TagInput
      choices={[
        // These are the choices that show up in the menu when the user types
        { id: 123, label: 'foo' },
        { id: 456, label: 'bar' },
        { id: 789, label: 'baz' },
        { id: 1, label: 'study: boston' },
        { id: 2, label: 'study: nyc' },
        { id: 3, label: 'study: grand forks' },
      ]}
      tags={[
        { id: 123, label: 'foo' },
        { id: 456, label: 'bar' },
      ]}
      placeholder="Start typing to add a tag"
      emptyTagsPlaceholder="There are no tags added to this space yet"
      canCreateTags={false}
      // onCreateNewTag prop not required
      onAddTag={tag => action('onAddTag')}
      onRemoveTag={tag => action('onRemoveTag')}
    />
  ))
  .add('Interactive version of "Add new tag" option removed / tag creation disabled', () => {
    function Wrapper() {
      const [tags, setTags] = useState([
        { id: 123, label: 'foo' },
        { id: 456, label: 'bar' },
      ]);

      return (
        <TagInput
          choices={[
            // These are the choices that show up in the menu when the user types
            { id: 123, label: 'foo' },
            { id: 456, label: 'bar' },
            { id: 789, label: 'baz' },
            { id: 1, label: 'study: boston' },
            { id: 2, label: 'study: nyc' },
            { id: 3, label: 'study: grand forks' },
          ]}
          tags={tags}
          canCreateTags={false}
          placeholder="Start typing to add a tag"
          emptyTagsPlaceholder="There are no tags added to this space yet"
          openDropdownOnFocus
          onCreateNewTag={text => setTags([...tags, {id: Math.random().toString(), label: text}])}
          onAddTag={tag => setTags([...tags, tag])}
          onRemoveTag={tag => setTags(tags.filter(i => i.id !== tag.id))}
        />
      );
    }

    return <Wrapper />;
  })
  .add('Should not be on top of date picker when date picker is opened', () => (
    <Fragment>
      <p>
        The date picker, when opened, should show over top of the tag input.
      </p>
      <DateRangePicker
        focusedInput="startDate"
        startDate={moment.utc()}
        endDate={moment.utc().subtract(1, 'day')}
      />
      <br/>
      <TagInput
        choices={[
          // These are the choices that show up in the menu when the user types
          { id: 123, label: 'foo' },
          { id: 456, label: 'bar' },
          { id: 789, label: 'baz' },
          { id: 1, label: 'study: boston' },
          { id: 2, label: 'study: nyc' },
          { id: 3, label: 'study: grand forks' },
        ]}
        tags={[
          { id: 123, label: 'foo' },
          { id: 456, label: 'bar' },
        ]}
        placeholder="Start typing to add a tag"
        emptyTagsPlaceholder="There are no tags added to this space yet"
        onCreateNewTag={action('onCreateNewTag')}
        onAddTag={tag => action('onAddTag')}
        onRemoveTag={tag => action('onRemoveTag')}
      />
    </Fragment>
  ))
