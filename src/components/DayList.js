import React from "react";
import DayListItem from "./DayListItem";
// import classNames from "classnames";


export default function DayList(props) {

  const {days, day, setDay} = props;


  return (
    <ul>{days.map(x => (
      <DayListItem
      key={x.id}
      name={x.name}
      spots={x.spots}
      selected={x.name === day}
      setDay={setDay}
      />
    ))}
    </ul>
  )
}