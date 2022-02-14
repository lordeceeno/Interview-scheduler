import {
  CANDIDATE_APPLICATION_REQUEST,
  CANDIDATE_APPLICATION_SUCCESS,
  CANDIDATE_APPLICATION_FAIL,
  CLEAR_ERRORS,
} from "../constants/candidateConstants";

const candidate = [
  {
    name: "Olasope Oluwatosin",
    stack: "React",
  },
  {
    name: "Tayo",
    stack: "Angular",
  },
  {
    name: "Bola",
    stack: "Vue JS",
  },
  {
    name: "Justin",
    stack: "React",
  },
  {
    name: "Lekan",
    stack: "PHP",
  },
  {
    name: "Ada",
    stack: "Django",
  },
  {
    name: "Amarachi",
    stack: "PHP",
  },
];
const getCandidates = () => {
  if (localStorage.getItem("candidate")) {
    return JSON.parse(localStorage.getItem("candidate"));
  } else {
    return candidate;
  }
};

let candidatesInfo = getCandidates();

export const addCandidate = (name, stack) => async (dispatch) => {
  try {
    dispatch({ type: CANDIDATE_APPLICATION_REQUEST });

    const foundCandidate = await candidatesInfo.find(
      (candidate) => candidate.name === name
    );

    if (!foundCandidate) {
      candidatesInfo.push({
        name: name,
        stack: stack,
      });

      dispatch({
        type: CANDIDATE_APPLICATION_SUCCESS,
        payload: candidatesInfo,
      });
      localStorage.setItem("candidate", JSON.stringify(candidatesInfo));
    } else {
      dispatch({
        type: CANDIDATE_APPLICATION_FAIL,
        payload: "You've already applied for an interview",
      });
    }
  } catch (error) {
    dispatch({
      type: CANDIDATE_APPLICATION_FAIL,
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
