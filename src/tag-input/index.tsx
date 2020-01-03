import React, { Fragment, Component } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import fuzzy from 'fuzzy';
import Icons from '../icons';
import InputBox from '../input-box';

const NULL_CHARACTER = String.fromCharCode(0);

export default class TagInput extends Component<any, any> {
  tagWrapper = React.createRef<any>();

  static defaultProps = {
    choices: [],
    tags: [],
    canCreateTags: true,
    onCreateNewTag: () => {},
    placeholder: 'Select a tag',
    emptyTagsPlaceholder: 'No tags',
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.defaultValue || '',
      focused: false,
      dropdownOpen: false,
      focusedTagId: null,
      focusedDropdownItemIndex: 0,
    };
  };

  blinkTag = (tagId, duration=1000) => {
    this.setState({focusedTagId: tagId}, () => {
      setTimeout(() => {
        this.setState({focusedTagId: null});
      }, duration);
    });
  }

  clearInput = e => {
    e.preventDefault(); // Stop tab jumping to next form control
    this.setState({text: '', focusedDropdownItemIndex: 0, dropdownOpen: false});
  }

  clearSelectedTag = () => {
    this.setState({focusedTagId: null});
    window.removeEventListener('click', this.clearSelectedTag);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clearSelectedTag);
  }

  render() {
    const {
      tags,
      choices,
      placeholder,
      emptyTagsPlaceholder,
      onRemoveTag,
      onAddTag,
      onCreateNewTag,
      canCreateTags,
      openDropdownOnFocus,
    } = this.props;
    const { text, focused, dropdownOpen, focusedTagId, focusedDropdownItemIndex } = this.state;

    const selectedTagIds = tags.map(t => t.id);
    const choicesNotAlreadySelected = choices.filter(c => !selectedTagIds.includes(c.id))
    const matches: any = fuzzy.filter(text, choicesNotAlreadySelected, {
      pre: NULL_CHARACTER,
      post: NULL_CHARACTER,
      extract: i => (i as any).label,
    });

    return (
      <Fragment>
        <div
          className={styles.backdrop}
          style={{display: dropdownOpen ? 'block' : 'none'}}
          onClick={e => this.setState({dropdownOpen: false})}
        />
        <div className={classnames(styles.wrapper, {[styles.aboveBackdrop]: dropdownOpen})}>
          <InputBox
            type="text"
            placeholder={placeholder}
            width="100%"

            value={text}
            onChange={e => this.setState({
              text: e.target.value,
              dropdownOpen: e.target.value.length > 0,
            })}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === 'Tab') {
                // Empty tags are not allowed
                if (text.length === 0) { return; }

                const focusedTagMatch = matches[this.state.focusedDropdownItemIndex];
                const focusedTag = focusedTagMatch ? focusedTagMatch.original : null;
                const focusedTagAlreadyInList = tags.find(
                  tag => tag.label.trim() === (focusedTag ? focusedTag.label : text).trim()
                );

                // If the tag already exists, then don't call onCreateNewTag since it's
                // already in the array once
                if (focusedTagAlreadyInList) {
                  this.clearInput(e);
                  setTimeout(() => {
                    this.blinkTag(focusedTagAlreadyInList.id);
                  }, 150);
                  return;
                }

                // As a last resort, create a brand new tag
                if (focusedDropdownItemIndex > matches.length-1) {
                  if (canCreateTags) {
                    this.clearInput(e);
                    onCreateNewTag(text.trim());
                  }
                  // If no tags can be created, then just do nothing in this case
                  return;
                }

                // If the tag is already a choice, then add it rather than creating it from a text
                // slug.
                this.clearInput(e);
                onAddTag(focusedTag);

              } else if (e.key === 'Backspace' && text.length === 0 && tags.length > 0 && !dropdownOpen) {
                window.addEventListener('click', this.clearSelectedTag);

                // Initially focus a tag
                if (!focusedTagId) {
                  this.setState({ focusedTagId: tags[tags.length-1].id });
                  return;
                }

                // Delete the last tag
                const secondToLastTag = tags[tags.length - 2];
                onRemoveTag(tags.find(t => t.id === this.state.focusedTagId));
                this.setState({
                  focusedTagId: secondToLastTag ? secondToLastTag.id : null,
                });

              } else if (e.key === 'Escape' || this.state.focusedTagId) {
                this.setState({focusedTagId: null, dropdownOpen: false});

              } else if (e.key === 'ArrowDown' && focusedDropdownItemIndex <= matches.length-1) {
                this.setState({focusedDropdownItemIndex: focusedDropdownItemIndex + 1});

              } else if (e.key === 'ArrowUp' && focusedDropdownItemIndex > 0) {
                this.setState({focusedDropdownItemIndex: focusedDropdownItemIndex - 1});

              }
            }}

            onFocus={() => {
              this.setState({
                focused: true,
                dropdownOpen: openDropdownOnFocus ? true : dropdownOpen,
              });
            }}
            onBlur={() => this.setState({focused: false})}
          />

          <div className={styles.tagWrapper} ref={this.tagWrapper}>
            {tags.map(tag => (
              <div
                key={tag.id}
                className={classnames(styles.tag, {[styles.focus]: focusedTagId === tag.id})}
                onClick={e => e.stopPropagation()}
              >
                <div className={styles.tagLabel}>
                  {tag.label}
                </div>
                <div className={styles.closeIcon} onClick={() => onRemoveTag(tag)}>
                  <Icons.Close color="#fff" />
                </div>
              </div>
            ))}
            {tags.length === 0 ? <span className={styles.noTags}>{emptyTagsPlaceholder}</span> : null}
          </div>

          {dropdownOpen ? (
            <ul className={styles.dropdown}>
              {matches.map((match, index) => (
                <li
                  key={match.original.id}
                  className={classnames(styles.dropdownItem, {
                    [styles.focused]: focusedDropdownItemIndex === index,
                  })}
                  onMouseEnter={() => this.setState({focusedDropdownItemIndex: index})}
                  onMouseLeave={e => e.stopPropagation()}
                  onClick={e => {
                    onAddTag(match.original)
                    this.clearInput(e);
                  }}
                >
                  {
                    match.string.split(NULL_CHARACTER)
                    .map((section, index) => {
                      if (index % 2 === 0) {
                        // Even indexes = keep normal
                        return (
                          <Fragment>{section}</Fragment>
                        );
                      } else {
                        // Odd indexes = highlight
                        return (
                          <strong>{section}</strong>
                        );
                      }
                    })
                    .reduce((acc, next) => <Fragment>{acc}{next}</Fragment>, null)
                  }
                </li>
              ))}
              {!matches.find(m => m.original.label.trim() === text.trim()) ? (
                canCreateTags ? (
                  <li
                    className={classnames(styles.dropdownItem, {
                      [styles.focused]: focusedDropdownItemIndex === matches.length,
                    })}
                    onMouseEnter={() => this.setState({focusedDropdownItemIndex: matches.length})}
                    onMouseLeave={e => e.stopPropagation()}
                    onClick={e => {
                      onCreateNewTag(text);
                      this.clearInput(e);
                    }}
                  >Add "{text}"</li>
                ) : (
                  matches.length === 0 ? (
                    <li className={classnames(styles.dropdownItem, styles.disabled)}>
                      Nothing found
                    </li>
                  ) : null
                )
              ) : null}
            </ul>
          ) : null}
        </div>
      </Fragment>
    );
  }
}
