import * as uuid from 'uuid';
import React, { Component } from 'react';
import classnames from 'classnames';

import './styles.scss';

export default function Card({type, style, className, children}) {
  return <div
    className={classnames('card', type ? `card-${type}` : null, className)}
    style={style}
  >{children}</div>;
}

export function CardBody({children, className}) {
  return <div className={classnames('card-body', className)}>{children}</div>;
}

export function CardHeader({children, size, className, onClick}) {
  return <div
      className={classnames('card-header', `card-header-${size || 'base'}`, className)}
      onClick={onClick}
    >{children}</div>;
}

export function CardWell({children, type, className}) {
  return <div className={classnames('card-well', `card-well-${type}`, className)}>{children}</div>;
}
export function CardWellHighlight({children, className}) {
  return <span className={classnames('card-well-highlight', className)}>
    {children}
  </span>;
}

export function CardLoading({indeterminate, percent, className}) {
  return <div className="card-loading-wrapper">
    <div className={classnames(
      'card-loading',
      indeterminate ? `card-loading-indeterminate` : null,
      className
    )} style={{width: `${percent}%`}} />
  </div>
}

export class CardTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeftArrow: false,
      showRightArrow: false,
    };

    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    const container = this.container.getBoundingClientRect();
    const table = this.table.getBoundingClientRect();

    let showLeftArrow = table.width > container.width && table.left < container.left;
    let showRightArrow = table.width > container.width && table.right > container.right;

    if (showLeftArrow !== this.state.showLeftArrow || showRightArrow !== this.state.showRightArrow) {
      this.setState({showLeftArrow, showRightArrow});
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.onScroll);
    this.container.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onScroll);
    this.container.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const { headings, data, mapDataItemToRow } = this.props;
    return (
      <div className={classnames('card-table', {
        'card-table-scroll-left': this.state.showLeftArrow,
        'card-table-scroll-right': this.state.showRightArrow,
        'card-table-scroll-both': this.state.showLeftArrow && this.state.showRightArrow,
      })}>
        <div className="card-table-scroll" ref={r => { this.container = r; }}>
          <table ref={r => { this.table = r; }}>
            <thead>
              <tr>
                {headings.map(heading => <th key={heading}><span>{heading}</span></th>)}
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id}>
                  {mapDataItemToRow(row).map((item, index) => <td key={`${row.id}-${item}-${index}`}>{item}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Card.displayName = 'Card';
CardBody.displayName = 'CardBody';
CardHeader.displayName = 'CardHeader';
CardLoading.displayName = 'CardLoading';
CardTable.displayName = 'CardTable';
CardWell.displayName = 'CardWell';
CardWellHighlight.displayName = 'CardWellHighlight';
