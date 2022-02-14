import {
  CANDIDATE_APPLICATION_REQUEST,
  CANDIDATE_APPLICATION_SUCCESS,
  CANDIDATE_APPLICATION_FAIL,
  CANDIDATE_APPLICATION_RESET,
  CLEAR_ERRORS,
} from "../constants/candidateConstants";

export const candidateApplicationReducer = (state = {}, action) => {
  switch (action.type) {
    case CANDIDATE_APPLICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CANDIDATE_APPLICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        status: 200,
        message: "Application Successful",
        candidatesData: action.payload,
      };

    case CANDIDATE_APPLICATION_FAIL:
      return {
        ...state,
        loading: false,
        status: 500,
        error: action.payload,
      };

    case CANDIDATE_APPLICATION_RESET:
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
        status: null,
        error: null,
      };

    default:
      return state;
  }
};
