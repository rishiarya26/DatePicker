import React from "react";
import moment, { relativeTimeThreshold } from "moment";
import "./datePicker.css";
import DisplayDate from "./displayDate";
import DisplayCalender from "./displayCalender";
export default class DatePicker extends React.Component {
  weekdayshort = moment.weekdaysShort();

  state = {
    showCalendarTable: true,
    showMonthTable: false,
    dateObject: moment(),
    allmonths: moment.months(),
    showYearNav: false,
    selectedDay: moment().format("D"),
  };
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };

  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };

  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable,
    });
  };
  setMonth = (month) => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showCalendarTable: !this.state.showCalendarTable,
    });
  };

  showYearEditor = () => {
    this.setState({
      showYearNav: true,
      showCalendarTable: !this.state.showCalendarTable,
    });
  };

  onPrev = () => {
    let curr = "";
    if (this.state.showMonthTable == true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr),
    });
  };
  onNext = () => {
    let curr = "";
    if (this.state.showMonthTable == true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr),
    });
  };
  setYear = (year) => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showYearNav: !this.state.showYearNav,
      showMonthTable: !this.state.showMonthTable,
    });
  };
  onYearChange = (e) => {
    this.setYear(e.target.value);
  };

  onDayClick = (e, d) => {
    console.log("dayClick");
    this.setState(
      {
        selectedDay: d,
      },
      () => {
        console.log("SELECTED DAY: ", this.state.selectedDay);
      }
    );
  };

  handleToday = () => {
    let currentDate = moment();
    this.setState({ dateObject: currentDate });

    let date = this.currentDay();

    this.setState({ selectedDay: date });
  };

  handleShowDate = () => {
    let year = this.state.dateObject.format("Y");
    let month = this.state.dateObject.format("MMMM");
    // let date = this.state.dateObject.format("D");
    console.log(this.state.selectedDay + "/" + month + "/" + year);

    return this.state.selectedDay + "/" + month + "/" + year;
  };

  render() {
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{""}</td>);
    }
    let dayInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = d == this.currentDay() ? "today" : "";
      let selectedClass =
        d == this.state.selectedDay ? "today" : this.state.selectedDay;
      dayInMonth.push(
        <td key={d} className={`calendar-day ${selectedClass}`}>
          <span
            onClick={(e) => {
              this.onDayClick(e, d);
            }}
          >
            {d}
          </span>
        </td>
      );
    }
    var totalSlots = [...blanks, ...dayInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <>
        <DisplayDate
          selectedDay={this.state.selectedDay}
          dateObject={this.state.dateObject}
        />
        <DisplayCalender
          onPrev={this.onPrev}
          onNext={this.onNext}
          showMonth={this.showMonth}
          dateObject={this.state.dateObject}
          showMonthTable={this.state.showMonthTable}
          showYearEditor={this.showYearEditor}
          showYearNav={this.state.showYearNav}
          showCalendarTable={this.state.showCalendarTable}
          setYear={this.setYear}
          setMonth={this.setMonth}
          handleToday={this.handleToday}
          daysinmonth={daysinmonth}
        />
      </>
    );
  }
}
