import {
  CREATE_INTERVIEWER_REQUEST,
  CREATE_INTERVIEWER_SUCCESS,
  CREATE_INTERVIEWER_FAIL,
  CLEAR_ERRORS,
} from "../constants/interviewerConstants";

const interviewers = [
  {
    name: "Miss Tina",
    work_start: "2022-02-15T11:47",
    work_end: "2022-02-15T11:47",
    booked_events: [],
  },
  {
    name: "Mr Smith",
    work_start: "2022-02-14T07:48",
    work_end: "2022-02-14T07:48",
    booked_events: [],
  },
  {
    name: "Mr Samuel",
    work_start: "2022-02-14T05:48",
    work_end: "2022-02-14T05:48",
    booked_events: [],
  },
  {
    name: "Miss Oluchi",
    work_start: "2022-02-14T08:49",
    work_end: "2022-02-14T08:49",
    booked_events: [],
  },
  {
    name: "Pastor Nero",
    work_start: "2022-02-14T11:50",
    work_end: "2022-02-14T11:50",
    booked_events: [],
  },
];

const getInterviewers = () => {
  if (localStorage.getItem("interviewers")) {
    return JSON.parse(localStorage.getItem("interviewers"));
  } else {
    return interviewers;
  }
};

let interviwersInfo = getInterviewers();

// Submit Candidate Application
export const addInterviewer = (interviwer) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_INTERVIEWER_REQUEST });

    const foundInterviewer = await interviwersInfo.find(
      (interviwers) => interviwers.name === interviwer.name
    );

    if (!foundInterviewer) {
      interviwersInfo.push({
        name: interviwer.name,
        work_start: interviwer.work_start,
        work_end: interviwer.work_start,
        booked_events: [],
      });

      dispatch({
        type: CREATE_INTERVIEWER_SUCCESS,
        payload: interviwersInfo,
      });
      localStorage.setItem("interviewers", JSON.stringify(interviwersInfo));
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
