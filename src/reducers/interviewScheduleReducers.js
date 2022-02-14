import {
  SCHEDULE_INTERVIEW_REQUEST,
  SCHEDULE_INTERVIEW_SUCCESS,
  SCHEDULE_INTERVIEW_FAIL,
  SCHEDULE_INTERVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/interviewScheduleConstants";

export const scheduleInterviewReducer = (state = {}, action) => {
  switch (action.type) {
    case SCHEDULE_INTERVIEW_REQUEST:
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

    case SCHEDULE_INTERVIEW_FAIL:
      return {
        ...state,
        loading: false,
        status: 500,
        error: action.payload,
      };

    case SCHEDULE_INTERVIEW_RESET:
      return {
        ...state,
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
