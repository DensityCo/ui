// import React from 'react';
// import { storiesOf } from '@storybook/react';

// import './styles.module.scss';
// import Floorplan, { DPU, CIRCLE } from './index';
// import RadioButton from '../radio-button';
// import Button from '../button';

// import { v4 as uuid } from 'uuid';

// storiesOf('Floorplan', module)
//   .add('With a few movable doorways', () => {
//     class FloorplanWrapper extends React.Component {
//       constructor(props) {
//         super(props);


//         this.shapePopup = (shape, floorplan) => <div style={{
//           width: 509,
//           height: 281,
//           padding: 20,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContents: 'center',
//         }}>
//           <input type="text" />
//           <h5 style={{margin: 0, color: '#4E5457'}}>Has access to this data:</h5>
//           <pre>{JSON.stringify(shape, null, 2)}</pre>
//           <button onClick={e => {
//             floorplan.selectShape(null);
//             this.setState({
//               shapes: this.state.shapes.filter(i => i.id !== shape.id),
//             });
//           }}>Delete</button>
//         </div>;

//         this.state = {
//           shapes: [
//             {
//               id: uuid.v4(),
//               shape: CIRCLE,
//               x: 300,
//               y: 300,
//               width: 40,
//               height: 40,
//               allowMovement: true,

//               name: "Conference Room 1",
//               popup: this.shapePopup,
//             },
//             {
//               id: uuid.v4(),
//               shape: CIRCLE,
//               x: 646,
//               y: 450,
//               width: 40,
//               height: 40,
//               allowMovement: true,

//               name: "Cafeteria 1",
//               popup: this.shapePopup,
//             },
//           ],
//         };
//       }

//       render() {
//         return <div>
//           <p>navbar here</p>
//           <p>navbar here</p>
//           <p>navbar here</p>
//           <Floorplan
//             deviceSupportsTouch={false}
//             image="https://i.imgur.com/FkE7cxK.png"
//             shapes={this.state.shapes}
//             onShapeMovement={(id, x, y) => {
//               this.setState({
//                 shapes: this.state.shapes.map(s => {
//                   if (s.id === id) {
//                     return Object.assign({}, s, {x, y});
//                   } else {
//                     return s;
//                   }
//                 }),
//               });
//             }}

//             onCreateShape={async (x, y) => {
//               const id = uuid.v4();
//               this.setState({
//                 shapes: [...this.state.shapes, {
//                   id, x, y,
//                   shape: CIRCLE,
//                   popup: this.shapePopup,
//                   width: 40,
//                   height: 40,
//                   allowMovement: true,
//                   name: `My new doorway with id ${id}`,
//                 }],
//               });
//               return id;
//             }}
//           />
//         </div>;
//       }
//     }

//     return <FloorplanWrapper />;
//   })
//   .add('With a few movable doorways, showing the touch event hint on start', () => {
//     class FloorplanWrapper extends React.Component {
//       constructor(props) {
//         super(props);


//         this.shapePopup = (doorway, floorplan) => (
//           <div className="floorplan-detail-popup">
//             <label className="floorplan-detail-label" htmlFor="floorplan-detail-doorway-name">
//               Doorway Name
//             </label>
//             <input
//               className="floorplan-detail-transparent-input"
//               type="text"
//               placeholder="Give this doorway a unique name ..."
//             />

//             <label className="floorplan-detail-label" htmlFor="floorplan-detail-unit-location">
//               Unit Location
//               <span className="floorplan-detail-label-small">
//                 (Will the unit be mounted inside or outside of the space?)
//               </span>
//             </label>

//             <fieldset className="floorplan-detail-radio-set" id="floorplan-detail-unit-location">
//               <RadioButton text="Inside" />
//               <RadioButton text="Outside" />
//             </fieldset>

//             <Button
//               disabled={false}
//               onClick={() => {
//                 alert('Clicked!')
//               }}
//             >Done</Button>

//             <span
//               role="button"
//               tabIndex="0"
//               className="floorplan-detail-delete-link"
//               onClick={() => {
//                 alert('Click!!!');
//               }}
//             >Remove Doorway</span>
//           </div>
//         );

//         this.state = {
//           shapes: [
//             {
//               id: uuid.v4(),
//               shape: CIRCLE,
//               x: 300,
//               y: 300,
//               width: 40,
//               height: 40,
//               allowMovement: true,

//               name: "Conference Room 1",
//               popup: this.shapePopup,
//             },
//             {
//               id: uuid.v4(),
//               shape: CIRCLE,
//               x: 646,
//               y: 450,
//               width: 40,
//               height: 40,
//               allowMovement: true,

//               name: "Cafeteria 1",
//               popup: this.shapePopup,
//             },
//           ],
//         };
//       }

//       render() {
//         return <div>
//           <p>navbar here</p>
//           <p>navbar here</p>
//           <p>navbar here</p>
//           <Floorplan
//             deviceSupportsTouch={true}
//             image="https://i.imgur.com/FkE7cxK.png"
//             shapes={this.state.shapes}
//             onShapeMovement={(id, x, y) => {
//               this.setState({
//                 shapes: this.state.shapes.map(s => {
//                   if (s.id === id) {
//                     return Object.assign({}, s, {x, y});
//                   } else {
//                     return s;
//                   }
//                 }),
//               });
//             }}

//             onCreateShape={async (x, y) => {
//               const id = uuid.v4();
//               this.setState({
//                 shapes: [...this.state.shapes, {
//                   id, x, y,
//                   shape: CIRCLE,
//                   popup: this.shapePopup,
//                   width: 40,
//                   height: 40,
//                   allowMovement: true,
//                   name: `My new doorway with id ${id}`,
//                 }],
//               });
//               return id;
//             }}
//           />
//         </div>;
//       }
//     }

//     return <FloorplanWrapper />;
//   })
//   .add('With no shape being movable', () => {
//     class FloorplanWrapper extends React.Component {
//       constructor(props) {
//         super(props);


//         this.shapePopup = shape => <div style={{
//           width: 509,
//           height: 281,
//           padding: 20,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContents: 'center',
//         }}>
//           <h3>Popup</h3>
//           <h5 style={{margin: 0, color: '#4E5457'}}>Has access to this data:</h5>
//           <pre>{JSON.stringify(shape, null, 2)}</pre>
//           <button onClick={() => {
//             this.setState({
//               shapes: this.state.shapes.filter(i => i.id !== shape.id),
//             });
//           }}>Delete</button>
//         </div>;

//         this.state = {
//           shapes: [
//             {
//               id: uuid.v4(),
//               shape: CIRCLE,
//               x: 300,
//               y: 300,
//               width: 40,
//               height: 40,
//               allowMovement: false,

//               name: "Conference Room 1",
//               popup: this.shapePopup,
//             },
//             {
//               id: uuid.v4(),
//               shape: CIRCLE,
//               x: 646,
//               y: 450,
//               width: 40,
//               height: 40,
//               allowMovement: false,

//               name: "Cafeteria 1",
//               popup: this.shapePopup,
//             },
//           ],
//         };
//       }

//       render() {
//         return <Floorplan
//           image="https://i.imgur.com/FkE7cxK.png"
//           shapes={this.state.shapes}
//           onShapeMovement={(id, x, y) => {
//             this.setState({
//               shapes: this.state.shapes.map(s => {
//                 if (s.id === id) {
//                   return Object.assign({}, s, {x, y});
//                 } else {
//                   return s;
//                 }
//               }),
//             });
//           }}

//           onCreateShape={(x, y) => {
//             const id = uuid.v4();
//             this.setState({
//               shapes: [...this.state.shapes, {
//                 id, x, y,
//                 shape: CIRCLE,
//                 popup: this.shapePopup,
//                 width: 40,
//                 height: 40,
//                 allowMovement: true,
//                 name: `My new doorway with id ${id}`,
//               }],
//             });
//           }}
//         />;
//       }
//     }

//     return <FloorplanWrapper />;
//   })
//   .add('With shapes other than circles', () => {
//     class FloorplanWrapper extends React.Component {
//       constructor(props) {
//         super(props);


//         this.shapePopup = shape => <div style={{
//           width: 509,
//           height: 281,
//           padding: 20,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContents: 'center',
//         }}>
//           <h3>Popup</h3>
//           <h5 style={{margin: 0, color: '#4E5457'}}>Has access to this data:</h5>
//           <pre>{JSON.stringify(shape, null, 2)}</pre>
//           <button onClick={() => {
//             this.setState({
//               shapes: this.state.shapes.filter(i => i.id !== shape.id),
//             });
//           }}>Delete</button>
//         </div>;

//         this.state = {
//           shapes: [
//             {
//               id: uuid.v4(),
//               shape: CIRCLE,
//               x: 300,
//               y: 300,
//               width: 40,
//               height: 40,
//               allowMovement: false,

//               name: "Conference Room 1",
//               popup: this.shapePopup,
//             },
//             {
//               id: uuid.v4(),
//               shape: DPU,
//               x: 646,
//               y: 450,
//               width: 40,
//               height: 40,
//               allowMovement: false,

//               name: "Cafeteria 1",
//               popup: this.shapePopup,
//             },
//           ],
//         };
//       }

//       render() {
//         return <Floorplan
//           image="https://i.imgur.com/FkE7cxK.png"
//           shapes={this.state.shapes}
//           onShapeMovement={(id, x, y) => {
//             this.setState({
//               shapes: this.state.shapes.map(s => {
//                 if (s.id === id) {
//                   return Object.assign({}, s, {x, y});
//                 } else {
//                   return s;
//                 }
//               }),
//             });
//           }}

//           onCreateShape={(x, y) => {
//             const id = uuid.v4();
//             this.setState({
//               shapes: [...this.state.shapes, {
//                 id, x, y,
//                 shape: CIRCLE,
//                 popup: this.shapePopup,
//                 width: 40,
//                 height: 40,
//                 allowMovement: true,
//                 name: `My new doorway with id ${id}`,
//               }],
//             });
//           }}
//         />;
//       }
//     }

//     return <FloorplanWrapper />;
//   })
//   .add('With a 90-degree rotated floorplan', () => {
//     class FloorplanWrapper extends React.Component {
//       constructor(props) {
//         super(props);


//         this.shapePopup = shape => <div style={{
//           width: 509,
//           height: 281,
//           padding: 20,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContents: 'center',
//         }}>
//           <h3>Popup</h3>
//           <h5 style={{margin: 0, color: '#4E5457'}}>Has access to this data:</h5>
//           <pre>{JSON.stringify(shape, null, 2)}</pre>
//           <button onClick={() => {
//             this.setState({
//               shapes: this.state.shapes.filter(i => i.id !== shape.id),
//             });
//           }}>Delete</button>
//         </div>;

//         this.state = {
//           shapes: [
//             {
//               id: uuid.v4(),
//               shape: CIRCLE,
//               x: 0,
//               y: 0,
//               width: 40,
//               height: 40,
//               allowMovement: false,

//               name: "Conference Room 1",
//               popup: this.shapePopup,
//             },
//           ],
//         };
//       }

//       render() {
//         return <Floorplan
//           image="https://i.imgur.com/FkE7cxK.png"
//           imageRotation={90}
//           shapes={this.state.shapes}
//           onShapeMovement={(id, x, y) => {
//             this.setState({
//               shapes: this.state.shapes.map(s => {
//                 if (s.id === id) {
//                   return Object.assign({}, s, {x, y});
//                 } else {
//                   return s;
//                 }
//               }),
//             });
//           }}

//           onCreateShape={(x, y, floorplan) => {
//             const id = uuid.v4();
//             this.setState({
//               shapes: [...this.state.shapes, {
//                 id, x, y,
//                 shape: CIRCLE,
//                 popup: this.shapePopup,
//                 width: 40,
//                 height: 40,
//                 allowMovement: true,
//                 name: `My new doorway with id ${id}`,
//               }],
//             }, () => {
//               floorplan.selectShape(id);
//             });
//           }}
//         />;
//       }
//     }

//     return <FloorplanWrapper />;
//   })
