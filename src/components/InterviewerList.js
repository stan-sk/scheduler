import React from "react";
import PropTypes from 'prop-types'; 
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
// import classNames from "classnames";


export default function InterviewerList(props) {

  const { interviewers, value, onChange} = props;


  return (

    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      {interviewers.map(x => (
        <InterviewerListItem
        key={x.id}
        id={x.id}
        name={x.name}
        avatar={x.avatar}
        selected={x.id === value}
        setInterviewer={() => onChange(x.id)}
        />
      ))}
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};