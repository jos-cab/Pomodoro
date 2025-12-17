import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { TIMER_CONSTANTS } from '../constants/timer';
import './Settings.css';

function Settings({
	timerConfig,
	configSetters,
	currentStage,
	setShowSettings,
	updateStage,
}) {
	const initialFormData = {
		focusTimeHours: timerConfig.focus.hours,
		focusTimeMinutes: timerConfig.focus.minutes,
		focusTimeSeconds: timerConfig.focus.seconds,
		breakTimeHours: timerConfig.break.hours,
		breakTimeMinutes: timerConfig.break.minutes,
		breakTimeSeconds: timerConfig.break.seconds,
		longBreakTimeHours: timerConfig.longBreak.hours,
		longBreakTimeMinutes: timerConfig.longBreak.minutes,
		longBreakTimeSeconds: timerConfig.longBreak.seconds,
		autoStartFocus: timerConfig.autoStart.focus,
		autoStartBreaks: timerConfig.autoStart.breaks,
		pomodorosUntilLongBreak: timerConfig.pomodorosUntilLongBreak,
	};

	const [formData, setFormData] = useState(initialFormData);

	const handleInputChange = (event) => {
		const { name, type, checked } = event.target;
		const value =
			type === 'checkbox' ? checked : Number(event.target.value);

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Save to localStorage using constants
		const storageKey =
			TIMER_CONSTANTS.STORAGE_KEYS[
				name.toUpperCase().replace(/([A-Z])/g, '_$1')
			] || name;
		localStorage.setItem(
			storageKey,
			type === 'checkbox' ? value.toString() : value.toString()
		);
	};

	const validateFormData = (data) => {
		const {
			MAX_HOURS,
			MAX_MINUTES,
			MAX_SECONDS,
			MIN_TIME_SECONDS,
			VALIDATION,
		} = TIMER_CONSTANTS;

		// Validate time ranges
		const timeFields = [
			{ prefix: 'focusTime', name: 'Focus time' },
			{ prefix: 'breakTime', name: 'Break time' },
			{ prefix: 'longBreakTime', name: 'Long break time' },
		];

		for (const field of timeFields) {
			const hours = data[`${field.prefix}Hours`];
			const minutes = data[`${field.prefix}Minutes`];
			const seconds = data[`${field.prefix}Seconds`];

			if (
				hours < 0 ||
				hours > MAX_HOURS ||
				minutes < 0 ||
				minutes > MAX_MINUTES ||
				seconds < 0 ||
				seconds > MAX_SECONDS
			) {
				return `${field.name} values are out of range`;
			}

			const totalSeconds = hours * 3600 + minutes * 60 + seconds;
			if (totalSeconds < MIN_TIME_SECONDS) {
				return `${field.name} must be at least 1 second`;
			}
		}

		// Validate pomodoros until long break
		if (
			data.pomodorosUntilLongBreak <
				VALIDATION.MIN_POMODOROS_UNTIL_LONG_BREAK ||
			data.pomodorosUntilLongBreak >
				VALIDATION.MAX_POMODOROS_UNTIL_LONG_BREAK
		) {
			return 'Pomodoros until long break must be between 1 and 99';
		}

		return null;
	};

	const handleSaveSettings = (event) => {
		event.preventDefault();

		const validationError = validateFormData(formData);
		if (validationError) {
			alert(validationError);
			return;
		}

		// Update all settings using the configSetters
		configSetters.setFocusTimeHours(formData.focusTimeHours);
		configSetters.setFocusTimeMinutes(formData.focusTimeMinutes);
		configSetters.setFocusTimeSeconds(formData.focusTimeSeconds);
		configSetters.setBreakTimeHours(formData.breakTimeHours);
		configSetters.setBreakTimeMinutes(formData.breakTimeMinutes);
		configSetters.setBreakTimeSeconds(formData.breakTimeSeconds);
		configSetters.setLongBreakTimeHours(formData.longBreakTimeHours);
		configSetters.setLongBreakTimeMinutes(formData.longBreakTimeMinutes);
		configSetters.setLongBreakTimeSeconds(formData.longBreakTimeSeconds);
		configSetters.setAutoStartFocus(formData.autoStartFocus);
		configSetters.setAutoStartBreaks(formData.autoStartBreaks);
		configSetters.setPomodorosUntilLongBreak(
			formData.pomodorosUntilLongBreak
		);

		updateStage(currentStage);
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
					max={TIMER_CONSTANTS.MAX_HOURS}
					type='number'
					name={field + 'Hours'}
					id={field + 'Hours'}
					value={formData[field + 'Hours']}
					onChange={handleInputChange}
				/>
				<input
					min={0}
					max={TIMER_CONSTANTS.MAX_MINUTES}
					type='number'
					name={field + 'Minutes'}
					id={field + 'Minutes'}
					value={formData[field + 'Minutes']}
					onChange={handleInputChange}
				/>
				<input
					min={0}
					max={TIMER_CONSTANTS.MAX_SECONDS}
					type='number'
					name={field + 'Seconds'}
					id={field + 'Seconds'}
					value={formData[field + 'Seconds']}
					onChange={handleInputChange}
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
					min={
						TIMER_CONSTANTS.VALIDATION
							.MIN_POMODOROS_UNTIL_LONG_BREAK
					}
					max={
						TIMER_CONSTANTS.VALIDATION
							.MAX_POMODOROS_UNTIL_LONG_BREAK
					}
					type='number'
					name={field}
					id={field}
					value={formData[field]}
					onChange={handleInputChange}
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
				onChange={handleInputChange}
			/>
			<span
				onClick={() =>
					handleInputChange({
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
				<button className='save-settings' onClick={handleSaveSettings}>
					Save Settings
				</button>
			</form>
		</>
	);
}

Settings.propTypes = {
	timerConfig: PropTypes.shape({
		focus: PropTypes.shape({
			hours: PropTypes.number.isRequired,
			minutes: PropTypes.number.isRequired,
			seconds: PropTypes.number.isRequired,
			total: PropTypes.number.isRequired,
		}).isRequired,
		break: PropTypes.shape({
			hours: PropTypes.number.isRequired,
			minutes: PropTypes.number.isRequired,
			seconds: PropTypes.number.isRequired,
			total: PropTypes.number.isRequired,
		}).isRequired,
		longBreak: PropTypes.shape({
			hours: PropTypes.number.isRequired,
			minutes: PropTypes.number.isRequired,
			seconds: PropTypes.number.isRequired,
			total: PropTypes.number.isRequired,
		}).isRequired,
		autoStart: PropTypes.shape({
			focus: PropTypes.bool.isRequired,
			breaks: PropTypes.bool.isRequired,
		}).isRequired,
		pomodorosUntilLongBreak: PropTypes.number.isRequired,
	}).isRequired,
	configSetters: PropTypes.object.isRequired,
	currentStage: PropTypes.string.isRequired,
	setShowSettings: PropTypes.func.isRequired,
	updateStage: PropTypes.func.isRequired,
};

export default memo(Settings);
