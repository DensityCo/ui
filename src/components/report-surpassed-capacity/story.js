import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ReportSurpassedCapacity from './';

storiesOf('ReportSurpassedCapacity', module)
  .addWithInfo('Default', () => (
    <div style={{width: '100%',paddingTop: 100}}>
      <ReportSurpassedCapacity
        title="Over capacity"
        startDate={moment("2018-03-14T00:00:00-04:00")}
        endDate={moment("2018-03-18T00:00:00-04:00")}
        spaces={["Cafe Bruno"]}
        timeSegment={{
          id: 'tsm_XXX',
          name: 'Breakfast',
          start: '09:00:00',
          end: '17:00:00',
          days: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
          ],
          spaces: [ /* ... */ ],
        }}
        capacity={100}
        quietBusyThreshold={0.40}
        busyOverCapacityThreshold={0.60}
        data={[
          [
            {count: 20, start: '09:00:00', end: '09:05:00'},
            {count: 50, start: '09:05:00', end: '09:30:00'},
            {count: 95, start: '09:30:00', end: '09:45:00'},
            {count: 50, start: '09:45:00', end: '10:00:00'},
            {count: 20, start: '10:00:00', end: '10:30:00'},
          ],
          [
            {count: 20, start: '09:00:00', end: '09:05:00'},
            {count: 50, start: '09:05:00', end: '09:10:00'},
            {count: 90, start: '09:10:00', end: '09:15:00'},
          ],
          [
            {count: 20, start: '09:00:00', end: '09:05:00'},
            {count: 50, start: '09:05:00', end: '09:10:00'},
            {count: 90, start: '09:10:00', end: '09:15:00'},
          ],
          [
            {count: 20, start: '09:00:00', end: '09:05:00'},
            {count: 50, start: '09:05:00', end: '09:10:00'},
            {count: 90, start: '09:10:00', end: '09:15:00'},
          ],
          [
            {count: 20, start: '09:00:00', end: '09:05:00'},
            {count: 50, start: '09:05:00', end: '09:10:00'},
            {count: 90, start: '09:10:00', end: '09:15:00'},
          ],
        ]}
      />
    </div>
  ))
  .addWithInfo('With different business thresholds', () => (
    <div style={{width: '100%',paddingTop: 100}}>
      <ReportSurpassedCapacity
        title="Over capacity"
        startDate={moment("2018-03-14T00:00:00-04:00")}
        endDate={moment("2018-03-18T00:00:00-04:00")}
        spaces={["Cafe Bruno"]}
        timeSegment={{
          id: 'tsm_XXX',
          name: 'Breakfast',
          start: '09:00:00',
          end: '17:00:00',
          days: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
          ],
          spaces: [ /* ... */ ],
        }}
        capacity={100}
        quietBusyThreshold={0.10}
        busyOverCapacityThreshold={0.90}
        data={[
          [
            {count: 20, start: '09:00:00', end: '09:05:00'},
            {count: 50, start: '09:05:00', end: '09:30:00'},
            {count: 95, start: '09:30:00', end: '09:45:00'},
            {count: 50, start: '09:45:00', end: '10:00:00'},
            {count: 20, start: '10:00:00', end: '10:30:00'},
          ],
          [
            {count: 20, start: '09:00:00', end: '09:05:00'},
            {count: 50, start: '09:05:00', end: '09:10:00'},
            {count: 90, start: '09:10:00', end: '09:15:00'},
          ],
          [
            {count: 20, start: '09:00:00', end: '09:05:00'},
            {count: 50, start: '09:05:00', end: '09:10:00'},
            {count: 90, start: '09:10:00', end: '09:15:00'},
          ],
          [
            {count: 20, start: '09:00:00', end: '09:05:00'},
            {count: 50, start: '09:05:00', end: '09:10:00'},
            {count: 90, start: '09:10:00', end: '09:15:00'},
          ],
          [
            {count: 20, start: '09:00:00', end: '09:05:00'},
            {count: 50, start: '09:05:00', end: '09:10:00'},
            {count: 90, start: '09:10:00', end: '09:15:00'},
          ],
        ]}
      />
    </div>
  ))

  .addWithInfo('Example', () => (
    <div style={{width: '100%',paddingTop: 100}}>
      <ReportSurpassedCapacity {...props} />
    </div>
  ))

const props = {
  "title": "Surpassed capacity example",
  "startDate": moment("2018-10-21T07:00:00.000Z"),
  "endDate": moment("2018-10-28T06:59:59.999Z"),
  "spaces": [
    "222 2nd St Cafe (Nourish)"
  ],
  "capacity": 480,
  "busyOverCapacityThreshold": 0.6,
  "quietBusyThreshold": 0.4,
  "timeSegment": {
    "id": "tsm_578389484605801086",
    "name": "Lunch",
    "start": "10:45:00",
    "end": "14:00:00",
    "days": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "spaces": [
      {
        "spaceId": "spc_546327322177831550",
        "name": "222 2nd Street"
      },
      {
        "spaceId": "spc_275872166560399620",
        "name": "222 2nd St Cafe (Nourish)"
      },
      {
        "spaceId": "spc_509382558056710578",
        "name": "350 5th Ave - Empire St Cafe (Five Points)"
      },
      {
        "spaceId": "spc_526493834712973566",
        "name": "528 W Monroe Café (The L Café)"
      },
      {
        "spaceId": "spc_512303557785944774",
        "name": "580 N Mary (Café Elevate)"
      },
      {
        "spaceId": "spc_530402987424612706",
        "name": "580 N Mary Cafe (Elevate Zone 1)"
      },
      {
        "spaceId": "spc_530403023940223416",
        "name": "580 N Mary Cafe (Elevate Zone 2)"
      },
      {
        "spaceId": "spc_499352558423245806",
        "name": "605 W Maude Ave Cafe (Brick and Mortar)"
      },
      {
        "spaceId": "spc_512309726315282581",
        "name": "700 Middlefield Bldg. 3 (Mezzo Cafe)"
      },
      {
        "spaceId": "spc_512309929307013488",
        "name": "700 Middlefield Bldg. 4 (Nosh Cafe)"
      },
      {
        "spaceId": "spc_512087121301864976",
        "name": "950 W Maude Ave Cafe (Journey Market Place)"
      }
    ]
  },
  "data": [
    [],
    [
      {
        "start": "10:45:00",
        "end": "10:49:59",
        "count": 74
      },
      {
        "start": "10:50:00",
        "end": "10:54:59",
        "count": 72
      },
      {
        "start": "10:55:00",
        "end": "10:59:59",
        "count": 73
      },
      {
        "start": "11:00:00",
        "end": "11:04:59",
        "count": 82
      },
      {
        "start": "11:05:00",
        "end": "11:09:59",
        "count": 112
      },
      {
        "start": "11:10:00",
        "end": "11:14:59",
        "count": 131
      },
      {
        "start": "11:15:00",
        "end": "11:19:59",
        "count": 129
      },
      {
        "start": "11:20:00",
        "end": "11:24:59",
        "count": 144
      },
      {
        "start": "11:25:00",
        "end": "11:29:59",
        "count": 154
      },
      {
        "start": "11:30:00",
        "end": "11:34:59",
        "count": 162
      },
      {
        "start": "11:35:00",
        "end": "11:39:59",
        "count": 199
      },
      {
        "start": "11:40:00",
        "end": "11:44:59",
        "count": 223
      },
      {
        "start": "11:45:00",
        "end": "11:49:59",
        "count": 253
      },
      {
        "start": "11:50:00",
        "end": "11:54:59",
        "count": 242
      },
      {
        "start": "11:55:00",
        "end": "11:59:59",
        "count": 269
      },
      {
        "start": "12:00:00",
        "end": "12:04:59",
        "count": 288
      },
      {
        "start": "12:05:00",
        "end": "12:09:59",
        "count": 297
      },
      {
        "start": "12:10:00",
        "end": "12:14:59",
        "count": 362
      },
      {
        "start": "12:15:00",
        "end": "12:19:59",
        "count": 377
      },
      {
        "start": "12:20:00",
        "end": "12:24:59",
        "count": 371
      },
      {
        "start": "12:25:00",
        "end": "12:29:59",
        "count": 362
      },
      {
        "start": "12:30:00",
        "end": "12:34:59",
        "count": 347
      },
      {
        "start": "12:35:00",
        "end": "12:39:59",
        "count": 312
      },
      {
        "start": "12:40:00",
        "end": "12:44:59",
        "count": 338
      },
      {
        "start": "12:45:00",
        "end": "12:49:59",
        "count": 335
      },
      {
        "start": "12:50:00",
        "end": "12:54:59",
        "count": 337
      },
      {
        "start": "12:55:00",
        "end": "12:59:59",
        "count": 301
      },
      {
        "start": "13:00:00",
        "end": "13:04:59",
        "count": 277
      },
      {
        "start": "13:05:00",
        "end": "13:09:59",
        "count": 240
      },
      {
        "start": "13:10:00",
        "end": "13:14:59",
        "count": 253
      },
      {
        "start": "13:15:00",
        "end": "13:19:59",
        "count": 215
      },
      {
        "start": "13:20:00",
        "end": "13:24:59",
        "count": 199
      },
      {
        "start": "13:25:00",
        "end": "13:29:59",
        "count": 181
      },
      {
        "start": "13:30:00",
        "end": "13:34:59",
        "count": 152
      },
      {
        "start": "13:35:00",
        "end": "13:39:59",
        "count": 138
      },
      {
        "start": "13:40:00",
        "end": "13:44:59",
        "count": 120
      },
      {
        "start": "13:45:00",
        "end": "13:49:59",
        "count": 111
      },
      {
        "start": "13:50:00",
        "end": "13:54:59",
        "count": 111
      },
      {
        "start": "13:55:00",
        "end": "13:59:59",
        "count": 109
      }
    ],
    [
      {
        "start": "10:45:00",
        "end": "10:49:59",
        "count": 47
      },
      {
        "start": "10:50:00",
        "end": "10:54:59",
        "count": 46
      },
      {
        "start": "10:55:00",
        "end": "10:59:59",
        "count": 54
      },
      {
        "start": "11:00:00",
        "end": "11:04:59",
        "count": 59
      },
      {
        "start": "11:05:00",
        "end": "11:09:59",
        "count": 74
      },
      {
        "start": "11:10:00",
        "end": "11:14:59",
        "count": 96
      },
      {
        "start": "11:15:00",
        "end": "11:19:59",
        "count": 109
      },
      {
        "start": "11:20:00",
        "end": "11:24:59",
        "count": 115
      },
      {
        "start": "11:25:00",
        "end": "11:29:59",
        "count": 133
      },
      {
        "start": "11:30:00",
        "end": "11:34:59",
        "count": 141
      },
      {
        "start": "11:35:00",
        "end": "11:39:59",
        "count": 170
      },
      {
        "start": "11:40:00",
        "end": "11:44:59",
        "count": 196
      },
      {
        "start": "11:45:00",
        "end": "11:49:59",
        "count": 219
      },
      {
        "start": "11:50:00",
        "end": "11:54:59",
        "count": 236
      },
      {
        "start": "11:55:00",
        "end": "11:59:59",
        "count": 264
      },
      {
        "start": "12:00:00",
        "end": "12:04:59",
        "count": 249
      },
      {
        "start": "12:05:00",
        "end": "12:09:59",
        "count": 245
      },
      {
        "start": "12:10:00",
        "end": "12:14:59",
        "count": 306
      },
      {
        "start": "12:15:00",
        "end": "12:19:59",
        "count": 334
      },
      {
        "start": "12:20:00",
        "end": "12:24:59",
        "count": 373
      },
      {
        "start": "12:25:00",
        "end": "12:29:59",
        "count": 374
      },
      {
        "start": "12:30:00",
        "end": "12:34:59",
        "count": 345
      },
      {
        "start": "12:35:00",
        "end": "12:39:59",
        "count": 335
      },
      {
        "start": "12:40:00",
        "end": "12:44:59",
        "count": 338
      },
      {
        "start": "12:45:00",
        "end": "12:49:59",
        "count": 311
      },
      {
        "start": "12:50:00",
        "end": "12:54:59",
        "count": 295
      },
      {
        "start": "12:55:00",
        "end": "12:59:59",
        "count": 256
      },
      {
        "start": "13:00:00",
        "end": "13:04:59",
        "count": 197
      },
      {
        "start": "13:05:00",
        "end": "13:09:59",
        "count": 188
      },
      {
        "start": "13:10:00",
        "end": "13:14:59",
        "count": 212
      },
      {
        "start": "13:15:00",
        "end": "13:19:59",
        "count": 189
      },
      {
        "start": "13:20:00",
        "end": "13:24:59",
        "count": 178
      },
      {
        "start": "13:25:00",
        "end": "13:29:59",
        "count": 162
      },
      {
        "start": "13:30:00",
        "end": "13:34:59",
        "count": 136
      },
      {
        "start": "13:35:00",
        "end": "13:39:59",
        "count": 132
      },
      {
        "start": "13:40:00",
        "end": "13:44:59",
        "count": 140
      },
      {
        "start": "13:45:00",
        "end": "13:49:59",
        "count": 126
      },
      {
        "start": "13:50:00",
        "end": "13:54:59",
        "count": 103
      },
      {
        "start": "13:55:00",
        "end": "13:59:59",
        "count": 83
      }
    ],
    [
      {
        "start": "10:45:00",
        "end": "10:49:59",
        "count": 70
      },
      {
        "start": "10:50:00",
        "end": "10:54:59",
        "count": 70
      },
      {
        "start": "10:55:00",
        "end": "10:59:59",
        "count": 71
      },
      {
        "start": "11:00:00",
        "end": "11:04:59",
        "count": 72
      },
      {
        "start": "11:05:00",
        "end": "11:09:59",
        "count": 98
      },
      {
        "start": "11:10:00",
        "end": "11:14:59",
        "count": 112
      },
      {
        "start": "11:15:00",
        "end": "11:19:59",
        "count": 137
      },
      {
        "start": "11:20:00",
        "end": "11:24:59",
        "count": 154
      },
      {
        "start": "11:25:00",
        "end": "11:29:59",
        "count": 149
      },
      {
        "start": "11:30:00",
        "end": "11:34:59",
        "count": 167
      },
      {
        "start": "11:35:00",
        "end": "11:39:59",
        "count": 184
      },
      {
        "start": "11:40:00",
        "end": "11:44:59",
        "count": 198
      },
      {
        "start": "11:45:00",
        "end": "11:49:59",
        "count": 228
      },
      {
        "start": "11:50:00",
        "end": "11:54:59",
        "count": 274
      },
      {
        "start": "11:55:00",
        "end": "11:59:59",
        "count": 279
      },
      {
        "start": "12:00:00",
        "end": "12:04:59",
        "count": 271
      },
      {
        "start": "12:05:00",
        "end": "12:09:59",
        "count": 316
      },
      {
        "start": "12:10:00",
        "end": "12:14:59",
        "count": 331
      },
      {
        "start": "12:15:00",
        "end": "12:19:59",
        "count": 338
      },
      {
        "start": "12:20:00",
        "end": "12:24:59",
        "count": 367
      },
      {
        "start": "12:25:00",
        "end": "12:29:59",
        "count": 360
      },
      {
        "start": "12:30:00",
        "end": "12:34:59",
        "count": 332
      },
      {
        "start": "12:35:00",
        "end": "12:39:59",
        "count": 332
      },
      {
        "start": "12:40:00",
        "end": "12:44:59",
        "count": 364
      },
      {
        "start": "12:45:00",
        "end": "12:49:59",
        "count": 359
      },
      {
        "start": "12:50:00",
        "end": "12:54:59",
        "count": 313
      },
      {
        "start": "12:55:00",
        "end": "12:59:59",
        "count": 276
      },
      {
        "start": "13:00:00",
        "end": "13:04:59",
        "count": 224
      },
      {
        "start": "13:05:00",
        "end": "13:09:59",
        "count": 225
      },
      {
        "start": "13:10:00",
        "end": "13:14:59",
        "count": 228
      },
      {
        "start": "13:15:00",
        "end": "13:19:59",
        "count": 216
      },
      {
        "start": "13:20:00",
        "end": "13:24:59",
        "count": 193
      },
      {
        "start": "13:25:00",
        "end": "13:29:59",
        "count": 162
      },
      {
        "start": "13:30:00",
        "end": "13:34:59",
        "count": 159
      },
      {
        "start": "13:35:00",
        "end": "13:39:59",
        "count": 142
      },
      {
        "start": "13:40:00",
        "end": "13:44:59",
        "count": 149
      },
      {
        "start": "13:45:00",
        "end": "13:49:59",
        "count": 135
      },
      {
        "start": "13:50:00",
        "end": "13:54:59",
        "count": 122
      },
      {
        "start": "13:55:00",
        "end": "13:59:59",
        "count": 117
      }
    ],
    [
      {
        "start": "10:45:00",
        "end": "10:49:59",
        "count": 59
      },
      {
        "start": "10:50:00",
        "end": "10:54:59",
        "count": 56
      },
      {
        "start": "10:55:00",
        "end": "10:59:59",
        "count": 57
      },
      {
        "start": "11:00:00",
        "end": "11:04:59",
        "count": 64
      },
      {
        "start": "11:05:00",
        "end": "11:09:59",
        "count": 87
      },
      {
        "start": "11:10:00",
        "end": "11:14:59",
        "count": 108
      },
      {
        "start": "11:15:00",
        "end": "11:19:59",
        "count": 108
      },
      {
        "start": "11:20:00",
        "end": "11:24:59",
        "count": 134
      },
      {
        "start": "11:25:00",
        "end": "11:29:59",
        "count": 131
      },
      {
        "start": "11:30:00",
        "end": "11:34:59",
        "count": 145
      },
      {
        "start": "11:35:00",
        "end": "11:39:59",
        "count": 177
      },
      {
        "start": "11:40:00",
        "end": "11:44:59",
        "count": 225
      },
      {
        "start": "11:45:00",
        "end": "11:49:59",
        "count": 239
      },
      {
        "start": "11:50:00",
        "end": "11:54:59",
        "count": 247
      },
      {
        "start": "11:55:00",
        "end": "11:59:59",
        "count": 285
      },
      {
        "start": "12:00:00",
        "end": "12:04:59",
        "count": 269
      },
      {
        "start": "12:05:00",
        "end": "12:09:59",
        "count": 311
      },
      {
        "start": "12:10:00",
        "end": "12:14:59",
        "count": 370
      },
      {
        "start": "12:15:00",
        "end": "12:19:59",
        "count": 403
      },
      {
        "start": "12:20:00",
        "end": "12:24:59",
        "count": 408
      },
      {
        "start": "12:25:00",
        "end": "12:29:59",
        "count": 400
      },
      {
        "start": "12:30:00",
        "end": "12:34:59",
        "count": 373
      },
      {
        "start": "12:35:00",
        "end": "12:39:59",
        "count": 367
      },
      {
        "start": "12:40:00",
        "end": "12:44:59",
        "count": 395
      },
      {
        "start": "12:45:00",
        "end": "12:49:59",
        "count": 375
      },
      {
        "start": "12:50:00",
        "end": "12:54:59",
        "count": 343
      },
      {
        "start": "12:55:00",
        "end": "12:59:59",
        "count": 282
      },
      {
        "start": "13:00:00",
        "end": "13:04:59",
        "count": 248
      },
      {
        "start": "13:05:00",
        "end": "13:09:59",
        "count": 220
      },
      {
        "start": "13:10:00",
        "end": "13:14:59",
        "count": 220
      },
      {
        "start": "13:15:00",
        "end": "13:19:59",
        "count": 210
      },
      {
        "start": "13:20:00",
        "end": "13:24:59",
        "count": 187
      },
      {
        "start": "13:25:00",
        "end": "13:29:59",
        "count": 170
      },
      {
        "start": "13:30:00",
        "end": "13:34:59",
        "count": 158
      },
      {
        "start": "13:35:00",
        "end": "13:39:59",
        "count": 150
      },
      {
        "start": "13:40:00",
        "end": "13:44:59",
        "count": 139
      },
      {
        "start": "13:45:00",
        "end": "13:49:59",
        "count": 111
      },
      {
        "start": "13:50:00",
        "end": "13:54:59",
        "count": 112
      },
      {
        "start": "13:55:00",
        "end": "13:59:59",
        "count": 87
      }
    ],
    [
      {
        "start": "10:45:00",
        "end": "10:49:59",
        "count": 62
      },
      {
        "start": "10:50:00",
        "end": "10:54:59",
        "count": 63
      },
      {
        "start": "10:55:00",
        "end": "10:59:59",
        "count": 65
      },
      {
        "start": "11:00:00",
        "end": "11:04:59",
        "count": 64
      },
      {
        "start": "11:05:00",
        "end": "11:09:59",
        "count": 95
      },
      {
        "start": "11:10:00",
        "end": "11:14:59",
        "count": 95
      },
      {
        "start": "11:15:00",
        "end": "11:19:59",
        "count": 103
      },
      {
        "start": "11:20:00",
        "end": "11:24:59",
        "count": 111
      },
      {
        "start": "11:25:00",
        "end": "11:29:59",
        "count": 120
      },
      {
        "start": "11:30:00",
        "end": "11:34:59",
        "count": 122
      },
      {
        "start": "11:35:00",
        "end": "11:39:59",
        "count": 144
      },
      {
        "start": "11:40:00",
        "end": "11:44:59",
        "count": 170
      },
      {
        "start": "11:45:00",
        "end": "11:49:59",
        "count": 202
      },
      {
        "start": "11:50:00",
        "end": "11:54:59",
        "count": 232
      },
      {
        "start": "11:55:00",
        "end": "11:59:59",
        "count": 245
      },
      {
        "start": "12:00:00",
        "end": "12:04:59",
        "count": 256
      },
      {
        "start": "12:05:00",
        "end": "12:09:59",
        "count": 295
      },
      {
        "start": "12:10:00",
        "end": "12:14:59",
        "count": 360
      },
      {
        "start": "12:15:00",
        "end": "12:19:59",
        "count": 408
      },
      {
        "start": "12:20:00",
        "end": "12:24:59",
        "count": 424
      },
      {
        "start": "12:25:00",
        "end": "12:29:59",
        "count": 439
      },
      {
        "start": "12:30:00",
        "end": "12:34:59",
        "count": 430
      },
      {
        "start": "12:35:00",
        "end": "12:39:59",
        "count": 433
      },
      {
        "start": "12:40:00",
        "end": "12:44:59",
        "count": 432
      },
      {
        "start": "12:45:00",
        "end": "12:49:59",
        "count": 385
      },
      {
        "start": "12:50:00",
        "end": "12:54:59",
        "count": 346
      },
      {
        "start": "12:55:00",
        "end": "12:59:59",
        "count": 308
      },
      {
        "start": "13:00:00",
        "end": "13:04:59",
        "count": 251
      },
      {
        "start": "13:05:00",
        "end": "13:09:59",
        "count": 252
      },
      {
        "start": "13:10:00",
        "end": "13:14:59",
        "count": 243
      },
      {
        "start": "13:15:00",
        "end": "13:19:59",
        "count": 242
      },
      {
        "start": "13:20:00",
        "end": "13:24:59",
        "count": 248
      },
      {
        "start": "13:25:00",
        "end": "13:29:59",
        "count": 229
      },
      {
        "start": "13:30:00",
        "end": "13:34:59",
        "count": 202
      },
      {
        "start": "13:35:00",
        "end": "13:39:59",
        "count": 178
      },
      {
        "start": "13:40:00",
        "end": "13:44:59",
        "count": 146
      },
      {
        "start": "13:45:00",
        "end": "13:49:59",
        "count": 147
      },
      {
        "start": "13:50:00",
        "end": "13:54:59",
        "count": 134
      },
      {
        "start": "13:55:00",
        "end": "13:59:59",
        "count": 123
      }
    ],
    []
  ]
}
