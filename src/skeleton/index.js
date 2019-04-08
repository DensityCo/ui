import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import colorVariables from '../../variables/colors.json';

export default function Skeleton({width, height, color}) {
  return (
    <span
      className={styles.skeleton}
      style={{width, height, backgroundColor: color}}
    />
  );
}

Skeleton.propTypes = {
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  color: propTypes.string,
};

Skeleton.defaultProps = {
  width: '100%',
  height: 8,
  color: colorVariables.gray,
};
Skeleton.displayName = 'Skeleton';
