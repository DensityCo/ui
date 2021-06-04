import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  default as MaterialTooltip,
  TooltipProps as MaterialTooltipProps
} from '@material-ui/core/Tooltip';
import colors from '../../variables/colors.json';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    color: colors.white,
    backgroundColor: colors.midnight,
    padding: '8px 12px',
    fontSize: 12,
    fontWeight: 600,
  },
  tooltipPlacementBottom: {
    marginTop: 8,
  },
}));

export default function Tooltip({
  target,
  contents,
  placement,
  enterDelay,
}: {
  target: React.ReactElement;
  contents: React.ReactNode;
  placement?: MaterialTooltipProps['placement'];
  enterDelay?: MaterialTooltipProps['enterDelay'];
}) {
  const classes = useStyles();

  return (
    <MaterialTooltip
      classes={classes}
      title={contents || ''}
      placement={placement || 'bottom-start'}
      enterDelay={enterDelay || 700}
    >
      {target}
    </MaterialTooltip>
  );
}
