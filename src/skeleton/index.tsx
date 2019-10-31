import React from 'react';
import propTypes from 'prop-types';
import styles from './styles.scss';
import colorVariables from '../../variables/colors.json';

const Skeleton: React.FC<any> = ({width, height, color, borderRadius}) => {
  return (
    <span
      className={styles.skeleton}
      style={{width, height, backgroundColor: color, borderRadius}}
    />
  );
}

Skeleton.propTypes = {
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  color: propTypes.string,
  borderRadius: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

Skeleton.defaultProps = {
  width: '100%',
  height: 8,
  color: colorVariables.gray,
};
Skeleton.displayName = 'Skeleton';
export default Skeleton;
