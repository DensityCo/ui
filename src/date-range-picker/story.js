import "./styles.module.scss";

import DateRangePicker, { DateRangePickerContext } from "./index";

import React from "react";
import { action } from "@storybook/addon-actions";
import moment from "moment";
import { storiesOf } from "@storybook/react";

// used in multiple stories
const commonRanges = [
  {
    id: "WEEK_TO_DATE",
    name: "Week to date",
    startDate: moment().startOf("week"),
    endDate: moment(),
  },
  {
    id: "MONTH_TO_DATE",
    name: "Month to date",
    startDate: moment().startOf("month"),
    endDate: moment(),
  },
  {
    id: "QUARTER_TO_DATE",
    name: "Quarter to date",
    startDate: moment().startOf("quarter"),
    endDate: moment(),
  },
  {
    id: "LAST_WEEK",
    name: "Last week",
    startDate: moment()
      .subtract(1, "week")
      .startOf("week"),
    endDate: moment()
      .subtract(1, "week")
      .endOf("week"),
  },
  {
    id: "LAST_MONTH",
    name: "Last month",
    startDate: moment()
      .subtract(1, "month")
      .startOf("month"),
    endDate: moment()
      .subtract(1, "month")
      .endOf("month"),
  },
  {
    id: "LAST_QUARTER",
    name: "Last quarter",
    startDate: moment()
      .subtract(1, "quarter")
      .startOf("quarter"),
    endDate: moment()
      .subtract(1, "quarter")
      .endOf("quarter"),
  },
  {
    id: "LAST_7_DAYS",
    name: "Last 7 days",
    startDate: moment().subtract(1, "week"),
    endDate: moment(),
  },
  {
    id: "LAST_30_DAYS",
    name: "Last 30 days",
    startDate: moment().subtract(1, "month"),
    endDate: moment(),
  },
  {
    id: "LAST_90_DAYS",
    name: "Last 90 days",
    startDate: moment().subtract(1, "quarter"),
    endDate: moment(),
  },
];

storiesOf("DateRangePicker", module)
  .add("Open, start date selected", () => (
    <DateRangePicker
      onChange={action("dates change")}
      onFocusChange={action("focus")}
      focusedInput="startDate"
      startDate={moment()}
      endDate={moment().subtract(1, "day")}
    />
  ))
  .add("With common date ranges", () => {
    return (
      <DateRangePicker
        onChange={action("dates change")}
        onFocusChange={action("focus")}
        focusedInput="startDate"
        startDate={moment()}
        endDate={moment().subtract(1, "day")}
        commonRanges={commonRanges}
        onSelectCommonRange={action("common range selected")}
      />
    );
  })
  .add("Floated right", () => (
    <div style={{ paddingLeft: 500, width: 400 }}>
      <DateRangePicker
        anchor="ANCHOR_RIGHT"
        onChange={action("dates change")}
        onFocusChange={action("focus")}
        focusedInput="startDate"
        startDate={moment()}
        endDate={moment().subtract(1, "day")}
      />
    </div>
  ))
  .add("Floated right with common date ranges", () => {
    return (
      <div style={{ paddingLeft: 500, width: 400 }}>
        <DateRangePicker
          anchor="ANCHOR_RIGHT"
          onChange={action("dates change")}
          onFocusChange={action("focus")}
          focusedInput="startDate"
          startDate={moment()}
          endDate={moment().subtract(1, "day")}
          commonRanges={commonRanges}
          onSelectCommonRange={action("common range selected")}
        />
      </div>
    );
  })
  .add("Interactive", () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          focus: null,
          startDate: moment(),
          endDate: moment().add(1, "day"),
        };
      }
      render() {
        return (
          <DateRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={(e) =>
              this.setState({ startDate: e.startDate, endDate: e.endDate })
            }
            focusedInput={this.state.focus}
            onFocusChange={(focus) => this.setState({ focus })}
            isOutsideRange={(day) => moment(day).diff(moment()) > 999999999}
          />
        );
      }
    }

    return <Wrapper />;
  })
  .add("Interactive with auto-close", () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          focus: null,
          startDate: moment(),
          endDate: moment().add(1, "day"),
        };
      }
      render() {
        return (
          <DateRangePicker
            autoClose={true}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={(e) =>
              this.setState({ startDate: e.startDate, endDate: e.endDate })
            }
            focusedInput={this.state.focus}
            onFocusChange={(focus) => this.setState({ focus })}
          />
        );
      }
    }

    return <Wrapper />;
  })
  .add("Interactive with common date ranges", () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          startDate: moment(),
          endDate: moment().add(1, "day"),
        };
      }
      render() {
        return (
          <DateRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={(e) =>
              this.setState({ startDate: e.startDate, endDate: e.endDate })
            }
            commonRanges={commonRanges}
            onSelectCommonRange={(commonRange) => {
              this.setState({
                startDate: commonRange.startDate,
                endDate: commonRange.endDate,
              });
            }}
            onOpenCommonRangeList={action("common range list opened")}
          />
        );
      }
    }

    return <Wrapper />;
  })
  .add("Interactive with common date ranges and subtitles", () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          focus: null,
          startDate: moment(),
          endDate: moment().add(1, "day"),
        };
      }
      render() {
        return (
          <DateRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={(e) =>
              this.setState({ startDate: e.startDate, endDate: e.endDate })
            }
            focusedInput={this.state.focus}
            onFocusChange={(focus) => this.setState({ focus })}
            commonRanges={commonRanges}
            showCommonRangeSubtitles={true}
            onSelectCommonRange={(commonRange) => {
              this.setState({
                startDate: commonRange.startDate,
                endDate: commonRange.endDate,
              });
            }}
            onOpenCommonRangeList={action("common range list opened")}
          />
        );
      }
    }

    return <Wrapper />;
  })
  .add("Interactive and not floating", () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          startDate: moment(),
          endDate: moment().add(1, "day"),
        };
      }
      render() {
        return (
          <DateRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            floating={false}
            onChange={(e) =>
              this.setState({ startDate: e.startDate, endDate: e.endDate })
            }
            commonRanges={commonRanges}
            onSelectCommonRange={(commonRange) => {
              this.setState({
                startDate: commonRange.startDate,
                endDate: commonRange.endDate,
              });
            }}
            onOpenCommonRangeList={action("common range list opened")}
          />
        );
      }
    }

    return <Wrapper />;
  })
  .add("With TIME_RANGE_CONTROL_BAR context", () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          focus: null,
          startDate: moment(),
          endDate: moment().add(1, "day"),
        };
      }
      render() {
        return (
          <DateRangePickerContext.Provider value="TIME_RANGE_CONTROL_BAR">
            <DateRangePicker
              autoClose={true}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={(e) =>
                this.setState({ startDate: e.startDate, endDate: e.endDate })
              }
              focusedInput={this.state.focus}
              onFocusChange={(focus) => this.setState({ focus })}
            />
          </DateRangePickerContext.Provider>
        );
      }
    }

    return <Wrapper />;
  })
  .add("With NO_HEADER context", () => {
    class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          focus: null,
          startDate: moment(),
          endDate: moment().add(1, "day"),
        };
      }
      render() {
        return (
          <DateRangePickerContext.Provider value="NO_HEADER">
            <DateRangePicker
              onChange={action("dates change")}
              onFocusChange={action("focus")}
              focusedInput="startDate"
              startDate={moment()}
              numberOfMonths={1}
              endDate={moment().add(3, "day")}
            />
          </DateRangePickerContext.Provider>
        );
      }
    }

    return <Wrapper />;
  })
  .add("With deprecated SMALL_WIDTH context", () => (
    <DateRangePickerContext.Provider value="SMALL_WIDTH">
      <DateRangePicker
        onChange={action("dates change")}
        onFocusChange={action("focus")}
        focusedInput="startDate"
        startDate={moment()}
        endDate={moment().subtract(1, "day")}
        numberOfMonths={1}
        commonRanges={commonRanges}
        onSelectCommonRange={action("common range selected")}
      />
    </DateRangePickerContext.Provider>
  ));
