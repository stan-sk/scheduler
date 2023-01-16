import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";





export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //By cliking the save button, it creates a new interview obj
  const save = (name, interviewer) => {

    transition(SAVING)

    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview( props.id, interview )
    .then(() => transition(SHOW));
  }

  console.log(props.interview)

  const toDelete = () => {
    transition(CONFIRM)
  }

  const destory = () => {
    transition(DELETING)
    const id = props.id
    const interview = null
    props.cancelInterview(id, interview)
    .then(() => transition(EMPTY))
  }

  const toEdit = () => {
    transition(EDIT)
  }



  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={toEdit}
          onDelete={toDelete}
        />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers} 
        onSave={save}
        onCancel={()=>{back()}}
        />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={destory}
          onCancel={()=>{back()}}
      />)}
      {mode === EDIT && <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers} 
        onSave={save}
        onCancel={()=>{back()}}
      />}
    </article>
  );
}