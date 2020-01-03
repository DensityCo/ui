import React, { Component, RefObject } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import Icons from '../icons';
import styles from './styles.module.scss';

export type InfoPopupProps = {
  infoIconColor?: string,
  singleLine?: boolean,
  horizontalIconOffset?: number,
  verticalIconOffset?: number,
  verticalPopupOffset?: number,
  popupAnchor?: 'left' | 'right' | 'center',
  popupBackground?: string,
  popupBorder?: string,
  popupPadding?: string | number,
  popupWidth?: string | number,
  target?: React.ReactNode,
  children: React.ReactNode,
};

export type InfoPopupState = {
  top: number,
  left: number,
  visible: boolean,
};

export default class InfoPopup extends Component<InfoPopupProps, InfoPopupState> {
  private icon: RefObject<HTMLSpanElement>;
  private popup: RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    this.state = {
      top: 0,
      left: 0,
      visible: false,
    };

    this.icon = React.createRef<HTMLSpanElement>();
    this.popup = React.createRef<HTMLDivElement>();

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
    if (!this.popup.current || !this.icon.current) {
      return;
    }
    const { popupAnchor = 'center', verticalPopupOffset } = this.props;
    const popupBBox = this.popup.current.getBoundingClientRect();
    const iconBBox = this.icon.current.getBoundingClientRect();

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let top = iconBBox.bottom + 3 + (verticalPopupOffset || 0);

    // Craft a "left" value that will ensure that the popup is correctly positioned.
    let left = iconBBox.left;
    if (popupAnchor === 'center') {
      left = left + (iconBBox.width / 2) - (popupBBox.width / 2);
    } else if (popupAnchor === 'right') {
      left = left - popupBBox.width + iconBBox.width;
    }

    // Attempt to handle the case of the popup going off the left edge of the screen
    if (left < 20) {
      left = 20;
    }

    // Attempt to handle the case of the popup going off the right edge of the screen
    if (left + popupBBox.width > windowWidth-20) {
      left = windowWidth - popupBBox.width - 20;
    }

    // Place the popup above the target if it is too low
    if (top + popupBBox.height > windowHeight) {
      top = iconBBox.top - popupBBox.height - 3;
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
      popupBackground,
      popupBorder,
      popupPadding,
      popupWidth,
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
        ref={this.icon}
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
            style={{
              top,
              left,
              background: popupBackground,
              border: popupBorder,
              padding: popupPadding,
              width: popupWidth,
            }}
            ref={this.popup}
          >
            {children}
          </div>
        </div>,
        document.querySelector('body') as HTMLBodyElement
      )}
    </span>;
  }
}

export const InfoPopupCardWellHighlight: React.FC<{
  target: React.ReactNode,
  children: React.ReactNode
}> = p => {
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
