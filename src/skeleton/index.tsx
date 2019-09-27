import React from 'react';
import styles from './styles.scss';
import colorVariables from '../../variables/colors.json';

type SkeletonProps = {
    width?: string | number,
    height?: string | number,
    color?: string,
    borderRadius?: string | number,
}

const Skeleton: React.FunctionComponent<SkeletonProps> = ({
  width='100%',
  height=8,
  color=colorVariables.gray,
  borderRadius,
}) => (
  <span
    className={styles.skeleton}
    style={{width, height, backgroundColor: color, borderRadius}}
  />
);

Skeleton.displayName = 'Skeleton';
export default Skeleton;
