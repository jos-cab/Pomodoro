// Timer configuration constants
export const TIMER_CONSTANTS = {
	// Time limits
	MAX_HOURS: 24,
	MAX_MINUTES: 59,
	MAX_SECONDS: 59,
	MIN_TIME_SECONDS: 1,

	// Default timer values (in minutes for UI, converted to seconds for logic)
	DEFAULT_FOCUS_MINUTES: 25,
	DEFAULT_BREAK_MINUTES: 5,
	DEFAULT_LONG_BREAK_MINUTES: 10,
	DEFAULT_POMODOROS_UNTIL_LONG_BREAK: 3,

	// Timer intervals
	TIMER_INTERVAL_MS: 1000,

	// Color schemes
	FOCUS_COLOR: { r: 225, g: 75, b: 75 }, // Red
	BREAK_COLOR: { r: 50, g: 150, b: 200 }, // Blue

	// Stage names
	STAGES: {
		FOCUS: 'Focus',
		BREAK: 'Break',
		LONG_BREAK: 'Long break',
	},

	// Local storage keys
	STORAGE_KEYS: {
		FOCUS_TIME_HOURS: 'focusTimeHours',
		FOCUS_TIME_MINUTES: 'focusTimeMinutes',
		FOCUS_TIME_SECONDS: 'focusTimeSeconds',
		BREAK_TIME_HOURS: 'breakTimeHours',
		BREAK_TIME_MINUTES: 'breakTimeMinutes',
		BREAK_TIME_SECONDS: 'breakTimeSeconds',
		LONG_BREAK_TIME_HOURS: 'longBreakTimeHours',
		LONG_BREAK_TIME_MINUTES: 'longBreakTimeMinutes',
		LONG_BREAK_TIME_SECONDS: 'longBreakTimeSeconds',
		AUTO_START_FOCUS: 'autoStartFocus',
		AUTO_START_BREAKS: 'autoStartBreaks',
		POMODOROS_UNTIL_LONG_BREAK: 'pomodorosUntilLongBreak',
	},

	// Validation limits
	VALIDATION: {
		MIN_POMODOROS_UNTIL_LONG_BREAK: 1,
		MAX_POMODOROS_UNTIL_LONG_BREAK: 99,
	},
};

// Helper functions for time conversion
export const timeHelpers = {
	// Convert hours, minutes, seconds to total seconds
	toSeconds: (hours, minutes, seconds) =>
		hours * 3600 + minutes * 60 + seconds,

	// Convert seconds to display format
	toDisplayTime: (totalSeconds) => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor(totalSeconds / 60) % 60;
		const seconds = totalSeconds % 60;

		return {
			hours: hours < 10 ? '0' + hours : hours.toString(),
			minutes: minutes < 10 ? '0' + minutes : minutes.toString(),
			seconds: seconds < 10 ? '0' + seconds : seconds.toString(),
			formatted: `${hours < 10 ? '0' + hours : hours}:${
				minutes < 10 ? '0' + minutes : minutes
			}:${seconds < 10 ? '0' + seconds : seconds}`,
		};
	},
};
