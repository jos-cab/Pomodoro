import React, { useState, useRef, useEffect } from "react";
import endStageSoundSource from "../public/end-stage.mp3";

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

	let displayHours = Math.floor(currentTime / 3600);
	let displayMinutes = Math.floor(currentTime / 60) % 60;
	let displaySeconds = currentTime % 60;

	if (displayHours < 10) displayHours = "0" + displayHours;
	if (displayMinutes < 10) displayMinutes = "0" + displayMinutes;
	if (displaySeconds < 10) displaySeconds = "0" + displaySeconds;

	const displayTime =
		displayHours + ":" + displayMinutes + ":" + displaySeconds;

	useEffect(() => {
		setCurrentTime(getStageTime(currentStage));
		currentStage == "Focus"
			? setTimeout(() => setIsRunning(autoStartFocus), 0)
			: setTimeout(() => setIsRunning(autoStartBreaks), 0);
	}, [currentStage]);

	useEffect(() => {
		if (isRunning) {
			interval.current = setInterval(() => {
				setCurrentTime((prevTime) => {
					if (prevTime <= 1) {
						clearInterval(interval.current);
						setIsRunning(false);
						handleStageTransition();
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		} else {
			clearInterval(interval.current);
		}

		return () => clearInterval(interval.current);
	}, [isRunning]);

	const handleStageTransition = () => {
		endStageSound.play();

		let nextStage;

		switch (currentStage) {
			case "Focus":
				const newPomodoros = pomodoros + 1;
				setTimeout(() => setPomodoros(newPomodoros), 0);
				nextStage =
					newPomodoros % pomodorosUntilLongBreak == 0 ? "Long break" : "Break";
				break;
			case "Break":
				nextStage = "Focus";
				break;
			case "Long break":
				nextStage = "Focus";
				break;
			default:
				//console.error("Unknown stage:", currentStage);
				return;
		}

		nextStage == "Focus"
			? setTimeout(() => setIsRunning(autoStartFocus), 0)
			: setTimeout(() => setIsRunning(autoStartBreaks), 0);

		setTimeout(() => setCurrentStage(nextStage), 0);
		setTimeout(() => setCurrentTime(getStageTime(nextStage)), 0);
	};

	return (
		<>
			<h1>{displayTime}</h1>
			<button onClick={() => setIsRunning(!isRunning)}>
				{isRunning ? "Stop" : "Start"}
			</button>
		</>
	);
}

export default Stage;
