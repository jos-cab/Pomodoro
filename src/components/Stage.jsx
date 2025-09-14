import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import endStageSoundSource from '../public/end-stage.mp3';
import clickButton from '../public/interface-button.mp3';
import './Stage.css';

const Root = document.getElementById('root');

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
	const endStageSound = new Audio(endStageSoundSource);
	const clickButtonSound = new Audio(clickButton);
	const endTimeRef = useRef(null);
	const pauseTimeRef = useRef(null);

	const StartBtn = useRef(null);

	let displayHours = Math.floor(currentTime / 3600);
	let displayMinutes = Math.floor(currentTime / 60) % 60;
	let displaySeconds = currentTime % 60;

	if (displayHours < 10) displayHours = '0' + displayHours;
	if (displayMinutes < 10) displayMinutes = '0' + displayMinutes;
	if (displaySeconds < 10) displaySeconds = '0' + displaySeconds;

	const displayTime =
		displayHours + ':' + displayMinutes + ':' + displaySeconds;

	const color_1 = { r: 225, g: 75, b: 75 }; // red
	const color_2 = { r: 50, g: 150, b: 200 }; // blue

	const [startColor, setStartColor] = useState(color_1);
	const [endColor, setEndColor] = useState(color_2);

	const interpolateColor = (progress) => {
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
	};

	useEffect(() => {
		if (StartBtn.current) {
			const rgbColor = interpolateColor(
				currentTime / getStageTime(currentStage)
			);
			const rgbaColor = rgbColor
				.replace('rgb', 'rgba')
				.replace(')', ', 0.8)');
			StartBtn.current.style.color = rgbaColor;
		}
	});

	Root.style.backgroundColor = interpolateColor(
		currentTime / getStageTime(currentStage)
	);

	useEffect(() => {
		// Reset all timer state when stage changes
		setIsRunning(false);
		clearInterval(interval.current);
		endTimeRef.current = null;
		pauseTimeRef.current = null;
		setCurrentTime(getStageTime(currentStage));

		if (currentStage === 'Focus') {
			setStartColor(color_1);
			setEndColor(color_2);
			setTimeout(() => setIsRunning(autoStartFocus), 0);
		} else {
			setStartColor(color_2);
			setEndColor(color_1);
			setTimeout(() => setIsRunning(autoStartBreaks), 0);
		}
	}, [currentStage]);

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
			}, 1000);
		} else {
			clearInterval(interval.current);
		}

		return () => clearInterval(interval.current);
	}, [isRunning, currentStage]);

	const handleStageTransition = () => {
		endStageSound.play();

		let nextStage;

		switch (currentStage) {
			case 'Focus':
				setPomodoros(pomodoros + 1);
				nextStage =
					pomodoros % pomodorosUntilLongBreak === 0
						? 'Long break'
						: 'Break';
				break;
			case 'Break':
				nextStage = 'Focus';
				break;
			case 'Long break':
				nextStage = 'Focus';
				break;
			default:
				//console.error("Unknown stage:", currentStage);
				return;
		}

		// Clean up current timer state before transitioning
		setIsRunning(false);
		clearInterval(interval.current);
		endTimeRef.current = null;
		pauseTimeRef.current = null;

		setCurrentStage(nextStage);
	};

	const handlePause = () => {
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
			<button className='start-btn' ref={StartBtn} onClick={handlePause}>
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

export default Stage;
