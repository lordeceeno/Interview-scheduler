import React, { useState, useEffect } from "react";
import styles from "./apply.module.scss";
import { FormField } from "../../components/formField";
import { toast } from "react-toastify";
import Header from "../../components/header";
import Dropdown from "../../components/dropdown";
// import { useNavigate } from "react-router-dom";

import { addCandidate } from "../../actions/candidateActions";
import {
  CLEAR_ERRORS,
  CANDIDATE_APPLICATION_RESET,
} from "../../constants/candidateConstants";
import { useDispatch, useSelector } from "react-redux";

const Apply = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, message } = useSelector(
    (state) => state.candidate || []
  );
  // const [stack, setStack] = useState({
  //   id: 1,
  //   stack: "React",
  // });
  // const [currentState, setState] = useState(1);
  const [candidateData, setCandidateData] = useState({
    name: "",
    stack: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitApplication = (e) => {
    e.preventDefault();
    dispatch(addCandidate(candidateData.name, candidateData.stack));
  };

  const options = [
    {
      id: 1,
      stack: "Select your stack",
    },
    {
      id: 2,
      stack: "React",
    },
    {
      id: 3,
      stack: "Angular",
    },
    {
      id: 3,
      stack: "Django",
    },
    {
      id: 4,
      stack: "Vue JS",
    },
    {
      id: 5,
      stack: "PHP",
    },
  ];

  useEffect(() => {
    if (status === 200) {
      toast.success(message);
      dispatch({ type: CANDIDATE_APPLICATION_RESET });
    } else if (status === 500 || !status) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [dispatch, message, error, status]);

  return (
    <div>
      <Header />
      <div className={styles.auth_cont}>
        <div className={styles.auth_cont__left}>{/* <AuthBanner /> */}</div>
        <div className={styles.auth_cont__right}>
          <div className={styles.auth_cont__logo}></div>
          <form onSubmit={submitApplication} className={styles.auth_cont__form}>
            <h5 className={styles.auth_cont__heading}>Welcome,</h5>
            <p className={styles.auth_cont__subheading}>
              Fill the form to start the interview process
            </p>
            <div className="u-margin-bottom-medium ">
              <FormField
                type="text"
                placeholder="Enter your full name"
                label="Candidate's Name"
                handleChange={handleChange}
                value={candidateData.name}
                name="name"
              />
              <p>{status && error}</p>
            </div>

            <div className="u-margin-bottom-medium ">
              <Dropdown
                name={"stack"}
                label="Your development stack"
                options={options}
                selected={candidateData.stack}
                handleChange={handleChange}
              />
            </div>
            <button
              className={`${styles.auth_cont__button} u-margin-bottom-medium`}
            >
              APPLY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Apply;
