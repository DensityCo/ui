import React, { Component } from 'react';

import {ReactSVGPanZoom, TOOL_NONE, TOOL_AUTO} from 'react-svg-pan-zoom';
import ViewerTouchEvent from 'react-svg-pan-zoom/build-commonjs/events/viewer-touch-event.js';

import Icons from '../icons';
import propTypes from 'prop-types';

import colorVariables from '../../variables/colors.json';

import styles from './styles.module.scss';

import "regenerator-runtime";

const POPUP_VERTICAL_OFFSET_FROM_SELECTED_ITEM_IN_PX = 40;
const POPUP_HORIZONTAL_OFFSET_FROM_SELECTED_ITEM_IN_PX = -150;
const CREATE_SHAPE_TOUCH_EXACTNESS_IN_PX = 20;

export const DPU = ({selected, shape}) => <g className="DPU" transform="scale(0.75)">
  <rect
    x={shape.placement === 1 ? -10 : 50}
    y={15}
    width={10}
    height={20}
    fill="#CBCFD6"
    stroke="#B4B8BF"
    strokeWidth={2}
  />
  <rect
    x={0}
    y={0}
    width={50}
    height={50}
    rx={8}
    ry={8}
    fill="#CBCFD6"
    stroke={selected ? '#2C4EB9' : '#8E9299'}
    strokeWidth={2}
  />
  <path
    d="M3.76898293,9.63518314 C4.62950636,9.11441313 5.35090153,8.38571029 5.86367624,7.51833746 C6.40105377,6.60969552 6.70938043,5.54910822 6.70938043,4.41608352 L6.70938043,0.384553084 C6.70938043,0.172147028 6.88102471,0 7.09266657,0 L8.90723296,0 C9.1190187,0 9.2905191,0.172147028 9.2905191,0.384553084 L9.2905191,4.41608352 C9.2905191,5.54896392 9.59898963,6.60969552 10.1362233,7.51833746 C10.6491419,8.38571029 11.3703932,9.11441313 12.2310605,9.63518314 L15.808254,11.7065751 C15.9916961,11.8127781 16.0544261,12.0478389 15.9485332,12.231674 L15.0413939,13.8076923 C14.935501,13.9916718 14.7011267,14.0545855 14.5176846,13.9483825 L11.0030773,11.9133535 C10.1173755,11.4070133 9.0924016,11.1176966 7.99994977,11.1176966 C6.9076418,11.1176966 5.88252402,11.4070133 4.99682225,11.9133535 L1.4823588,13.9483825 C1.29891667,14.0545855 1.06454237,13.9916718 0.958649499,13.8076923 L0.0513663054,12.231674 C-0.0543826872,12.0478389 0.00834732743,11.8127781 0.191789457,11.7065751 L3.76898293,9.63518314 Z"
    fill="#8E9299"
    transform="translate(17,17)"
  ></path>
</g>;

export const CIRCLE = ({scale, selected, index}) => <g className="Circle">
  <circle
    cx={21}
    cy={21}
    r={26 * scale}
    style={{
      opacity: selected ? 0.35 : 0,
      fill: colorVariables.midnight, /* must be here for transition to work */
                                         /* see https://stackoverflow.com/a/20012937/4115328 */
      transition: "all 200ms ease-in-out",
    }}
  />
  <circle
    cx={21}
    cy={21}
    r={18 * scale}
    fill={colorVariables.midnight}
  />
</g>;

function getImageDimensions(src) {
  const img = document.createElement('img');
  img.src = src;
  img.styles = 'visibility: hidden; position: absolute; top: -100000000px; left: -100000000px;'
  document.body.appendChild(img);

  return new Promise((resolve, reject) => {
    // Wait for image to load.
    img.onload = () => {
      const {width, height} = img.getBoundingClientRect();
      document.body.removeChild(img);
      resolve({ width, height });
    }
    // Handle errors (if it gets rendered with an undefined "src")
    img.onerror = () => {
      document.body.removeChild(img);
      reject(new Error('Could not read image dimensions.'));
    }
  });
}

export default class Floorplan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,

      selectedId: null,
      panZoomMatrix: {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0},

      selectedShapeMoving: false,
      hoveringOverShape: false,
      mouseWithinFloorplanBounds: false,

      // Controlling of the message on touch devices explaining how to add a doorway.
      showTouchDeviceAddHint: false,

      // Show a creation animation for the shape with this id
      creationAnimationId: null,

      // Display the tooltip following the cursor offscreen until the first mousemove event.
      lastMouseX: -1000,
      lastMouseY: -1000,

      floorplanWidth: 0,
      floorplanHeight: 0,
    };

    this.shapeRefs = {};
    this.removeTooltipWhenWindowBlurs = this.removeTooltipWhenWindowBlurs.bind(this);
    this.disallowPanZoomOnAppleDevices = this.disallowPanZoomOnAppleDevices.bind(this);
    this.selectShape = this.selectShape.bind(this);
  }

  async selectShape(shapeId) {
    return new Promise((resolve, reject) => {
      try {
        const height = this.props.height || 600;
        if (shapeId && shapeId.id) { shapeId = shapeId.id; }

        // Call a callback when the active shape is deselected
        if (shapeId === null && this.props.onShapeDeselect) {
          this.props.onShapeDeselect(this.state.selectedId);
        }

        this.setState({
          selectedId: shapeId,
          selectedShapeMoving: false,
          hoveringOverShape: false,
        }, () => {
          // If a shape was selected that would display the popup outside of the visible area of the
          // interactive floorplan visualization, then adjust the position of the visualization.
          if (shapeId) {
            const {x, y} = this.shapeRefs[shapeId].getBoundingClientRect();
            const popupBounds = this.popupRef.getBoundingClientRect();

            const yDistanceFromPopupToBottomOfFloorplan = height - y;
            if (yDistanceFromPopupToBottomOfFloorplan < popupBounds.height) {
              const distanceToMoveViewUp = (popupBounds.height - yDistanceFromPopupToBottomOfFloorplan) + 20;
              const scaleFactor = 1 / this.state.panZoomMatrix.a;
              this.panZoom.pan(0, -1 * distanceToMoveViewUp * scaleFactor);
            }
          }

          return resolve();
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  showTouchDeviceAddHint() {
    // 1st: Show the hint, and give it a class name that makes it fade in.
    this.setState({showTouchDeviceAddHint: true}, () => {
      window.setTimeout(() => {
        // 2nd: Give the hint a classname that makes it fade out.
        this.setState({showTouchDeviceAddHint: false});
      }, 1500);
    });
  }

  async componentDidMount() {
    window.addEventListener('blur', this.removeTooltipWhenWindowBlurs);

    // Apple devices will by default use touch events to support pinch/zoom. We need to tap into
    // those events to use when panning and zomming the canvas, so call `.preventDefault()` on those
    // events if they happen.
    document.addEventListener('touchmove', this.disallowPanZoomOnAppleDevices, {passive: false});

    let newState;
    try {
      // When the component initially loads, get the width and height of the passed image.
      const { width, height } = await getImageDimensions(this.props.image);
      newState = {
        loading: false,
        floorplanWidth: width,
        floorplanHeight: height
      }
    } catch (e) {
      // newState does not include any image dimensions if the image can't load.
      newState = {
        loading: false
      }
    }


    // Delay briefly to ensure that the loading message doesn't "flicker" and the user has a chance
    // to read it.
    this.loadingTimeout = window.setTimeout(() => {
      delete this.loadingTimeout;

      // Set the new state object
      this.setState(newState);

      // If the device supports touch events, then show the hint afterward to explain to the user
      // how to create doorways.
      if (this.props.deviceSupportsTouch) {
        window.setTimeout(() => this.showTouchDeviceAddHint(), 1000);
      }
    }, 500);
  }
  componentWillUnmount() {
    window.removeEventListener('blur', this.removeTooltipWhenWindowBlurs);
    document.removeEventListener('touchmove', this.disallowPanZoomOnAppleDevices, {passive: false});
    this.loadingTimeout && window.clearTimeout(this.loadingTimeout);
  }
  removeTooltipWhenWindowBlurs() {
    this.setState({mouseWithinFloorplanBounds: false});
  }
  disallowPanZoomOnAppleDevices() {
    // Detect if the element receiving the touch event is a child within the `floorplan`, and if so,
    // call `.preventDefault()` on the event.
    let element = event.target;
    while (element) {
      if (element.className && element.className === styles.floorplanRoot) {
        event.preventDefault();
        return;
      }
      element = element.parentElement;
    }
  }

  async componentWillReceiveProps(nextProps) {
    // If the image changes, we need to update the stored width and height of the image.
    if (nextProps.image !== this.props.image) {
      try {
        const { width, height } = await getImageDimensions(nextProps.image);
        this.setState({
          floorplanWidth: width,
          floorplanHeight: height,
        });
      } catch (e) {
        // Nothing to update...
      }
    }
  }

  render() {
    const {
      shapes,
      image,
      imageRotation,
      cursorTagText,

      onCreateShape,
      onShapeMovement,
      onShapeClick,
    } = this.props;
    const width = this.props.width || 1000;
    const height = this.props.height || 600;
    const {
      loading,
      hoveringOverShape,
      selectedShapeMoving,
      selectedId,
      panZoomMatrix,
      mouseWithinFloorplanBounds,
      floorplanWidth,
      floorplanHeight,
      showTouchDeviceAddHint,
      creationAnimationId,
    } = this.state;

    // Calculate a value representing the current zoom level. This value is < 1 when the user zooms
    // in and > 1 when the user zooms out.
    const scaleFactor = 1 / panZoomMatrix.a;

    // Given the selected id, get a reference to the selected shape.
    const selectedShape = selectedId ? shapes.find(i => i.id === selectedId) : null;

    // Also, store a reference to the last shape to be selected. This is used so that popups and
    // other things that fade out after the shape is deselected can stay positioned next to the
    // selected shape as they fade out.
    this.lastSelectedShape = selectedShape || this.lastSelectedShape;

    return (
      <div
        className={styles.floorplanRoot}
        ref={r => { this.container = r; }}
        style={!selectedShape ? {cursor: 'none'} : {}}

        onTouchStart={e => {
          // If the event occured within the floorplan popup, then it's a mouse event in the popup
          // itself and shouldn't dismiss it!
          let element = e.target;
          while (element) {
            if (element.className === styles.floorplanPopup) {
              return;
            }
            element = element.parentElement;
          }

          // Deselect the currently active shape
          this.selectShape(null);

          // After the user taps on something, disable the adding cursor.
          this.setState({mouseWithinFloorplanBounds: false});
          e.preventDefault();
        }}

        onMouseMove={e => {
          // If the event occured within the floorplan popup, then it's not proof that the mouse is
          // moving over the canvas, because touch devices can produce a mouse event when the popup
          // closes.
          let element = e.target;
          while (element) {
            if (element.className === styles.floorplanPopup) {
              return;
            }
            element = element.parentElement;
          }

          // Selected shape is being moved, update its x and y coordinates.
          if (selectedShapeMoving) {
            if (e.buttons > 0) {
              // Calculate the distance that the mouse has moved since the last update.
              const deltaX = (e.clientX * scaleFactor) - this.state.lastMouseX;
              const deltaY = (e.clientY * scaleFactor) - this.state.lastMouseY;

              // Add that delta to the current x and y coords.
              let x = selectedShape.x + deltaX;
              let y = selectedShape.y + deltaY;

              // Call a callback, passing those new coords. This callback
              // should update the state of the component, moving the shapes.
              if (onShapeMovement) {
                onShapeMovement(selectedId, x, y, this);
              }
            } else {
              // Item is no longer being moved, unset the `selectedShapeMoving` flag.
              this.setState({selectedShapeMoving: false});
            }
          }

          // Update the last mouse positions with the current positions - for the next frame.
          this.setState({
            mouseWithinFloorplanBounds: true,
            lastMouseX: e.clientX * scaleFactor,
            lastMouseY: e.clientY * scaleFactor,
          });
        }}

        onTouchEnd={async e => {
          let element = e.target;

          // If the user tapped inside of the floorplan (ie, not in the popup), then ensure that
          // that a mousemove event won't be fired. We don't want to prevent a tap when it happens
          // in the popup though, because if we do then users cannot interact with input boxes or
          // other ui controls.
          while (element) {
            if (element.className && element.className.baseVal === styles.floorplanContainer) {
              e.preventDefault();
              break;
            }
            element = element.parentElement;
          }

          // Reselect the shape. This adjusts the position of the popup to match the new shape
          // position.
          await this.selectShape(selectedShape);

          // Now that the item is no longer being moved and the popup is positioned in the correct
          // location, disable the moving flag. This then re-shows the popup, which is now
          // positioned correctly.
          this.setState({ selectedShapeMoving: false });
        }}

        onMouseOut={e => {
          // When the mouse leaves the floorplan, ensure the element that the event was received on
          // is a decendant of the floorplan wrapper div. If so, then hide the cursor tooltip.
          let element = e.target;
          while (element) {
            if (element.className === styles.floorplanRoot) {
              this.setState({mouseWithinFloorplanBounds: false});
              break;
            }
            element = element.parentElement;
          }
        }}

        onTouchMove={e => {
          e.preventDefault();

          // Selected shape is being moved, update its x and y coordinates.
          if (selectedShapeMoving) {
            // Calculate the distance that the mouse has moved since the last update.
            const deltaX = (e.touches[0].clientX * scaleFactor) - this.state.lastMouseX;
            const deltaY = (e.touches[0].clientY * scaleFactor) - this.state.lastMouseY;

            // Add that delta to the current x and y coords.
            let x = selectedShape.x + deltaX;
            let y = selectedShape.y + deltaY;

            // Call a callback, passing those new coords. This callback
            // should update the state of the component, moving the shapes.
            if (onShapeMovement) {
              onShapeMovement(selectedId, x, y, this);
            }
          }

          // Update the last mouse positions with the current positions - for the next frame.
          this.setState({
            mouseWithinFloorplanBounds: false,
            lastMouseX: e.touches[0].clientX * scaleFactor,
            lastMouseY: e.touches[0].clientY * scaleFactor,
          });
        }}
      >
        {(() => {
          let popupStyles = {};
          const shouldPopupBeOpen = selectedShape && !selectedShapeMoving;

          if (this.lastSelectedShape) {
            // Was the selected shape deleted? If so, don't render the popup, and deselect the
            // active shape if one is selected.
            if (!this.shapeRefs[this.lastSelectedShape.id]) {
              this.lastSelectedShape = null; // Remove "last" selected shape.
              setTimeout(() => { // Remove currently selected shape.
                this.selectShape(null);
              }, 100);
              return null;
            }

            // Figure out where popup should be. Use the position of the shape on the canvas to get
            // the upper left hand x and y coordinates.
            let {x, y} = this.shapeRefs[this.lastSelectedShape.id].getBoundingClientRect();

            // Subtract the parent's position from the popup's position in order to position within
            // the context of the parent.
            let parent = this.container.getBoundingClientRect();
            x -= parent.x;
            y -= parent.y;

            // Add offsets such that the x and y coordinates refer to the middle of the shape, not the
            // top left.
            x += this.lastSelectedShape.width / 2;
            y += this.lastSelectedShape.height / 2;

            // Offset the popup by the required amount.
            x += POPUP_HORIZONTAL_OFFSET_FROM_SELECTED_ITEM_IN_PX;
            y += POPUP_VERTICAL_OFFSET_FROM_SELECTED_ITEM_IN_PX;

            // Ensure that the popup can't overflow the horizontal  bounds of its container.
            if (this.popupRef) {
              this.popupBounds = this.popupRef.getBoundingClientRect();
            }
            if (x < 10) { x = 10; }
            if (x > width - this.popupBounds.width - 20) { x = width - this.popupBounds.width - 20; }

            // Assign position.
            popupStyles.left = x;
            popupStyles.top = y;
          } else {
            // When not selected, ensure the popup is placed offscreen.
            popupStyles.left = -100000;
            popupStyles.top = -100000;
          }

          popupStyles.opacity = shouldPopupBeOpen ? 1 : 0;
          popupStyles.pointerEvents = shouldPopupBeOpen ? 'auto' : 'none';
          popupStyles.userSelect = shouldPopupBeOpen ? 'auto' : 'none';

          // Required for iPad / apple devices :(
          popupStyles.WebkitUserSelect = shouldPopupBeOpen ? 'auto' : 'none';
          popupStyles.WebkitTouchCallout = shouldPopupBeOpen ? 'auto' : 'none';

          return <div
            className={styles.floorplanPopup}
            style={popupStyles}
            ref={r => { this.popupRef = r; }}
            onTouchStart={e => {
              // When the popup is closed, disable touch events.
              if (!shouldPopupBeOpen) {
                e.preventDefault();
              }
            }}
          >
            {this.lastSelectedShape ? this.lastSelectedShape.popup(this.lastSelectedShape, this) : null}
          </div>;
        })()}

        {mouseWithinFloorplanBounds && !hoveringOverShape && !selectedShape ? (
          <div className={styles.floorplanCursor} style={{
            left: (this.state.lastMouseX / scaleFactor),
            top: (this.state.lastMouseY / scaleFactor),
          }}>
            <Icons.Plus color="primary" />
            <span className={styles.floorplanCursorTag}>
              {cursorTagText || 'Click to add a doorway'}
            </span>
          </div>
        ) : null}

        <div
          className={styles.floorplanTouchCreateHint}
          style={showTouchDeviceAddHint ? {left: width / 2, opacity: 1} : {left: width / 2}}
        >
          Press and hold to create a doorway.
        </div>

        <div
          className={styles.floorplanTouchCreateHint}
          style={loading ? {left: width / 2, opacity: 1} : {left: width / 2}}
        >
          Loading floorplan image ...
        </div>

        <ReactSVGPanZoom
          width={width}
          height={height}
          ref={r => { this.panZoom = r; }}

          /* When a shape is selected, do not allow the canvas to move */
          tool={selectedId ? TOOL_NONE : TOOL_AUTO}

          /* https://github.com/chrvadala/react-svg-pan-zoom/blob/master/docs/documentation.md */
          detectWheel={true}
          detectPinchGesture={true}
          detectAutoPan={false}
          preventPanOutside={false}
          disableDoubleClickZoomWithToolAuto={false}

          toolbarPosition="none"
          miniaturePosition="none"
          background="#B4B8BF"

          onChangeValue={value => this.setState({panZoomMatrix: value})}
          onZoom={() => this.setState({
            selectedShapeMoving: false,
            selectedId: null,

            // On zoom. reset these values so that they can be
            // recomputed with the new scale factor.
            lastMouseX: -1000,
            lastMouseY: -1000,
          })}
          onClick={e => {
            if (selectedShape) {
              return;
            }

            // The user clicked the background without a shape selected, so create a new shape!
            if (onCreateShape) {
              onCreateShape(e.x, e.y, this);
            }
          }}

          onTouchStart={e => {
            const touches = e.originalEvent.touches,
                  SVGViewer = e.SVGViewer,
                  value = e.value;

            // Creating a new shape doesn't happen with multiple concurrent touches.
            if (touches.length > 1) {
              return;
            }

            // Ensure that a shape isn't already selected.
            if (selectedShape) {
              return;
            }

            this.createShapeTouchStartTimestamp = Date.now();

            this.createShapeInitialTouch = touches[0];
            this.createShapeFinalTouch = touches[0];
            this.createShapeTimeout = window.setTimeout(async () => {
              const touchDeltaX = Math.abs(this.createShapeInitialTouch.clientX - this.createShapeFinalTouch.clientX);
              const touchDeltaY = Math.abs(this.createShapeInitialTouch.clientY - this.createShapeFinalTouch.clientY);

              if (touchDeltaX < CREATE_SHAPE_TOUCH_EXACTNESS_IN_PX && touchDeltaY < CREATE_SHAPE_TOUCH_EXACTNESS_IN_PX) {
                // Use an internal react-svg-pan-zoom method to project the touch coordinates to
                // the svg's coordinate plane.
                // ref https://github.com/chrvadala/react-svg-pan-zoom/blob/9ae28d625fe29d5f96ff014194824c95dee95a81/src/events/viewer-touch-event.js#L19
                const points = ViewerTouchEvent.touchesToPoints(touches, SVGViewer, value);

                // The user tapped the background without a shape selected, so create a new shape!
                if (onCreateShape) {
                  const result = await onCreateShape(points[0].x, points[0].y, this);

                  if (typeof result === 'undefined') {
                    console.warn('Density UI Floorplan: onCreateShape should return a promise that resolves to the id of the created shape, instead recevied undefined.');
                    return;
                  }

                  // Extract the id from the data resolved from onCreateShape.
                  let id;
                  if (result && result.id) {
                    id = result.id; /* user resolved the created item */
                  } else {
                    id = result; /* user resolved the id itself */
                  }

                  // 1st: Set the creation animiation id property to the id of the shape that was
                  // just created.
                  this.setState({creationAnimationId: id}, () => {
                    window.setTimeout(() => {
                      // 2nd: Reset the creation animation state back to null once the animation has
                      // completed, which hides the animation element.
                      this.setState({creationAnimationId: null});
                    }, 400);
                  });
                }
              }
            }, 500);
          }}
          onTouchMove={e => {
            const event = e.originalEvent;
            this.createShapeFinalTouch = event.touches[0];

            const touchDeltaX = Math.abs(this.createShapeInitialTouch.clientX - this.createShapeFinalTouch.clientX);
            const touchDeltaY = Math.abs(this.createShapeInitialTouch.clientY - this.createShapeFinalTouch.clientY);

            if (touchDeltaX > CREATE_SHAPE_TOUCH_EXACTNESS_IN_PX && touchDeltaY > CREATE_SHAPE_TOUCH_EXACTNESS_IN_PX) {
              this.setState({showTouchDeviceAddHint: false});
            }
          }}
          onTouchEnd={e => {
            // The user has released their touch, before the timeout has fired, so clear the
            // timeout.
            window.clearTimeout(this.createShapeTimeout);

            if (!this.createShapeInitialTouch) {
              return;
            }

            const touchDeltaX = Math.abs(this.createShapeInitialTouch.clientX - this.createShapeFinalTouch.clientX);
            const touchDeltaY = Math.abs(this.createShapeInitialTouch.clientY - this.createShapeFinalTouch.clientY);
            const touchDuration = Date.now() - this.createShapeTouchStartTimestamp;

            // Did the user just tap on the background and not hold? If so, then show them a hint
            // telling them that they should press and hold.
            if (
              touchDeltaX < CREATE_SHAPE_TOUCH_EXACTNESS_IN_PX &&
              touchDeltaY < CREATE_SHAPE_TOUCH_EXACTNESS_IN_PX &&
              touchDuration < 500
            ) {
              this.showTouchDeviceAddHint();
            }
          }}
        >
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            xmlns='http://www.w3.org/2000/svg'
          >
            <g className={styles.floorplanContainer}>
              {/* The floorplan image itself */}
              <g className={styles.floorplanLayerImage} ref={r => { this.floorplanLayerImage = r; }}>
                <image
                  xlinkHref={image}
                  x={0}
                  y={0}
                  width={floorplanWidth}
                  height={floorplanHeight}
                  onClick={e => this.selectShape(null)}
                  transform={(() => {
                    // If an `imageRotation` prop was specified, rotate the floorplan about its center
                    // that many degrees.
                    if (typeof imageRotation === 'number') {
                      // A lookup table of translations for ach rotation value. I couldn't find a
                      // function that generalizes this quite perfectly :(
                      switch (imageRotation % 360) {
                      case 90:
                        return `rotate(90), translate(${0}, ${-1 * floorplanHeight})`;
                      case 180:
                        return `rotate(180), translate(${-1 * floorplanWidth}, ${-1 * floorplanHeight})`;
                      case 270:
                        return `rotate(270), translate(${-1 * floorplanWidth}, ${0})`;
                      case 0:
                      default:
                        return 'rotate(0)';
                      }
                    } else {
                      return 'rotate(0)';
                    }
                  })()}
                />
              </g>

              {/* All doorways / shapes drawn on top of the floorplan */}
              <g className="floorplan-layer-shapes">
                {shapes.map((shape, index) => {
                  const translateX = shape.x - (shape.width/2);
                  const translateY = shape.y - (shape.height/2);
                  return <g
                    className={styles.floorplanShape}
                    transform={`translate(${translateX},${translateY})`}
                    key={shape.id}
                    style={{cursor: 'pointer'}}
                    onClick={e => {
                      if (onShapeClick) {
                        onShapeClick(shape.id);
                      }

                      this.selectShape(shape);

                      // Ensure that the click event won't make its way to the floorplan
                      // and create a new shape.
                      e.stopPropagation();
                    }}
                    onTouchStart={e => {
                      if (onShapeClick) {
                        onShapeClick(shape.id);
                      }

                      e.preventDefault();

                      // Scenario: the user taps on a shape. The svgpanzoom component seems to
                      // interecept this tap as the first part of the next tap interaction, so when
                      // the popup is closed the next drag gets messed up.
                      if (!this.state.selectShape) {
                        e.stopPropagation();
                      }

                      this.selectShape(shape);
                    }}
                    onMouseMove={e => {
                      // The above only applies to the actively selected shape.
                      if (selectedId !== shape.id) {
                        return;
                      }

                      // If the user started clicking and dragging on an shape, then
                      // start moving that shape.
                      if (shape.allowMovement && !selectedShapeMoving && e.buttons > 0) {
                        // Set initial x and y mouse positions. This is used to calculate mouse deltas
                        // on future mousemoves.
                        this.setState({
                          lastMouseX: e.clientX * scaleFactor,
                          lastMouseY: e.clientY * scaleFactor,

                          // Set the flag indicating the currently selected doorway is being moved.
                          selectedShapeMoving: true,
                        });
                      }
                    }}
                    onTouchMove={e => {
                      // The above only applies to the actively selected shape.
                      if (selectedId !== shape.id) {
                        return;
                      }

                      // If the user started clicking and dragging on an shape, then
                      // start moving that shape.
                      if (shape.allowMovement && !selectedShapeMoving) {
                        // Set initial x and y mouse positions. This is used to calculate mouse deltas
                        // on future mousemoves.
                        this.setState({
                          lastMouseX: e.touches[0].clientX * scaleFactor,
                          lastMouseY: e.touches[0].clientY * scaleFactor,

                          // Set the flag indicating the currently selected doorway is being moved.
                          selectedShapeMoving: true,
                        });
                      }
                    }}
                    ref={r => { this.shapeRefs[shape.id] = r; }}
                    onMouseEnter={() => this.setState({hoveringOverShape: true})}
                    onMouseLeave={() => this.setState({hoveringOverShape: false})}
                  >
                    {/* Render the given shape on the floorplan */}
                    <shape.shape
                      selected={selectedId === shape.id}
                      isMoving={selectedId === shape.id && selectedShapeMoving}
                      index={index}
                      /* I'd love to apply a css scale transformation instead, but it'd need a 
                       * transform-origin property, and that would effect the transform already
                       * being done. */
                      scale={scaleFactor}

                      shape={shape}
                    />
                  </g>;
                })}
              </g>

              {/* A layer for rendering the creation animation for a shape */}
              <g className={styles.floorplanLayerCreationAnimation}>
                {creationAnimationId ? (() => {
                  const createdShape = shapes.find(i => i.id === creationAnimationId);
                  return (
                    <circle
                      className={styles.floorplanLayerCreationAnimationCircle}
                      cx={createdShape.x}
                      cy={createdShape.y}
                      r={20}
                      fill={colorVariables.midnight}
                      stroke={colorVariables.midnight}
                    />
                  );
                })() : null}
              </g>
            </g>
          </svg>
        </ReactSVGPanZoom>
      </div>
    );
  }
}

Floorplan.displayName = 'Floorplan';
Floorplan.propTypes = {
  deviceSupportsTouch: propTypes.bool,

  image: propTypes.oneOfType([
    propTypes.oneOf([null]),
    propTypes.string,
  ]).isRequired,
  imageRotation: propTypes.number,

  shapes: propTypes.arrayOf(propTypes.shape({
    id: propTypes.any.isRequired,
    shape: propTypes.func.isRequired,
    x: propTypes.number.isRequired,
    y: propTypes.number.isRequired,
    width: propTypes.number.isRequired,
    height: propTypes.number.isRequired,
    allowMovement: propTypes.bool,

    name: propTypes.string.isRequired,
    popup: propTypes.node.isRequired,
  })).isRequired,

  cursorTagText: propTypes.node,
  onShapeClick: propTypes.func,
  onShapeDeselect: propTypes.func,
  onShapeMovement: propTypes.func,
  onCreateShape: propTypes.func,
};
