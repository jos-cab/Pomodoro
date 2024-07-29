import React, { useState, useRef, useEffect } from "react";

export default function Stage({
	time,
	currentStage,
	setStage,
	pomodoros,
	setPomodoros,
}) {
	const [isRunning, setIsRunning] = useState(false);
	const [currentTime, setCurrentTime] = useState(time);
	const interval = useRef(null);

	useEffect(() => {
		setCurrentTime(time);
	}, [time]);

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
	}, [isRunning, time, currentStage]);

	const handleStageTransition = () => {
		let nextStage;
		switch (currentStage) {
			case "Focus":
				const newPomodoros = pomodoros + 1;
				setTimeout(() => setPomodoros(newPomodoros), 0);
				nextStage = newPomodoros % 3 == 0 ? "Long break" : "Break";

				break;
			case "Break":
				nextStage = "Focus";
				break;
			case "Long break":
				nextStage = "Focus";
				break;
			default:
				console.error("Unknown stage:", currentStage);
				return;
		}

		// Ensure state update happens outside of the render phase
		setTimeout(() => setStage(nextStage), 0);
	};

	return (
		<>
			<h1>{currentTime}</h1>
			<button onClick={() => setIsRunning(!isRunning)}>
				{isRunning ? "Stop" : "Start"}
			</button>
		</>
	);
}
