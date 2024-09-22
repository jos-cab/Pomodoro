import React, { useState, useEffect } from "react";
import "./Settings.css";

function Settings({
  setFocusTime,
  setBreakTime,
  setLongBreakTime,
  setAutoStartFocus,
  setAutoStartBreaks,
  setPomodorosUntilLongBreak,
  currentStage,
  setShowSettings,
  updateStage,
}) {
  const initialFormData = {
    focusTime: Number(localStorage.getItem("focusTime")) || 25,
    breakTime: Number(localStorage.getItem("breakTime")) || 5,
    longBreakTime: Number(localStorage.getItem("longBreakTime")) || 15,
    autoStartFocus: localStorage.getItem("autoStartFocus") === "true" || false,
    autoStartBreaks:
      localStorage.getItem("autoStartBreaks") === "true" || false,
    pomodorosUntilLongBreak:
      Number(localStorage.getItem("pomodorosUntilLongBreak")) || 4,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === "checkbox" ? checked : event.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    localStorage.setItem(name, type === "checkbox" ? value : Number(value));
  };

  const handleClick = (event) => {
    event.preventDefault();

    if (
      formData.focusTime < 1 ||
      formData.focusTime > 1440 ||
      formData.breakTime < 1 ||
      formData.breakTime > 1440 ||
      formData.longBreakTime < 1 ||
      formData.longBreakTime > 1440 ||
      formData.pomodorosUntilLongBreak < 1 ||
      formData.pomodorosUntilLongBreak > 1440
    )
      return;

    setFocusTime(formData.focusTime);
    setBreakTime(formData.breakTime);
    setLongBreakTime(formData.longBreakTime);
    setAutoStartFocus(formData.autoStartFocus);
    setAutoStartBreaks(formData.autoStartBreaks);
    setPomodorosUntilLongBreak(formData.pomodorosUntilLongBreak);
    updateStage(currentStage);
    setShowSettings(false);
  };

  const numericSettingFields = [
    "focusTime",
    "breakTime",
    "longBreakTime",
    "pomodorosUntilLongBreak",
  ];

  const checkSettingFields = ["autoStartFocus", "autoStartBreaks"];

  const transformCamelCase = (str) => {
    const words = str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .map((word) => word.toLowerCase());
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ");
  };

  const numericSettingFieldsComponents = numericSettingFields.map((field) => (
    <div className="input-field" key={field}>
      <label htmlFor={field}>{transformCamelCase(field)}</label>
      <input
        min={1}
        max={1440}
        type="number"
        name={field}
        id={field}
        value={formData[field]}
        onChange={handleChange}
      />
    </div>
  ));

  const checkSettingFieldsComponents = checkSettingFields.map((field) => (
    <div className="input-field" key={field}>
      <label htmlFor={field}>{transformCamelCase(field)}</label>
      <input
        type="checkbox"
        name={field}
        id={field}
        checked={formData[field]}
        onChange={handleChange}
      />
      <span
        onClick={() =>
          handleChange({
            target: {
              name: field,
              type: "checkbox",
              checked: !formData[field],
            },
          })
        }
      />
    </div>
  ));

  return (
    <>
      <div className="settings-background"></div>
      <form id="settings">
        <h2 className="title settings-title">Settings</h2>
        {numericSettingFieldsComponents}
        {checkSettingFieldsComponents}
        <button className="save-settings" onClick={handleClick}>
          Save Settings
        </button>
      </form>
    </>
  );
}

export default Settings;
