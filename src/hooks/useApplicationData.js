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

  const updateSpots = (state, add = false) => {
    // get the day you want to update
    const updatedDay = state.days.filter((d) => d.name === state.day)[0];

    if (add) {
      // add spot if an interview is being cancelled
      updatedDay.spots++;
    } else {
      // remove a spot if an interview is being booked
      updatedDay.spots--;
    }

    // create a new days Array and replace the day with updatedDay
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return updatedDay;
      } else {
        return day;
      }
    });

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

     const days = updateSpots(state);

      setState({
        ...state,
        appointments,
        days
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

      const days = updateSpots(state, true);
  
      setState({
        ...state,
        appointments, 
        days
      });
    })
  }

 


  return { state, setDay, bookInterview, cancelInterview }

}
