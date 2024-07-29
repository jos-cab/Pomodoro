import React, { useState } from "react";

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
	};

	// Create input components with the current state as value
	const numericSettingFields = [
		"focusTime",
		"breakTime",
		"longBreakTime",
		"pomodorosUntilLongBreak",
	];

	const checkSettingFields = ["autoStartFocus", "autoStartBreaks"];

	const numericSettingFieldsComponents = numericSettingFields.map((field) => (
		<input
			type="number"
			name={field}
			key={field}
			value={formData[field]}
			onChange={handleChange}
		/>
	));

	const checkSettingFieldsComponents = checkSettingFields.map((field) => (
		<input
			type="checkbox"
			name={field}
			key={field}
			checked={formData[field]}
			onChange={handleChange}
		/>
	));

	return (
		<>
			<form>
				{numericSettingFieldsComponents}
				{checkSettingFieldsComponents}
				<button onClick={handleClick}>Save Settings</button>
			</form>
		</>
	);
}

export default Settings;
