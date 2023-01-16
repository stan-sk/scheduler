export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const result = [];

  // if no days data
  if (!state.days.length) {
    return result;
  }
  // filter through state for a specific day
  const getDay = state.days.filter(x => x.name === day);

  // if no data for a specific day
  if (!getDay[0]) {
    return result;
  }

  // get the appointments IDs for that day
  const appointmentIdsForDay = getDay[0].appointments;

  // get details for all appointments
  const appointments = state.appointments;

  // get appointment details for the specific day if id matches
  appointmentIdsForDay.forEach(id => {
    if (id === appointments[id].id) {
      result.push(appointments[id]);
    }
  });

  return result;
}
// export function getAppointmentsForDay(state, day) {

//   const result = [];

//   if (state.days.length === 0) {
//     return [];
//   }

//   console.log("state.days ---->", state.days)

//   for (let obj of state.days) {
//     console.log("obj ------>", obj)

//     if (obj.name === day) {
//       console.log("------- name", obj.name, "----- day", day);
//       for (let i of obj.appointments) {

//         if (i === state.appointments[i].id) {
//           result.push(state.appointments[i])
//         }
//       }

//     }
//     if (obj.name !== day) {
//       return [] ;
//     }
//     console.log('res', result);
//   }
//   return result;
// }


export function getInterview(state, interview) {

  if (!interview) {
    return null
  }

  const interviewerId = interview.interviewer
  const interviewers = state.interviewers

  for (const id in interviewers) {
    if (interviewerId === interviewers[id].id) {

      const interviewDetails = {
        student: interview.student,
        interviewer: interviewers[id]
      }

      return interviewDetails
    }
  }

}
  


export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  const result = [];

  // if no days data
  if (!state.days.length) {
    return result;
  }
  // filter through state for a specific day
  const getDay = state.days.filter(x => x.name === day);

  // if no data for a specific day
  if (!getDay[0]) {
    return result;
  }

  // get the interviewers IDs for that day
  const interviewersForDay = getDay[0].interviewers;

  // get details for all appointments
  const interviewers = state.interviewers;

  // get interviewers details for the specific day if id matches
  interviewersForDay.forEach(id => {
    if (id === interviewers[id].id) {
      result.push(interviewers[id]);
    }
  });

  return result;
}