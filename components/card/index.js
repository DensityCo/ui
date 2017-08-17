import * as uuid from 'uuid';
import * as React from 'react';
import classnames from 'classnames';

export default function Card({type, className, children}) {
  return <div
    className={classnames('card', type ? `card-${type}` : null, className)}
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

export function CardLoading({indeterminate, percent, className}) {
  return <div className={classnames(
    'card-loading',
    indeterminate ? `card-loading-indeterminate` : null,
    className
  )} style={{width: `${percent}%`}} />;
}
