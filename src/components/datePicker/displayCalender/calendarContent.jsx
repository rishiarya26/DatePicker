import React from "react";
import moment from "moment";

export default function CalendarContent(props) {
  const {
    showYearNav,
    YearTable,
    year,
    showMonthTable,
    MonthList,
    showCalendarTable,
    weekdayshortname,
    daysinmonth,
  } = props;
  return (
    <>
      <div className="calendar-date">
        {showYearNav && <YearTable props={year()} />}
        {showMonthTable && <MonthList data={moment.months()} />}
      </div>

      {showCalendarTable && (
        <div className="calendar-date">
          <table className="calendar-day">
            <thead>
              <tr>{weekdayshortname}</tr>
            </thead>
            <tbody>{daysinmonth}</tbody>
          </table>
        </div>
      )}
    </>
  );
}
