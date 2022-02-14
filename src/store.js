import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistStore, persistReducer } from "redux-persist";
import { candidateApplicationReducer } from "./reducers/candidateReducers";
import { interviewerReducer } from "./reducers/interviewerReducers";
import { scheduleInterviewReducer } from "./reducers/interviewScheduleReducers";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  candidate: candidateApplicationReducer,
  interviewer: interviewerReducer,
  schedules: scheduleInterviewReducer,
});

const reducer = (state, action) => {
  return appReducer(state, action);
};

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

let initialState = {
  candidate: {
    candidatesData: localStorage.getItem("candidate")
      ? JSON.parse(localStorage.getItem("candidate"))
      : candidate,
  },
  schedules: {
    scheduledData: localStorage.getItem("schedules")
      ? JSON.parse(localStorage.getItem("schedules"))
      : schedules,
  },
  interviewer: {
    interviewerData: localStorage.getItem("interviewers")
      ? JSON.parse(localStorage.getItem("interviewers"))
      : interviewers,
  },
};

const persistConfig = {
  key: "schedule",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middleWare = [thunk];
const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

const persistor = persistStore(store);
export default store;
export { persistor };
