import React from "react";
import Select from "react-select";
import styles from "./formfield.module.scss";

export const FormField = (props) => {
  return (
    <div className={styles.formfield_cont}>
      <div className={styles.formField_label}>
        <label>{props.label}</label>
      </div>
      <div className={styles.formField_input}>
        <input
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          name={props.name}
          required={props.required ? true : false}
        />
      </div>
    </div>
  );
};

export const CustomSelect = (props) => {
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#E8EEF6",
      padding: "16px",
      border: "1px solid #D8DEE6",
      borderRadius: "8px",
      flex: 1,
    }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        backgroundColor: "#E8EEF6",
        // color: "#FFF",
        cursor: "pointer",
      };
    },
  };
  return (
    <div className={styles.formfield_cont}>
      <div className={styles.formField_label}>
        <label>{props.label}</label>
      </div>
      <div className={styles.formField_input}>
        <Select
          className="react-select-container"
          name={props.interviewer}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          options={props.options}
          styles={colourStyles}
        />
      </div>
    </div>
  );
};
