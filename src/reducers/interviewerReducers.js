import {
  CREATE_INTERVIEWER_REQUEST,
  CREATE_INTERVIEWER_SUCCESS,
  CREATE_INTERVIEWER_FAIL,
  CREATE_INTERVIEWER_RESET,
  CLEAR_ERRORS,
} from "../constants/interviewerConstants";

export const interviewerReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_INTERVIEWER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_INTERVIEWER_SUCCESS:
      return {
        ...state,
        loading: false,
        status: 200,
        message: "Interviewer Created Successfully",
        interviewerData: action.payload,
      };

    case CREATE_INTERVIEWER_FAIL:
      return {
        ...state,
        loading: false,
        status: 500,
        error: action.payload,
      };

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
