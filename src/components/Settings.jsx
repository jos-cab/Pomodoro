import React, { useState } from 'react';
import './Settings.css';

function Settings({
	setFocusTimeHours,
	setFocusTimeMinutes,
	setFocusTimeSeconds,
	setBreakTimeHours,
	setBreakTimeMinutes,
	setBreakTimeSeconds,
	setLongBreakTimeHours,
	setLongBreakTimeMinutes,
	setLongBreakTimeSeconds,
	setAutoStartFocus,
	setAutoStartBreaks,
	setPomodorosUntilLongBreak,
	currentStage,
	setShowSettings,
	updateStage,
}) {
	const initialFormData = {
		focusTimeHours:
			localStorage.getItem('focusTimeHours') !== null
				? Number(localStorage.getItem('focusTimeHours'))
				: 0,
		focusTimeMinutes:
			localStorage.getItem('focusTimeMinutes') !== null
				? Number(localStorage.getItem('focusTimeMinutes'))
				: 25,
		focusTimeSeconds:
			localStorage.getItem('focusTimeSeconds') !== null
				? Number(localStorage.getItem('focusTimeSeconds'))
				: 0,
		breakTimeHours:
			localStorage.getItem('breakTimeHours') !== null
				? Number(localStorage.getItem('breakTimeHours'))
				: 0,
		breakTimeMinutes:
			localStorage.getItem('breakTimeMinutes') !== null
				? Number(localStorage.getItem('breakTimeMinutes'))
				: 5,
		breakTimeSeconds:
			localStorage.getItem('breakTimeSeconds') !== null
				? Number(localStorage.getItem('breakTimeSeconds'))
				: 0,
		longBreakTimeHours:
			localStorage.getItem('longBreakTimeHours') !== null
				? Number(localStorage.getItem('longBreakTimeHours'))
				: 0,
		longBreakTimeMinutes:
			localStorage.getItem('longBreakTimeMinutes') !== null
				? Number(localStorage.getItem('longBreakTimeMinutes'))
				: 10,
		longBreakTimeSeconds:
			localStorage.getItem('longBreakTimeSeconds') !== null
				? Number(localStorage.getItem('longBreakTimeSeconds'))
				: 0,
		autoStartFocus:
			localStorage.getItem('autoStartFocus') !== null
				? localStorage.getItem('autoStartFocus') === 'true'
				: false,
		autoStartBreaks:
			localStorage.getItem('autoStartBreaks') !== null
				? localStorage.getItem('autoStartBreaks') === 'true'
				: false,
		pomodorosUntilLongBreak:
			localStorage.getItem('pomodorosUntilLongBreak') !== null
				? Number(localStorage.getItem('pomodorosUntilLongBreak'))
				: 3,
	};

	const [formData, setFormData] = useState(initialFormData);

	const handleChange = (event) => {
		const { name, type, checked } = event.target;
		const value =
			type === 'checkbox' ? checked : Number(event.target.value);

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		localStorage.setItem(
			name,
			type === 'checkbox' ? value : value.toString()
		);
	};

	const handleClick = (event) => {
		event.preventDefault();

		if (
			formData.focusTimeHours < 0 ||
			formData.focusTimeHours > 24 ||
			formData.focusTimeMinutes < 0 ||
			formData.focusTimeMinutes > 59 ||
			formData.focusTimeSeconds < 0 ||
			formData.focusTimeSeconds > 59 ||
			formData.breakTimeHours < 0 ||
			formData.breakTimeHours > 24 ||
			formData.breakTimeMinutes < 0 ||
			formData.breakTimeMinutes > 59 ||
			formData.breakTimeSeconds < 0 ||
			formData.breakTimeSeconds > 59 ||
			formData.longBreakTimeHours < 0 ||
			formData.longBreakTimeHours > 24 ||
			formData.longBreakTimeMinutes < 0 ||
			formData.longBreakTimeMinutes > 59 ||
			formData.longBreakTimeSeconds < 0 ||
			formData.longBreakTimeSeconds > 59 ||
			formData.focusTimeHours * 3600 +
				formData.focusTimeMinutes * 60 +
				formData.focusTimeSeconds <
				1 ||
			formData.breakTimeHours * 3600 +
				formData.breakTimeMinutes * 60 +
				formData.breakTimeSeconds <
				1 ||
			formData.longBreakTimeHours * 3600 +
				formData.longBreakTimeMinutes * 60 +
				formData.longBreakTimeSeconds <
				1 ||
			formData.pomodorosUntilLongBreak < 1 ||
			formData.pomodorosUntilLongBreak > 99
		)
			return;

		setFocusTimeHours(formData.focusTimeHours);
		setFocusTimeMinutes(formData.focusTimeMinutes);
		setFocusTimeSeconds(formData.focusTimeSeconds);
		setBreakTimeHours(formData.breakTimeHours);
		setBreakTimeMinutes(formData.breakTimeMinutes);
		setBreakTimeSeconds(formData.breakTimeSeconds);
		setLongBreakTimeHours(formData.longBreakTimeHours);
		setLongBreakTimeMinutes(formData.longBreakTimeMinutes);
		setLongBreakTimeSeconds(formData.longBreakTimeSeconds);

		setAutoStartFocus(formData.autoStartFocus);
		setAutoStartBreaks(formData.autoStartBreaks);

		setPomodorosUntilLongBreak(formData.pomodorosUntilLongBreak);

		updateStage(currentStage);

		// Save to localStorage
		// Object.keys(formData).forEach((key) => {
		// 	localStorage.setItem(key, formData[key].toString());
		// });

		setShowSettings(false);
	};

	const numericSettingFields = [
		'focusTime',
		'breakTime',
		'longBreakTime',
		'pomodorosUntilLongBreak',
	];

	const checkSettingFields = ['autoStartFocus', 'autoStartBreaks'];

	const transformCamelCase = (str) => {
		const words = str
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.split(' ')
			.map((word) => word.toLowerCase());
		words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
		return words.join(' ');
	};

	const handleLabelClick = (e, inputId) => {
		e.preventDefault();
		const inputElement = document.getElementById(inputId);
		if (inputElement) {
			inputElement.focus();
			inputElement.select();
		}
	};

	const numericSettingFieldsComponents = numericSettingFields.map((field) =>
		field.includes('Time') ? (
			<div className='input-field' key={field}>
				<label
					htmlFor={field + 'Hours'}
					onClick={(e) => handleLabelClick(e, field + 'Hours')}>
					{transformCamelCase(field)}
				</label>
				<input
					min={0}
					max={24}
					type='number'
					name={field + 'Hours'}
					id={field + 'Hours'}
					value={formData[field + 'Hours']}
					onChange={handleChange}
				/>
				<input
					min={0}
					max={59}
					type='number'
					name={field + 'Minutes'}
					id={field + 'Minutes'}
					value={formData[field + 'Minutes']}
					onChange={handleChange}
				/>
				<input
					min={0}
					max={59}
					type='number'
					name={field + 'Seconds'}
					id={field + 'Seconds'}
					value={formData[field + 'Seconds']}
					onChange={handleChange}
				/>
			</div>
		) : (
			<div className='input-field' key={field}>
				<label
					htmlFor={field}
					onClick={(e) => handleLabelClick(e, field)}>
					{transformCamelCase(field)}
				</label>
				<input
					min={1}
					max={99}
					type='number'
					name={field}
					id={field}
					value={formData[field]}
					onChange={handleChange}
				/>
			</div>
		)
	);

	const checkSettingFieldsComponents = checkSettingFields.map((field) => (
		<div className='input-field' key={field}>
			<label htmlFor={field}>{transformCamelCase(field)}</label>
			<input
				type='checkbox'
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
							type: 'checkbox',
							checked: !formData[field],
						},
					})
				}
			/>
		</div>
	));

	return (
		<>
			<div className='settings-background'></div>
			<form id='settings'>
				<h2 className='title settings-title'>Settings</h2>
				{numericSettingFieldsComponents}
				{checkSettingFieldsComponents}
				<button className='save-settings' onClick={handleClick}>
					Save Settings
				</button>
			</form>
		</>
	);
}

export default Settings;
