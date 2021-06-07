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
  enterNextDelay,
  enterTouchDelay,
  leaveDelay,
  leaveTouchDelay,
}: {
  target: React.ReactElement;
  contents: React.ReactNode;
  placement?: MaterialTooltipProps['placement'];
  enterDelay?: MaterialTooltipProps['enterDelay'];
  enterNextDelay?: MaterialTooltipProps['enterNextDelay'];
  enterTouchDelay?: MaterialTooltipProps['enterTouchDelay'];
  leaveDelay?: MaterialTooltipProps['leaveDelay'];
  leaveTouchDelay?: MaterialTooltipProps['leaveTouchDelay'];
}) {
  const classes = useStyles();

  return (
    <MaterialTooltip
      classes={classes}
      title={contents || ''}
      placement={placement || 'bottom-start'}
      enterDelay={enterDelay || 400}
      enterNextDelay={enterNextDelay || 0}
      enterTouchDelay={enterTouchDelay || 800}
      leaveDelay={leaveDelay || 0}
      leaveTouchDelay={leaveTouchDelay || 1600}
    >
      {target}
    </MaterialTooltip>
  );
}
