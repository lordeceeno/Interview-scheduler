import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./createInterviewer.module.scss";
import Header from "../../components/header";
import { FormField } from "../../components/formField";
import { toast } from "react-toastify";
// import { DateTime } from "luxon";

import { addInterviewer } from "../../actions/createInterviewerActions";
import {
  CLEAR_ERRORS,
  CREATE_INTERVIEWER_RESET,
} from "../../constants/interviewerConstants";

const CreateInterviewer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { candidatesData } = useSelector((state) => state.candidate || []);

  const { error, message, status } = useSelector(
    (state) => state.interviewer || []
  );
  const [interviwer, setInterviwer] = useState({
    name: "",
    work_start: "",
    work_end: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInterviwer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createInterviewer = (e) => {
    e.preventDefault();
    dispatch(addInterviewer(interviwer));
  };

  useEffect(() => {
    if (status === 200) {
      toast.success(message);
      dispatch({ type: CREATE_INTERVIEWER_RESET });
      navigate("/interviewer");
    } else if (status === 500 || !status) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [dispatch, error, navigate, message, status]);

  return (
    <div>
      <Header />
      <div className={styles.auth_cont}>
        <div className={styles.auth_cont__left}>{/* <AuthBanner /> */}</div>
        <div className={styles.auth_cont__right}>
          <div className={styles.auth_cont__logo}></div>
          <form onSubmit={createInterviewer}>
            <h5 className={styles.auth_cont__heading}>Welcome,</h5>
            <p className={styles.auth_cont__subheading}>
              Fill the form to create an interviewer
            </p>
            <div className="u-margin-bottom-medium ">
              <FormField
                type="text"
                placeholder="Enter your full name"
                label="Candidate's Name"
                handleChange={handleChange}
                value={interviwer.name}
                name="name"
              />
            </div>

            <div className="u-margin-bottom-medium ">
              <FormField
                type="datetime-local"
                placeholder="Choose work start"
                label="Work Start"
                handleChange={handleChange}
                value={interviwer.work_start}
                name="work_start"
              />
            </div>

            <div className="u-margin-bottom-medium ">
              <FormField
                type="datetime-local"
                placeholder="Choose work end"
                label="Work End"
                handleChange={handleChange}
                value={interviwer.work_end}
                name="work_end"
              />
            </div>

            <button
              className={`${styles.auth_cont__button} u-margin-bottom-medium`}
            >
              CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInterviewer;
