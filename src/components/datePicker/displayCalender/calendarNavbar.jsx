import React from "react";

export default function CalenderNavbar(props) {
  const { onPrev, showYearEditor, showMonth, month, year, onNext } = props;
  return (
    <>
      <div className="calendar-navi">
        <span
          onClick={(e) => {
            onPrev();
          }}
          class="calendar-button button-prev"
        />
        {showYearEditor && (
          <span
            onClick={(e) => {
              showMonth();
            }}
            class="calendar-label"
          >
            {month()},
          </span>
        )}
        <span
          className="calendar-label"
          onClick={(e) => {
            showYearEditor();
          }}
        >
          {year()}
        </span>

        <span
          onClick={(e) => {
            onNext();
          }}
          className="calendar-button button-next"
        />
      </div>
    </>
  );
}
