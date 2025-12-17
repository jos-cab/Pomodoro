import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import endStageSoundSource from '../assets/sounds/end-stage.mp3';
import clickButton from '../assets/sounds/interface-button.mp3';
import { TIMER_CONSTANTS, timeHelpers } from '../constants/timer';
import {
	showNotification,
	setWindowTitle,
	setAlwaysOnTop,
} from '../utils/electron.js';
import './Stage.css';

const rootElement = document.getElementById('root');

function Stage({
	getStageTime,
	currentStage,
	setCurrentStage,
	pomodoros,
	setPomodoros,
	autoStartFocus,
	autoStartBreaks,
	pomodorosUntilLongBreak,
}) {
	const [isRunning, setIsRunning] = useState(false);
	const [currentTime, setCurrentTime] = useState(getStageTime(currentStage));
	const interval = useRef(null);
	const endTimeRef = useRef(null);
	const pauseTimeRef = useRef(null);

	const startButtonRef = useRef(null);

	const displayTime = useMemo(() => {
		return timeHelpers.toDisplayTime(currentTime).formatted;
	}, [currentTime]);

	const focusColor = useMemo(() => TIMER_CONSTANTS.FOCUS_COLOR, []);
	const breakColor = useMemo(() => TIMER_CONSTANTS.BREAK_COLOR, []);

	const [startColor, setStartColor] = useState(focusColor);
	const [endColor, setEndColor] = useState(breakColor);

	const interpolateColor = useCallback(
		(progress) => {
			// Calculate the interpolated color values
			const r = Math.floor(
				startColor.r + (1 - progress) * (endColor.r - startColor.r)
			);
			const g = Math.floor(
				startColor.g + (1 - progress) * (endColor.g - startColor.g)
			);
			const b = Math.floor(
				startColor.b + (1 - progress) * (endColor.b - startColor.b)
			);

			return `rgb(${r}, ${g}, ${b})`;
		},
		[startColor, endColor]
	);

	useEffect(() => {
		if (startButtonRef.current) {
			const rgbColor = interpolateColor(
				currentTime / getStageTime(currentStage)
			);
			const rgbaColor = rgbColor
				.replace('rgb', 'rgba')
				.replace(')', ', 0.8)');
			startButtonRef.current.style.color = rgbaColor;
		}

		// Update window title with current timer
		const title = isRunning
			? `${displayTime} - ${currentStage} - Pomodoro Timer`
			: `${currentStage} - Pomodoro Timer`;
		setWindowTitle(title);

		// Set always on top during focus sessions
		if (currentStage === TIMER_CONSTANTS.STAGES.FOCUS && isRunning) {
			setAlwaysOnTop(true);
		} else {
			setAlwaysOnTop(false);
		}
	}, [
		currentTime,
		currentStage,
		getStageTime,
		interpolateColor,
		displayTime,
		isRunning,
	]);

	rootElement.style.backgroundColor = interpolateColor(
		currentTime / getStageTime(currentStage)
	);

	useEffect(() => {
		// Reset all timer state when stage changes
		setIsRunning(false);
		clearInterval(interval.current);
		endTimeRef.current = null;
		pauseTimeRef.current = null;
		setCurrentTime(getStageTime(currentStage));

		if (currentStage === TIMER_CONSTANTS.STAGES.FOCUS) {
			setStartColor(focusColor);
			setEndColor(breakColor);
			setTimeout(() => setIsRunning(autoStartFocus), 0);
		} else {
			setStartColor(breakColor);
			setEndColor(focusColor);
			setTimeout(() => setIsRunning(autoStartBreaks), 0);
		}
	}, [
		currentStage,
		getStageTime,
		focusColor,
		breakColor,
		autoStartFocus,
		autoStartBreaks,
	]);

	const handleStageTransition = useCallback(async () => {
		const endStageSound = new Audio(endStageSoundSource);
		endStageSound.play();

		let nextStage;
		let notificationMessage;

		switch (currentStage) {
			case TIMER_CONSTANTS.STAGES.FOCUS:
				setPomodoros(pomodoros + 1);
				nextStage =
					pomodoros % pomodorosUntilLongBreak === 0
						? TIMER_CONSTANTS.STAGES.LONG_BREAK
						: TIMER_CONSTANTS.STAGES.BREAK;
				notificationMessage = `Focus session complete! Time for a ${nextStage.toLowerCase()}.`;
				break;
			case TIMER_CONSTANTS.STAGES.BREAK:
				nextStage = TIMER_CONSTANTS.STAGES.FOCUS;
				notificationMessage =
					'Break time is over! Ready to focus again?';
				break;
			case TIMER_CONSTANTS.STAGES.LONG_BREAK:
				nextStage = TIMER_CONSTANTS.STAGES.FOCUS;
				notificationMessage =
					'Long break finished! Time to get back to work.';
				break;
			default:
				console.error('Unknown stage:', currentStage);
				return;
		}

		// Show desktop notification
		await showNotification('Pomodoro Timer', notificationMessage);

		// Clean up current timer state before transitioning
		setIsRunning(false);
		clearInterval(interval.current);
		endTimeRef.current = null;
		pauseTimeRef.current = null;

		setCurrentStage(nextStage);
	}, [
		currentStage,
		pomodoros,
		pomodorosUntilLongBreak,
		setPomodoros,
		setCurrentStage,
	]);

	useEffect(() => {
		if (isRunning) {
			const now = Date.now();

			if (!endTimeRef.current) {
				endTimeRef.current = now + currentTime * 1000;
			}

			const initialDiff = Math.max(
				0,
				Math.floor((endTimeRef.current - now) / 1000)
			);
			setCurrentTime(initialDiff);

			interval.current = setInterval(() => {
				const diff = Math.max(
					0,
					Math.floor((endTimeRef.current - Date.now()) / 1000)
				);
				setCurrentTime(diff);

				if (diff <= 0) {
					clearInterval(interval.current);
					endTimeRef.current = null;
					setIsRunning(false);
					handleStageTransition();
				}
			}, TIMER_CONSTANTS.TIMER_INTERVAL_MS);
		} else {
			clearInterval(interval.current);
		}

		return () => clearInterval(interval.current);
	}, [isRunning, currentStage, currentTime, handleStageTransition]);

	const handlePause = () => {
		const clickButtonSound = new Audio(clickButton);
		clickButtonSound.play();

		if (isRunning) {
			clearInterval(interval.current);
			const remaining = Math.max(
				0,
				Math.floor((endTimeRef.current - Date.now()) / 1000)
			);
			pauseTimeRef.current = remaining;
			setCurrentTime(remaining);
			setIsRunning(false);
		} else {
			const timeLeft = pauseTimeRef.current ?? currentTime;
			endTimeRef.current = Date.now() + timeLeft * 1000;
			pauseTimeRef.current = null;
			setIsRunning(true);
		}
	};

	return (
		<>
			<h1 className='timer'>{displayTime}</h1>
			<button
				className='timer-control-button'
				ref={startButtonRef}
				onClick={handlePause}
				aria-label={isRunning ? 'Pause timer' : 'Start timer'}
				aria-pressed={isRunning}>
				{isRunning ? 'Stop' : 'Start'}
			</button>
		</>
	);
}

Stage.propTypes = {
	getStageTime: PropTypes.func.isRequired,
	currentStage: PropTypes.string.isRequired,
	setCurrentStage: PropTypes.func.isRequired,
	pomodoros: PropTypes.number.isRequired,
	setPomodoros: PropTypes.func.isRequired,
	autoStartFocus: PropTypes.bool.isRequired,
	autoStartBreaks: PropTypes.bool.isRequired,
	pomodorosUntilLongBreak: PropTypes.number.isRequired,
};

export default memo(Stage);
