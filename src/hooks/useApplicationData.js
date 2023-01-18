import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // To set the day 
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;

      setState(prev => ({ ...prev, days, appointments, interviewers}))
    });
  }, []);

  const updateSpots = (state, appointments) => {

    // get / find the day
    const dayObj = state.days.find(d => d.name === state.day);

    
    // count the null appointments
    let spots = 0
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++
      }
    }

    const day = {...dayObj, spots}
    const days = state.days.map(d => d.name === state.day ? day : d);

    // return an updated days array
    return days;
  }; 



  const bookInterview = (id, interview) => {

    return axios.put(`/api/appointments/${id}`, { interview })
    .then((response) => {

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = updateSpots(state, appointments)

      setState({
        ...state,
        appointments,
        days
      });
    })
  }

  const cancelInterview = (id) => {

    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
    
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = updateSpots(state, appointments)
  
      setState({
        ...state,
        appointments, 
        days
      });
    })
  }

 


  return { state, setDay, bookInterview, cancelInterview }

}
