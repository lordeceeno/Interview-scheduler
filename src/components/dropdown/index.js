import React from "react";
import styles from "./dropdown.module.scss";

const Dropdown = (props) => {
  return (
    <div className={styles.dropdown}>
      <label className={styles.dropdown__label}>{props.label}</label>
      <div className={styles.dropdown__cont}>
        <select
          name={props.name}
          className={styles.dropdown__title}
          defaultValue={props.selected}
          onChange={props.handleChange}
        >
          {props.options &&
            props.options.map((option, i) => (
              <option value={option.stack} key={i}>
                {option.stack}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
