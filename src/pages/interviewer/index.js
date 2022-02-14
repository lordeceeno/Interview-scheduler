import React, { useState, useEffect, Fragment } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import styles from "./interviewer.module.scss";
import Header from "../../components/header";
import { toast } from "react-toastify";
import { FormField, CustomSelect } from "../../components/formField";
import {
  SCHEDULE_INTERVIEW_RESET,
  CLEAR_ERRORS,
} from "../../constants/interviewScheduleConstants";

import { DateTime } from "luxon";

import { scheduleCandidateInterview } from "../../actions/interviewScheduleActions";
// import Select from "react-select";

const Interviewer = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { candidatesData } = useSelector((state) => state.candidate || []);
  const { interviewerData } = useSelector((state) => state.interviewer || []);
  const { scheduledData, status, error, message } = useSelector(
    (state) => state.schedules || []
  );
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedInterviwer, setSelectedInterviewer] = useState(null);
  const [interviewTime, setInterviewTime] = useState({
    time: "",
    duration: null,
  });
  const [value, setValue] = React.useState("0:00");

  const result = scheduledData && [
    ...scheduledData
      .reduce((r, { booked_events }) => {
        (booked_events || []).forEach((o) => {
          r.has(o.candidate) || r.set(o.candidate, { ...o });

          r.get(o.candidate);
        });

        return r;
      }, new Map())
      .values(),
  ];

  // console.log(result);

  let candidateOptions =
    candidatesData &&
    candidatesData.map((candidate) => {
      const container = {};

      container.value = candidate.name;
      container.label = candidate.name;

      return container;
    });

  let interviewerOptions =
    interviewerData &&
    interviewerData.map((interviewer) => {
      const container = {};

      container.value = interviewer.name;
      container.label = interviewer.name;

      return container;
    });

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setInterviewTime((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = (event) => {
    const value = event.target.value;
    const seconds = Math.max(0, getSecondsFromHHMMSS(value));

    const time = toHHMMSS(seconds);
    setValue(time);
    // setduration(value);
  };

  const getSecondsFromHHMMSS = (value) => {
    const [str1, str2, str3] = value.split(":");

    const val1 = Number(str1);
    const val2 = Number(str2);
    const val3 = Number(str3);

    if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
      return val1;
    }

    if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
      return val1 * 60 + val2;
    }

    if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
      return val1 * 60 * 60 + val2 * 60 + val3;
    }

    return 0;
  };

  const toHHMMSS = (secs) => {
    const secNum = parseInt(secs.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;

    return [hours, minutes, seconds]
      .map((val) => (val < 10 ? `0${val}` : val))
      .filter((val, index) => val !== "00" || index > 0)
      .join(":")
      .replace(/^0/, "");
  };

  const handleCandidateChange = (selectedCandidate) => {
    setSelectedCandidate(selectedCandidate.value);
  };

  const handleInterviewerChange = (selectedInterviwer) => {
    setSelectedInterviewer(selectedInterviwer.value);
  };

  const setDuration = (value) => {
    let hm = value;
    let a = hm.split(":");
    let duration = +a[0] * 60 * 60 + +a[1] * 60;
    return duration;
  };

  const endInterview = (date, amount) => {
    const newDate = new Date(date);
    var a = new Date();
    var newDateObj = new Date(a.setTime(newDate.getTime() + amount * 1000));
    return newDateObj;
  };

  const setAppointments = () => {
    const data = {
      columns: [
        {
          label: "CANDIDATE",
          field: "candidate",
          sort: "asc",
        },
        {
          label: "INTERVIEWER",
          field: "interviewer",
          sort: "asc",
        },
        {
          label: "START DATE/TIME",
          field: "start",
          sort: "asc",
        },
        {
          label: "END DATE/TIME",
          field: "end",
          sort: "asc",
        },
        {
          label: "DURATION",
          field: "duration",
          sort: "asc",
        },
        {
          label: "ACTION",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };

    scheduledData &&
      result.forEach((appointment) => {
        data.rows.push({
          candidate: appointment.candidate,
          interviewer: appointment.interviewer,
          start: DateTime.fromJSDate(new Date(appointment.start)).toFormat(
            "dd MMM yyyy - HH:mm"
          ),
          end: DateTime.fromJSDate(new Date(appointment.end)).toFormat(
            "dd MMM yyyy - HH:mm "
          ),
          duration: appointment.duration,
          action: (
            <Fragment>
              <button>Cancel</button>
            </Fragment>
          ),
        });
      });
    return data;
  };

  const payload = {
    candidate: selectedCandidate,
    interviewer: selectedInterviwer,
    start: interviewTime.time,
    duration: setDuration(value),
    end: endInterview(interviewTime.time, setDuration(value)),
  };

  const submitApplication = (e) => {
    e.preventDefault();
    dispatch(scheduleCandidateInterview(payload));
  };

  useEffect(() => {
    if (status === 200) {
      toast.success(message);
      dispatch({ type: SCHEDULE_INTERVIEW_RESET });
    } else if (status === 500 || !status) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [dispatch, status, error, message]);

  return (
    <div>
      <Header />
      <div className={styles.auth_cont}>
        <div className={styles.auth_cont__left}>
          <MDBDataTable
            responsive
            data={setAppointments()}
            className="px-3 scroll"
            bordered
            striped
            hover
          />
        </div>
        <div className={styles.auth_cont__right}>
          <div className={styles.auth_cont__logo}></div>
          <form onSubmit={submitApplication}>
            <h5 className={styles.auth_cont__heading}>Dashboard</h5>
            <p className={styles.auth_cont__subheading}>
              Schedule interview with candidate
            </p>
            <div className="u-margin-bottom-small ">
              <CustomSelect
                name="interviewer"
                label="Select Interviewer"
                defaultValue={selectedInterviwer}
                onChange={handleInterviewerChange}
                options={interviewerOptions}
              />
            </div>
            <div className="u-margin-bottom-small ">
              <CustomSelect
                name="candidate"
                label="Available Candidates"
                defaultValue={selectedCandidate}
                onChange={handleCandidateChange}
                options={candidateOptions}
              />
            </div>
            <div className="u-margin-bottom-small ">
              <FormField
                type="datetime-local"
                placeholder="Choose work start"
                label="Date and Time of Interview"
                handleChange={handleTimeChange}
                value={interviewTime.time}
                name="time"
              />
            </div>

            <div className="u-margin-bottom-small ">
              <FormField
                type="text"
                placeholder="Duration of interview"
                label="Duration of Interview"
                handleChange={onChange}
                handleBlur={onBlur}
                value={value}
                name="duration"
              />
            </div>
            <button
              className={`${styles.auth_cont__button} u-margin-bottom-small`}
            >
              SCHEDULE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Interviewer;
