import React from "react";
import useApplicationData from "hooks/useApplicationData";

import DayList from "./DayList";
import Appointment from "./Appointment/index";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";


export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({});

  // combine all useState above into one below
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  // console.log(state)

  // Even though we are combining all of the state into a single object, we can still have separate actions to update certain parts of the state
  // const setDay = day => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // const bookInterview = (id, interview) => {

  //   return axios.put(`/api/appointments/${id}`, { interview })
  //   .then((response) => {

  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: { ...interview }
  //     };

  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };

  //     setState({
  //       ...state,
  //       appointments
  //     });
  //   })
  // }

  // const cancelInterview = (id, interview) => {

  //   return axios.delete(`/api/appointments/${id}`, { interview })
  //   .then((response) => {
    
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: null
  //     };
  
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };
  
  //     setState({
  //       ...state,
  //       appointments
  //     });
  //   })
  // }


  const appointmentComponent = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);

      return (
          <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
      )
    }
  )
 

  // const daysApi = "http://localhost:8001/api/days"

  // useEffect(() => {
  //   axios.get(daysApi)
  //   .then(response => {setDays([...response.data])  
  //   })
  // }, []);

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('/api/days'),
  //     axios.get('/api/appointments'),
  //     axios.get('/api/interviewers')
  //   ]).then((all) => {
  //     const days = all[0].data;
  //     const appointments = all[1].data;
  //     const interviewers = all[2].data;

  //     setState(prev => ({ ...prev, days, appointments, interviewers}))
  //   });
  // }, []);

  // useEffect(() => {
  //   axios.get("/api/days").then(response => setDays(response.data));
  // }, []);


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentComponent}
        <Appointment key="last" time="5pm" bookInterview={bookInterview} />
      </section>
    </main>
  );
}






// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };