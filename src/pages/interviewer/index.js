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

import {
  scheduleCandidateInterview,
  cancelCandidateInterview,
} from "../../actions/interviewScheduleActions";

const Interviewer = () => {
  const dispatch = useDispatch();
  const { candidatesData } = useSelector((state) => state.candidate || []);
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

  const result =
    scheduledData &&
    scheduledData
      .filter((e) => e.booked_events)
      .map((e) => e.booked_events.map((link) => link))
      .reduce((a, b) => a.concat(b), []);

  let candidateOptions =
    candidatesData &&
    candidatesData.map((candidate) => {
      const container = {};

      container.value = candidate.name;
      container.label = candidate.name;

      return container;
    });

  let interviewerOptions =
    scheduledData &&
    scheduledData.map((interviewer) => {
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

  const onFormFieldChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = (event) => {
    const value = event.target.value;
    const seconds = Math.max(0, getSecondsFromHHMMSS(value));

    const time = toHHMMSS(seconds);
    setValue(time);
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

  const secondsToHms = (d) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
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
          duration: secondsToHms(appointment.duration),
          action: (
            <Fragment>
              <button
                className={styles.auth_cont__cancel__button}
                onClick={() => cancelInterview(appointment.candidate)}
              >
                Cancel
              </button>
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

  const scheduleInterview = (e) => {
    e.preventDefault();
    dispatch(scheduleCandidateInterview(payload));
  };

  const cancelInterview = (payload) => {
    dispatch(cancelCandidateInterview(payload));
  };

  useEffect(() => {
    if (status === 200) {
      toast.success(message);
      dispatch({ type: SCHEDULE_INTERVIEW_RESET });
    } else if (status === 500) {
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
          <form onSubmit={scheduleInterview}>
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
                handleChange={onFormFieldChange}
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
