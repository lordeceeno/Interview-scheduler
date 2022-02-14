import React from "react";
import styles from "./header.module.scss";
import { NavLink } from "react-router-dom";

const header = () => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header__left}>
          {/* <img src={Logo} alt='logo' /> */}
        </div>
        <div className={styles.header__right}>
          <div className={styles.header__right__link}>
            <NavLink
              to="/apply"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span>Apply as Candidate</span>
            </NavLink>
          </div>
          <div className={styles.header__right__link}>
            <NavLink to="/create-interviewer">
              <span>Create Interviewer</span>
            </NavLink>
          </div>
          <div className={styles.header__right__link}>
            <NavLink to="/interviewer">
              <span>Interviewer Dashboard</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default header;
