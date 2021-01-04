import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SpacePicker, { SpacePickerContext, SpacePickerDropdown } from './';
import { spaceHierarchyFormatter } from '@density/lib-space-helpers';

const hierarchy = [
  {
    "id": "spc_768300163184722233",
    "name": "Ames, IA",
    "has_purview": true,
    "space_type": "campus",
    "daily_reset": "04:00:00",
    "inherits_time_segments": false,
    "time_segments": [
      {
        "id": "tsm_770768406717661950",
        "label": "Meeting Hours",
        "start": "09:00:00",
        "end": "17:00:00",
        "days": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ]
      }
    ],
    "capacity": null,
    "children": [
      {
        "id": "spc_768300251122499898",
        "name": "Ames HQ",
        "has_purview": true,
        "space_type": "building",
        "daily_reset": "04:00:00",
        "inherits_time_segments": false,
        "time_segments": [
          {
            "id": "tsm_771796034744484059",
            "label": "Working Hours",
            "start": "08:00:00",
            "end": "17:00:00",
            "days": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ]
          }
        ],
        "capacity": 1400,
        "children": [
          {
            "id": "spc_768300356001071420",
            "name": "1st Floor",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": 600
          },
          {
            "id": "spc_768300388121051453",
            "name": "2nd Floor",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": 600,
            "children": [
              {
                "id": "spc_768301526455157073",
                "name": "Room 202",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 4
              },
              {
                "id": "spc_768301566217158994",
                "name": "Room 203",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 4
              },
              {
                "id": "spc_768301615210824021",
                "name": "Room 204",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 4
              },
              {
                "id": "spc_768301647959949654",
                "name": "Room 205",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 4
              },
              {
                "id": "spc_768301688590172504",
                "name": "Room 206",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 12
              },
              {
                "id": "spc_768301730193473881",
                "name": "Room 207",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 12
              },
              {
                "id": "spc_768301764687429978",
                "name": "Room 208",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 10
              },
              {
                "id": "spc_772149685077934886",
                "name": "Room 209",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": null
              },
              {
                "id": "spc_772150609955521386",
                "name": "Room 210",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": null
              },
              {
                "id": "spc_768301482339467598",
                "name": "Womens Room",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 4
              }
            ]
          },
          {
            "id": "spc_768921812707835978",
            "name": "3rd Floor",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": 600,
            "children": [
              {
                "id": "spc_768922340200284248",
                "name": "Neighborhood A: Sales",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 24
              },
              {
                "id": "spc_768922386639618138",
                "name": "Neighborhood B: Engineering",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 24
              },
              {
                "id": "spc_768922429685760091",
                "name": "Neighborhood C: Finance & Engineering",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 24
              },
              {
                "id": "spc_768922483691618398",
                "name": "Neighborhood D: Marketing",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 20
              }
            ]
          },
          {
            "id": "spc_768300469201142081",
            "name": "4th Floor",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": 600,
            "children": [
              {
                "id": "spc_768300930276786505",
                "name": "All Star Cafe",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 600
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "spc_733498787296706930",
    "name": "Dallas Campus",
    "has_purview": true,
    "space_type": "campus",
    "daily_reset": "04:00:00",
    "inherits_time_segments": false,
    "time_segments": [
      {
        "id": "tsm_733498787930046835",
        "label": "Working Hours",
        "start": "08:00:00",
        "end": "17:00:00",
        "days": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ]
      }
    ],
    "capacity": null,
    "children": [
      {
        "id": "spc_733499665273586383",
        "name": "208 N Market St",
        "has_purview": true,
        "space_type": "building",
        "daily_reset": "04:00:00",
        "inherits_time_segments": false,
        "time_segments": [
          {
            "id": "tsm_771796452899815652",
            "label": "Working Hours",
            "start": "08:00:00",
            "end": "17:00:00",
            "days": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ]
          }
        ],
        "capacity": 120,
        "children": [
          {
            "id": "spc_733499844055794618",
            "name": "Market St - 1st Floor",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": 100,
            "children": [
              {
                "id": "spc_733505322513072884",
                "name": "Neighborhood: Marketing",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 80
              },
              {
                "id": "spc_733505397159101274",
                "name": "Neighborhood: Sales",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 40
              },
              {
                "id": "spc_733505198793687633",
                "name": "Open Seating Area",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 90
              }
            ]
          },
          {
            "id": "spc_733499883742299114",
            "name": "Market St - 2nd Floor",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": 100,
            "children": [
              {
                "id": "spc_733736844365136486",
                "name": "All Conference Rooms",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": null
              },
              {
                "id": "spc_733505838727037297",
                "name": "Conference Room A",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 8
              },
              {
                "id": "spc_733505915189199324",
                "name": "Conference Room B",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 10
              },
              {
                "id": "spc_733506001277289013",
                "name": "Conference Room C",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 16
              }
            ]
          }
        ]
      },
      {
        "id": "spc_751933880029675548",
        "name": "2550 Pacific Ave",
        "has_purview": true,
        "space_type": "building",
        "daily_reset": "04:00:00",
        "inherits_time_segments": false,
        "time_segments": [
          {
            "id": "tsm_771796511255167207",
            "label": "Working Hours",
            "start": "08:00:00",
            "end": "17:00:00",
            "days": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ]
          }
        ],
        "capacity": 180,
        "children": [
          {
            "id": "spc_751935846910787967",
            "name": "Pacific Ave - 3rd Floor",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": null,
            "children": [
              {
                "id": "spc_751936271760228393",
                "name": "Large Open Office",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 162
              },
              {
                "id": "spc_751937353534145323",
                "name": "Open Area: Engineering",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 130
              },
              {
                "id": "spc_751936546352923102",
                "name": "Small Open Office",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 110
              }
            ]
          },
          {
            "id": "spc_751935903529697760",
            "name": "Pacific Ave - 4th Floor",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": null,
            "children": [
              {
                "id": "spc_751937840664805938",
                "name": "Conference Room 4-A",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 12
              },
              {
                "id": "spc_751937908620919445",
                "name": "Conference Room 4-B",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 14
              },
              {
                "id": "spc_751938015944770376",
                "name": "Conference Room 4-C",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 15
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "spc_733501182353343413",
    "name": "NYC Campus",
    "has_purview": true,
    "space_type": "campus",
    "daily_reset": "04:00:00",
    "inherits_time_segments": false,
    "time_segments": [
      {
        "id": "tsm_733501182714053560",
        "label": "Working Hours",
        "start": "08:00:00",
        "end": "17:00:00",
        "days": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ]
      }
    ],
    "capacity": null,
    "children": [
      {
        "id": "spc_733501529398444428",
        "name": "5 Hanover Square",
        "has_purview": true,
        "space_type": "building",
        "daily_reset": "04:00:00",
        "inherits_time_segments": false,
        "time_segments": [
          {
            "id": "tsm_771796576375931117",
            "label": "Working Hours",
            "start": "08:00:00",
            "end": "17:00:00",
            "days": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ]
          }
        ],
        "capacity": 100,
        "children": [
          {
            "id": "spc_733501805211681563",
            "name": "Floor 17",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": 100,
            "children": [
              {
                "id": "spc_733541930868146711",
                "name": "Skyline Cafe",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": false,
                "time_segments": [
                  {
                    "id": "tsm_764206462787387773",
                    "label": "Dinner",
                    "start": "15:00:00",
                    "end": "20:00:00",
                    "days": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday"
                    ]
                  },
                  {
                    "id": "tsm_764206462942577023",
                    "label": "Breakfast",
                    "start": "08:00:00",
                    "end": "11:00:00",
                    "days": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday"
                    ]
                  },
                  {
                    "id": "tsm_764206462950965632",
                    "label": "Lunch",
                    "start": "11:00:00",
                    "end": "15:00:00",
                    "days": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday"
                    ]
                  }
                ],
                "capacity": 156
              }
            ]
          },
          {
            "id": "spc_733501838942274383",
            "name": "Floor 18",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": 50,
            "children": [
              {
                "id": "spc_733542457312018435",
                "name": "Tip-Top Cafe",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": false,
                "time_segments": [
                  {
                    "id": "tsm_764206719025807508",
                    "label": "Dinner",
                    "start": "15:00:00",
                    "end": "20:00:00",
                    "days": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday"
                    ]
                  },
                  {
                    "id": "tsm_764206719021613203",
                    "label": "Working Hours",
                    "start": "08:00:00",
                    "end": "17:00:00",
                    "days": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday"
                    ]
                  },
                  {
                    "id": "tsm_764206719030001813",
                    "label": "Breakfast",
                    "start": "08:00:00",
                    "end": "11:00:00",
                    "days": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday"
                    ]
                  },
                  {
                    "id": "tsm_764206719042584726",
                    "label": "Lunch",
                    "start": "11:00:00",
                    "end": "15:00:00",
                    "days": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday"
                    ]
                  }
                ],
                "capacity": 130
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "spc_755956453121982691",
    "name": "San Francisco Campus",
    "has_purview": true,
    "space_type": "campus",
    "daily_reset": "04:00:00",
    "inherits_time_segments": false,
    "time_segments": [],
    "capacity": null,
    "children": [
      {
        "id": "spc_755956609447887356",
        "name": "Main Building",
        "has_purview": true,
        "space_type": "building",
        "daily_reset": "04:00:00",
        "inherits_time_segments": false,
        "time_segments": [
          {
            "id": "tsm_771796757800550642",
            "label": "Working Hours",
            "start": "08:00:00",
            "end": "17:00:00",
            "days": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ]
          }
        ],
        "capacity": 100,
        "children": [
          {
            "id": "spc_755956662870737490",
            "name": "1st Floor",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": null,
            "children": [
              {
                "id": "spc_755956844278580074",
                "name": "Room 101",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 15
              },
              {
                "id": "spc_755956958443339851",
                "name": "Room 102",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 55
              }
            ]
          },
          {
            "id": "spc_755956688820896381",
            "name": "2nd Floor",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": null,
            "children": [
              {
                "id": "spc_755957174638739931",
                "name": "Room 201",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 100
              }
            ]
          },
          {
            "id": "spc_755956721951703719",
            "name": "3rd Floor",
            "has_purview": true,
            "space_type": "floor",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": null,
            "children": [
              {
                "id": "spc_755957309313647343",
                "name": "Room 301",
                "has_purview": true,
                "space_type": "space",
                "daily_reset": "04:00:00",
                "inherits_time_segments": true,
                "time_segments": [],
                "capacity": 8
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "spc_764201534631183287",
    "name": "Test Office Building",
    "has_purview": true,
    "space_type": "building",
    "daily_reset": "04:00:00",
    "inherits_time_segments": false,
    "time_segments": [
      {
        "id": "tsm_764201535440683962",
        "label": "Weekend Office Hours",
        "start": "12:00:00",
        "end": "16:00:00",
        "days": [
          "Sunday",
          "Saturday"
        ]
      },
      {
        "id": "tsm_764201535444878267",
        "label": "Working Hours",
        "start": "08:00:00",
        "end": "17:00:00",
        "days": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ]
      }
    ],
    "capacity": 1800,
    "children": [
      {
        "id": "spc_764201910176579700",
        "name": "Floor 2",
        "has_purview": true,
        "space_type": "floor",
        "daily_reset": "04:00:00",
        "inherits_time_segments": true,
        "time_segments": [],
        "capacity": null,
        "children": [
          {
            "id": "spc_764202047997215230",
            "name": "Test Conference Room A",
            "has_purview": true,
            "space_type": "space",
            "daily_reset": "04:00:00",
            "inherits_time_segments": true,
            "time_segments": [],
            "capacity": 10
          }
        ]
      },
      {
        "id": "spc_764201760695779977",
        "name": "Test Lobby",
        "has_purview": true,
        "space_type": "space",
        "daily_reset": "04:00:00",
        "inherits_time_segments": true,
        "time_segments": [],
        "capacity": null
      }
    ]
  },
  {
    "id": "spc_768187563067310387",
    "name": "Test Office Building - San Francisco",
    "has_purview": true,
    "space_type": "building",
    "daily_reset": "04:00:00",
    "inherits_time_segments": false,
    "time_segments": [],
    "capacity": null
  }
];
const formattedHierarchy = spaceHierarchyFormatter(hierarchy);

storiesOf('SpacePicker/Regular Space Picker', module)
  .add('Default Space Picker', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState(null);
      return (
        <SpacePicker
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  })
  .add('Space Picker: without search box', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState(null);
      return (
        <SpacePicker
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
          showSearchBox={false}
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  })
  .add('Space Picker: with ability to select multiple items', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState([]);
      return (
        <SpacePicker
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
          canSelectMultiple={true}
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  },
  {
    notes: `Test an edge case with filtering:

    1. Select a space (e.g. Ames)
    2. Filter to a view without the select space (e.g. by typing "Dallas")
    3. Select another space (e.g. Dallas)
    4. Undo the search and filter. Make sure that both spaces are still selected.
    `,
  })
  .add('Space Picker: with multi-select and auto-select children', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState([]);
      return (
        <SpacePicker
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
          canSelectMultiple={true}
          autoSelectChildren={true}
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  })
  .add('Space Picker: with all buildings disabled', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState(null);
      return (
        <SpacePicker
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
          isItemDisabled={i => i.space.space_type === 'building'}
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  })
  .add('Space Picker: with custom search placeholder', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState(null);
      return (
        <SpacePicker
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
          searchBoxPlaceholder="Custom placeholder"
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  })
  .add('Space Picker: with whole control disabled', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState(null);
      return (
        <SpacePicker
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
          disabled={true}
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  })
  .add('Space Picker: with "CARD_PICKER" context', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState(null);
      return (
        <SpacePickerContext.Provider value="CARD_PICKER">
          <SpacePicker
            value={selected}
            onChange={setSelected}
            formattedHierarchy={formattedHierarchy}
            searchBoxPlaceholder="Custom placeholder"
          />
        </SpacePickerContext.Provider>
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <p>This context has no padding on either side, as well as a transparent background.</p>
        <Wrapper />
      </div>
    );
  })

storiesOf('SpacePicker/Dropdown Space Picker', module)
  .add('Dropdown Space Picker', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState(null);
      return (
        <SpacePickerDropdown
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  })
  .add('Dropdown Space Picker: with custom dropdown width', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState(null);
      return (
        <SpacePickerDropdown
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
          width="100%"
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  })
  .add('Dropdown Space Picker: with custom dropdown placeholder', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState(null);
      return (
        <SpacePickerDropdown
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
          width="100%"
          placeholder="Custom placeholder"
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  })
  .add('Dropdown Space Picker: with multiple select', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState([]);
      return (
        <SpacePickerDropdown
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
          canSelectMultiple={true}
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  })
  .add('Dropdown Space Picker: with multiple select and auto-select children', () => {
    function Wrapper() {
      const [ selected, setSelected ] = useState([]);
      return (
        <SpacePickerDropdown
          value={selected}
          onChange={setSelected}
          formattedHierarchy={formattedHierarchy}
          canSelectMultiple={true}
          autoSelectChildren={true}
        />
      );
    }

    return (
      <div style={{width: 300, height: 300, margin: '100px auto'}}>
        <Wrapper />
      </div>
    );
  })
