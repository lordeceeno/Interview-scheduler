import {
  CREATE_INTERVIEWER_REQUEST,
  CREATE_INTERVIEWER_SUCCESS,
  CREATE_INTERVIEWER_FAIL,
  CLEAR_ERRORS,
} from "../constants/interviewScheduleConstants";

const getInterviewers = () => {
  if (localStorage.getItem("schedules")) {
    return JSON.parse(localStorage.getItem("schedules"));
  }
};

// Submit Candidate Application
export const addInterviewer = (interviwer) => async (dispatch) => {
  let interviewersInfo = getInterviewers();
  try {
    dispatch({ type: CREATE_INTERVIEWER_REQUEST });

    const foundInterviewer = await interviewersInfo.find(
      (interviwers) => interviwers.name === interviwer.name
    );

    if (!foundInterviewer) {
      interviewersInfo.push({
        name: interviwer.name,
        work_start: interviwer.work_start,
        work_end: interviwer.work_start,
        booked_events: [],
      });

      dispatch({
        type: CREATE_INTERVIEWER_SUCCESS,
        payload: interviewersInfo,
      });
      localStorage.setItem("schedules", JSON.stringify(interviewersInfo));
    } else {
      dispatch({
        type: CREATE_INTERVIEWER_FAIL,
        payload: "Data already exists for this interviewer",
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_INTERVIEWER_FAIL,
      payload: "An error occured",
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
