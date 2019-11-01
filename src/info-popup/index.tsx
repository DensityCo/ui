import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import propTypes from 'prop-types';

import Icons from '../icons';
import styles from './styles.scss';

export default class InfoPopup extends Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      top: 0,
      left: 0,
      visible: false,
    };

    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onBodyTouch = this.onBodyTouch.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('touchstart', this.onBodyTouch);
    window.addEventListener('resize', this.onResize);
    this.onResize(); /* initially place the popup */
  }
  componentWillUnmount() {
    document.body.removeEventListener('touchstart', this.onBodyTouch);
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    if (!(this as any).popup || !(this as any).icon) {
      return;
    }
    const { verticalPopupOffset } = this.props;
    const popupBBox = (this as any).popup.getBoundingClientRect();
    const iconBBox = (this as any).icon.getBoundingClientRect();

    const windowWidth = window.innerWidth;

    let top = iconBBox.bottom + 3 + (verticalPopupOffset || 0);

    // Craft a "left" value that will ensure that the popup is centered underneath the (i).
    let left = iconBBox.left + (iconBBox.width / 2) - (popupBBox.width / 2);

    // Attempt to handle the case of the popup going off the left edge of the screen
    if (left < 20) {
      left = 20;
    }

    // Attempt to handle the case of the popup going off the right edge of the screen
    if (left + popupBBox.width > windowWidth-20) {
      left = windowWidth - popupBBox.width - 20;
    }

    // Use raw `left` / `top` values, because this popup will render in a portal
    this.setState({
      top: top,
      left: left,
    });
  }

  // When the user touches the body outside of the popup, dismiss any open popups.
  onBodyTouch(e) {
    let element = e.target;

    // Ensure the touch occured outside of the popup.
    while (element) {
      if (element.className === styles.infoPopupContainer) {
        return;
      }
      element = element.parentNode;
    }

    this.onHide();
  }

  onShow() {
    this.setState({visible: true});
  }
  onHide() {
    this.setState({visible: false});
  }

  render() {
    const {
      infoIconColor,
      singleLine,
      horizontalIconOffset,
      verticalIconOffset,
      target,
      children,
    } = this.props;
    const { top, left, visible } = this.state;

    return <span
      className={styles.infoPopupContainer}
      onMouseEnter={e => this.onShow()}
      onMouseLeave={e => this.onHide()}

      onTouchStart={e => this.onShow()}

      tabIndex={0}
      onFocus={e => this.onShow()}
      onBlur={e => this.onHide()}
      style={{transform: `translate(${horizontalIconOffset || 0}px, ${verticalIconOffset || 0}px)`}}
    >
      <span
        className={classnames(styles.infoPopupIcon, {
          [styles.infoPopupStockTarget]: !target,
          [styles.infoPopupIconVisible]: visible,
        })}
        ref={r => { (this as any).icon = r; }}
      >
        {target || <Icons.Info color={infoIconColor || 'primary'}/>}
      </span>

      {ReactDOM.createPortal(
        <div className={styles.infoPopupWrapper}>
          <div
            className={classnames(styles.infoPopupPopup, {
              [styles.infoPopupPopupVisible]: visible,
              [styles.infoPopupPopupSingleLine]: singleLine,
            })}
            style={{top, left}}
            ref={r => { (this as any).popup = r; }}
          >
            {children}
          </div>
        </div>,
        document.querySelector('body')
      )}
    </span>;
  }
}

// InfoPopup.displayName = 'InfoPopup';
// InfoPopup.propTypes = {
//   infoIconColor: propTypes.string,
//   singleLine: propTypes.bool,
//   horizontalIconOffset: propTypes.number,
//   verticalIconOffset: propTypes.number,
//   target: propTypes.node,
//   children: propTypes.node.isRequired,
// };

export const InfoPopupCardWellHighlight: React.FC<any> = p => {
  const props = Object.assign({}, p);
  const {target, children} = props;
  delete props.target;
  delete props.children;

  return (
    <InfoPopup target={<span className={styles.infoPopupCardWellHighlight}>{target}</span>} {...props}>
      {children}
    </InfoPopup>
  );
}

InfoPopupCardWellHighlight.displayName = 'InfoPopupCardWellHighlight';
InfoPopupCardWellHighlight.propTypes = {
  target: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
};
