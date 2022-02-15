import {
  SCHEDULE_INTERVIEW_REQUEST,
  SCHEDULE_INTERVIEW_SUCCESS,
  SCHEDULE_INTERVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/interviewScheduleConstants";

// import { DateTime } from "luxon";

const schedules = [
  {
    name: "Miss Tina",
    work_start: "2022-02-15T11:47",
    work_end: "2022-02-15T11:47",
    booked_events: [
      {
        candidate: "Amarachi",
        interviewer: "Miss Tina",
        start: "2022-02-14T16:00",
        duration: 5400,
        end: "2022-02-14T16:30:00.000Z",
      },
      {
        candidate: "Olasope Oluwatosin",
        interviewer: "Miss Tina",
        start: "2022-02-14T08:00",
        duration: 1800,
        end: "2022-02-14T07:30:00.000Z",
      },
      {
        candidate: "Tayo",
        interviewer: "Miss Tina",
        start: "2022-02-14T09:00",
        duration: 1800,
        end: "2022-02-14T08:30:00.000Z",
      },
      {
        candidate: "Bola",
        interviewer: "Miss Tina",
        start: "2022-02-14T10:00",
        duration: 1800,
        end: "2022-02-14T09:30:00.000Z",
      },
      {
        candidate: "Justin",
        interviewer: "Miss Tina",
        start: "2022-02-14T11:00",
        duration: 1800,
        end: "2022-02-14T10:30:00.000Z",
      },
      {
        candidate: "Lekan",
        interviewer: "Miss Tina",
        start: "2022-02-14T00:00",
        duration: 1800,
        end: "2022-02-13T23:30:00.000Z",
      },
      {
        candidate: "Ada",
        interviewer: "Miss Tina",
        start: "2022-02-14T13:00",
        duration: 1800,
        end: "2022-02-14T12:30:00.000Z",
      },
      {
        candidate: "Amarachi",
        interviewer: "Miss Tina",
        start: "2022-02-14T14:00",
        duration: 1800,
        end: "2022-02-14T13:30:00.000Z",
      },
    ],
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

const getInterviewer = () => {
  if (localStorage.getItem("schedules")) {
    return JSON.parse(localStorage.getItem("schedules"));
  } else {
    return schedules;
  }
};

let interviewerInfo = getInterviewer();

// Schedule Candidates Application
export const scheduleCandidateInterview = (payload) => async (dispatch) => {
  try {
    dispatch({ type: SCHEDULE_INTERVIEW_REQUEST });

    const foundInterviewer = await interviewerInfo.find(
      (interviewer) => interviewer.name === payload.interviewer
    );

    const checkOverlap = (filter) => {
      const data = foundInterviewer.booked_events;
      let start = [
        [
          new Date(filter.start).toISOString(),
          new Date(filter.end).toISOString(),
        ],
      ];
      let overLapError = "";
      let overLapResult = false;
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
            // overLapResult = true;
            // console.log(overLapError);
            return overLapError;
          }
        }
        if (overLapError !== "") {
          overLapResult = true;
          return overLapResult;
        }
      });
      // console.log(start);
      return [overLapError, overLapResult];
    };

    const [overLapError, overLapResult] = checkOverlap(payload);

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

    checkOverlap(payload);
    // // console.log(checkOverlap(null));
    // const validateOverlap = checkOverlap(payload);
    // console.log(validateOverlap);

    if (overLapResult) {
      dispatch({
        type: SCHEDULE_INTERVIEW_FAIL,
        payload: `You already have a session scheduled between ${overLapError}`,
      });
    } else if (foundInterviewer && !checkForCandidate) {
      foundInterviewer.booked_events.push(payload);
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
  try {
    dispatch({ type: SCHEDULE_INTERVIEW_REQUEST });

    const foundInterviewer = await interviewerInfo.find(
      (interviewer) => interviewer.name === payload.interviewer
    );

    if (foundInterviewer) {
      foundInterviewer.booked_events.push(payload);
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

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
