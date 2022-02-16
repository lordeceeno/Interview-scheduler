import {
  SCHEDULE_INTERVIEW_REQUEST,
  SCHEDULE_INTERVIEW_SUCCESS,
  SCHEDULE_INTERVIEW_FAIL,
  SCHEDULE_INTERVIEW_RESET,
  CANCEL_INTERVIEW_REQUEST,
  CANCEL_INTERVIEW_SUCCESS,
  CANCEL_INTERVIEW_FAIL,
  CREATE_INTERVIEWER_REQUEST,
  CREATE_INTERVIEWER_SUCCESS,
  CREATE_INTERVIEWER_FAIL,
  CREATE_INTERVIEWER_RESET,
  CLEAR_ERRORS,
} from "../constants/interviewScheduleConstants";

export const scheduleInterviewReducer = (state = {}, action) => {
  switch (action.type) {
    case SCHEDULE_INTERVIEW_REQUEST:
    case CREATE_INTERVIEWER_REQUEST:
    case CANCEL_INTERVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SCHEDULE_INTERVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        status: 200,
        message: "Interviewer Scheduled Successfully",
        scheduledData: action.payload,
      };

    case CREATE_INTERVIEWER_SUCCESS:
      return {
        ...state,
        loading: false,
        status: 200,
        message: "Interviewer Created Successfully",
        scheduledData: action.payload,
      };

    case CANCEL_INTERVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        status: 200,
        message: "Scheduled Interview Cancelled",
        scheduledData: action.payload,
      };

    case SCHEDULE_INTERVIEW_FAIL:
    case CANCEL_INTERVIEW_FAIL:
    case CREATE_INTERVIEWER_FAIL:
      return {
        ...state,
        loading: false,
        status: 500,
        error: action.payload,
      };

    case SCHEDULE_INTERVIEW_RESET:
    case CREATE_INTERVIEWER_RESET:
      return {
        ...state,
        loading: false,
        status: null,
        error: null,
        message: "",
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
