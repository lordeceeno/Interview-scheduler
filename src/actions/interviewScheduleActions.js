import {
  SCHEDULE_INTERVIEW_REQUEST,
  SCHEDULE_INTERVIEW_SUCCESS,
  SCHEDULE_INTERVIEW_FAIL,
  CANCEL_INTERVIEW_REQUEST,
  CANCEL_INTERVIEW_SUCCESS,
  CANCEL_INTERVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/interviewScheduleConstants";

const getInterviewer = () => {
  if (localStorage.getItem("schedules")) {
    return JSON.parse(localStorage.getItem("schedules"));
  }
};

// console.log(interviewerInfo);

// Schedule Candidates Application
export const scheduleCandidateInterview = (payload) => async (dispatch) => {
  let interviewerInfo = getInterviewer();
  const foundInterviewer =
    (await interviewerInfo) &&
    interviewerInfo.find(
      (interviewer) => interviewer.name === payload.interviewer
    );

  const checkOverlap = (filter) => {
    const data = foundInterviewer && foundInterviewer.booked_events;
    let start = [
      [
        new Date(filter.start).toISOString(),
        new Date(filter.end).toISOString(),
      ],
    ];
    let overLapError = "";
    let overLapResult = false;
    data &&
      data.forEach((e) => {
        let d = [
          new Date(e.start).toISOString(),
          new Date(e.end).toISOString(),
        ];
        start.push(d);
      });

    // sorted the time
    start.sort();
    start.forEach((e, i) => {
      if (start[i + 1]) {
        if (e[1] > start[i + 1][0]) {
          overLapError = e.join(" & ");
          return overLapError;
        }
      }
      if (overLapError !== "") {
        overLapResult = true;
        return overLapResult;
      }
    });
    return [overLapError, overLapResult];
  };
  const [overLapError, overLapResult] = checkOverlap(payload);
  checkOverlap(payload);

  try {
    dispatch({ type: SCHEDULE_INTERVIEW_REQUEST });

    const candidateExists = (arr, params) => {
      let lookup = {};
      for (let i = 0, len = arr.length; i < len; i++) {
        lookup = arr[i];
      }
      const filter = lookup.candidate === params;
      return filter;
    };

    const checkForCandidate = candidateExists(
      foundInterviewer.booked_events,
      payload.candidate
    );

    if (overLapResult) {
      dispatch({
        type: SCHEDULE_INTERVIEW_FAIL,
        payload: `You already have a session scheduled between ${overLapError}`,
      });
    } else if (foundInterviewer && !checkForCandidate) {
      interviewerInfo.forEach((o, i) => {
        if (o.name === payload.interviewer) {
          o.booked_events.push(payload);
        }
      });

      // foundInterviewer.booked_events.push(payload);
      // console.log(checkForCandidate);
      dispatch({
        type: SCHEDULE_INTERVIEW_SUCCESS,
        payload: interviewerInfo,
      });
      localStorage.setItem("schedules", JSON.stringify(interviewerInfo));
    } else {
      dispatch({
        type: SCHEDULE_INTERVIEW_FAIL,
        payload: `Candidate "${payload.candidate}" already scheduled for an interview`,
      });
    }
  } catch (error) {
    dispatch({
      type: SCHEDULE_INTERVIEW_FAIL,
      payload: "An error occured",
    });
  }
};

// Cancel Candidate Application
export const cancelCandidateInterview = (payload) => async (dispatch) => {
  let interviewerInfo = getInterviewer();
  try {
    dispatch({ type: CANCEL_INTERVIEW_REQUEST });

    interviewerInfo.forEach((o) => {
      o.booked_events = o.booked_events.filter((s) => s.candidate !== payload);
    });
    dispatch({
      type: CANCEL_INTERVIEW_SUCCESS,
      payload: interviewerInfo,
    });
    localStorage.setItem("schedules", JSON.stringify(interviewerInfo));
  } catch (error) {
    dispatch({
      type: CANCEL_INTERVIEW_FAIL,
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
