import { useState, useCallback } from 'react';
import { TIMER_CONSTANTS, timeHelpers } from '../constants/timer.js';

const {
	STORAGE_KEYS,
	DEFAULT_FOCUS_MINUTES,
	DEFAULT_BREAK_MINUTES,
	DEFAULT_LONG_BREAK_MINUTES,
	DEFAULT_POMODOROS_UNTIL_LONG_BREAK,
} = TIMER_CONSTANTS;

// Helper function to get stored value or default
const getStoredValue = (key, defaultValue) => {
	const stored = localStorage.getItem(key);
	return stored !== null ? Number(stored) : defaultValue;
};

const getStoredBoolean = (key, defaultValue = false) => {
	const stored = localStorage.getItem(key);
	return stored !== null ? stored === 'true' : defaultValue;
};

export const useTimerConfig = () => {
	// Timer durations
	const [focusTimeHours, setFocusTimeHours] = useState(() =>
		getStoredValue(STORAGE_KEYS.FOCUS_TIME_HOURS, 0)
	);
	const [focusTimeMinutes, setFocusTimeMinutes] = useState(() =>
		getStoredValue(STORAGE_KEYS.FOCUS_TIME_MINUTES, DEFAULT_FOCUS_MINUTES)
	);
	const [focusTimeSeconds, setFocusTimeSeconds] = useState(() =>
		getStoredValue(STORAGE_KEYS.FOCUS_TIME_SECONDS, 0)
	);

	const [breakTimeHours, setBreakTimeHours] = useState(() =>
		getStoredValue(STORAGE_KEYS.BREAK_TIME_HOURS, 0)
	);
	const [breakTimeMinutes, setBreakTimeMinutes] = useState(() =>
		getStoredValue(STORAGE_KEYS.BREAK_TIME_MINUTES, DEFAULT_BREAK_MINUTES)
	);
	const [breakTimeSeconds, setBreakTimeSeconds] = useState(() =>
		getStoredValue(STORAGE_KEYS.BREAK_TIME_SECONDS, 0)
	);

	const [longBreakTimeHours, setLongBreakTimeHours] = useState(() =>
		getStoredValue(STORAGE_KEYS.LONG_BREAK_TIME_HOURS, 0)
	);
	const [longBreakTimeMinutes, setLongBreakTimeMinutes] = useState(() =>
		getStoredValue(
			STORAGE_KEYS.LONG_BREAK_TIME_MINUTES,
			DEFAULT_LONG_BREAK_MINUTES
		)
	);
	const [longBreakTimeSeconds, setLongBreakTimeSeconds] = useState(() =>
		getStoredValue(STORAGE_KEYS.LONG_BREAK_TIME_SECONDS, 0)
	);

	// Auto-start settings
	const [autoStartFocus, setAutoStartFocus] = useState(() =>
		getStoredBoolean(STORAGE_KEYS.AUTO_START_FOCUS)
	);
	const [autoStartBreaks, setAutoStartBreaks] = useState(() =>
		getStoredBoolean(STORAGE_KEYS.AUTO_START_BREAKS)
	);

	// Pomodoro cycle settings
	const [pomodorosUntilLongBreak, setPomodorosUntilLongBreak] = useState(() =>
		getStoredValue(
			STORAGE_KEYS.POMODOROS_UNTIL_LONG_BREAK,
			DEFAULT_POMODOROS_UNTIL_LONG_BREAK
		)
	);

	// Computed values
	const focusTime = timeHelpers.toSeconds(
		focusTimeHours,
		focusTimeMinutes,
		focusTimeSeconds
	);
	const breakTime = timeHelpers.toSeconds(
		breakTimeHours,
		breakTimeMinutes,
		breakTimeSeconds
	);
	const longBreakTime = timeHelpers.toSeconds(
		longBreakTimeHours,
		longBreakTimeMinutes,
		longBreakTimeSeconds
	);

	// Get stage time helper
	const getStageTime = useCallback(
		(stage) => {
			switch (stage) {
				case TIMER_CONSTANTS.STAGES.FOCUS:
					return focusTime;
				case TIMER_CONSTANTS.STAGES.BREAK:
					return breakTime;
				case TIMER_CONSTANTS.STAGES.LONG_BREAK:
					return longBreakTime;
				default:
					return 0;
			}
		},
		[focusTime, breakTime, longBreakTime]
	);

	// Configuration object for easy passing to components
	const timerConfig = {
		focus: {
			hours: focusTimeHours,
			minutes: focusTimeMinutes,
			seconds: focusTimeSeconds,
			total: focusTime,
		},
		break: {
			hours: breakTimeHours,
			minutes: breakTimeMinutes,
			seconds: breakTimeSeconds,
			total: breakTime,
		},
		longBreak: {
			hours: longBreakTimeHours,
			minutes: longBreakTimeMinutes,
			seconds: longBreakTimeSeconds,
			total: longBreakTime,
		},
		autoStart: { focus: autoStartFocus, breaks: autoStartBreaks },
		pomodorosUntilLongBreak,
	};

	// Setters object for easy passing to Settings component
	const configSetters = {
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
	};

	return {
		timerConfig,
		configSetters,
		getStageTime,
		// Individual values for backward compatibility
		focusTime,
		breakTime,
		longBreakTime,
		autoStartFocus,
		autoStartBreaks,
		pomodorosUntilLongBreak,
	};
};
