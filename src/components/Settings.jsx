import React, { useState } from "react";
import "./Settings.css";

function Settings({
	focusTime,
	breakTime,
	longBreakTime,
	autoStartFocus,
	autoStartBreaks,
	pomodorosUntilLongBreak,
	setFocusTime,
	setBreakTime,
	setLongBreakTime,
	setAutoStartFocus,
	setAutoStartBreaks,
	setPomodorosUntilLongBreak,
	currentStage,
	setCurrentStage,
	setShowSettings,
}) {
	// Create local state for the form inputs
	const [formData, setFormData] = useState({
		focusTime,
		breakTime,
		longBreakTime,
		autoStartFocus,
		autoStartBreaks,
		pomodorosUntilLongBreak,
	});

	// Handle input change
	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	// Handle button click
	const handleClick = (event) => {
		event.preventDefault(); // Prevent form submission

		// Update the parent state with the new values
		setFocusTime(formData.focusTime);
		setBreakTime(formData.breakTime);
		setLongBreakTime(formData.longBreakTime);
		setAutoStartFocus(formData.autoStartFocus);
		setAutoStartBreaks(formData.autoStartBreaks);
		setPomodorosUntilLongBreak(formData.pomodorosUntilLongBreak);
		setTimeout(() => setCurrentStage(null), 0);
		setTimeout(() => setCurrentStage(currentStage), 1);
		setShowSettings(false);
	};

	// Create input components with the current state as value
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
