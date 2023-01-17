import React, { useState, useEffect } from 'react'
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

      setState({
        ...state,
        appointments
      });
    })
  }

  const cancelInterview = (id, interview) => {

    return axios.delete(`/api/appointments/${id}`, { interview })
    .then((response) => {
    
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  
      setState({
        ...state,
        appointments
      });
    })
  }


  return { state, setDay, bookInterview, cancelInterview }

}
