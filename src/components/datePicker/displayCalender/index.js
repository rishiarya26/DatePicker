import React from "react";
import moment from "moment";
import { range } from "moment-range";
import CalenderNavbar from "./calendarNavbar";
import CalendarContent from "./calendarContent";

export default function DisplayCalender(props) {
  const {
    onPrev,
    onNext,
    showMonth,
    daysinmonth,
    dateObject,
    showMonthTable,
    showYearEditor,
    showYearNav,
    showCalendarTable,
    setYear,
    setMonth,
    handleToday,
  } = props;
  const year = () => {
    return dateObject.format("Y");
  };

  let weekdayshort = moment.weekdaysShort();
  const month = () => {
    return dateObject.format("MMMM");
  };

  let weekdayshortname = weekdayshort.map((day) => {
    return <th key={day}>{day}</th>;
  });

  const getDates = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  };

  let YearTable = (props) => {
    console.log(props);
    let months = [];
    let nextten = moment()
      .set("year", "2009")
      .add("year", 35)
      .format("Y");

    let tenyear = getDates("2008", nextten);

    tenyear.map((data) => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={(e) => {
            setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Year</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };

  const MonthList = (props) => {
    let months = [];
    props.data.map((data) => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={(e) => {
            setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Select a Month</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };

  return (
    <>
      <div className="tail-datetime-calendar">
        <CalenderNavbar
          onPrev={onPrev}
          showYearEditor={showYearEditor}
          showMonth={showMonth}
          month={month}
          year={year}
          onNext={onNext}
        />
        <CalendarContent
          showYearNav={showYearNav}
          YearTable={YearTable}
          year={year}
          showMonthTable={showMonthTable}
          MonthList={MonthList}
          showCalendarTable={showCalendarTable}
          weekdayshortname={weekdayshortname}
          daysinmonth={daysinmonth}
        />

        <div>
          <button className="buttonToday" onClick={handleToday}>
            Today
          </button>
        </div>
      </div>
    </>
  );
}
