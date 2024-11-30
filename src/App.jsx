import React, { useState, useEffect } from "react";
import Stage from "./components/Stage";
import Settings from "./components/Settings";
import settingsIcon from "./public/settings.svg";
import "./App.css";

function App() {
	const [currentStage, setCurrentStage] = useState("Focus");
	const [pomodoros, setPomodoros] = useState(0);
	const [showSettings, setShowSettings] = useState(false);

	// Initialize state with localStorage values
	const [focusTime, setFocusTime] = useState(
		() => Number(localStorage.getItem("focusTime")) || 25
	);
	const [breakTime, setBreakTime] = useState(
		() => Number(localStorage.getItem("breakTime")) || 5
	);
	const [longBreakTime, setLongBreakTime] = useState(
		() => Number(localStorage.getItem("longBreakTime")) || 10
	);
	const [autoStartFocus, setAutoStartFocus] = useState(
		() => localStorage.getItem("autoStartFocus") === "true" || false
	);
	const [autoStartBreaks, setAutoStartBreaks] = useState(
		() => localStorage.getItem("autoStartBreaks") === "true" || false
	);
	const [pomodorosUntilLongBreak, setPomodorosUntilLongBreak] = useState(
		() => Number(localStorage.getItem("pomodorosUntilLongBreak")) || 3
	);

	useEffect(() => {
		// Load settings from localStorage when the component mounts
		setFocusTime(Number(localStorage.getItem("focusTime")) || 25);
		setBreakTime(Number(localStorage.getItem("breakTime")) || 5);
		setLongBreakTime(Number(localStorage.getItem("longBreakTime")) || 10);
		setAutoStartFocus(
			localStorage.getItem("autoStartFocus") === "true" || false
		);
		setAutoStartBreaks(
			localStorage.getItem("autoStartBreaks") === "true" || false
		);
		setPomodorosUntilLongBreak(
			Number(localStorage.getItem("pomodorosUntilLongBreak")) || 3
		);
	}, []);

	const getStageTime = (stage) => {
		switch (stage) {
			case "Focus":
				return focusTime * 60;
			case "Break":
				return breakTime * 60;
			case "Long break":
				return longBreakTime * 60;
			default:
				return 0;
		}
	};

	const updateStage = (stage) => {
		setTimeout(() => setCurrentStage(null), 0);
		setTimeout(() => setCurrentStage(stage), 1);
	};

	return (
		<main>
			<button
				className="settings-btn"
				onClick={() => setShowSettings(!showSettings)}
			>
				<img src={settingsIcon} alt="Settings" />
			</button>
			<h1 className="title page-title">{currentStage}</h1>
			<div className="stage-container">
				<button className="stage" onClick={() => updateStage("Focus")}>
					Focus
				</button>
				<button className="stage" onClick={() => updateStage("Break")}>
					Break
				</button>
				<button
					className="stage"
					onClick={() => updateStage("Long break")}
				>
					Long break
				</button>
			</div>

			<Stage
				getStageTime={getStageTime}
				currentStage={currentStage}
				setCurrentStage={setCurrentStage}
				pomodoros={pomodoros}
				setPomodoros={setPomodoros}
				autoStartFocus={autoStartFocus}
				autoStartBreaks={autoStartBreaks}
				pomodorosUntilLongBreak={pomodorosUntilLongBreak}
			/>

			{showSettings && (
				<Settings
					focusTime={focusTime}
					breakTime={breakTime}
					longBreakTime={longBreakTime}
					autoStartFocus={autoStartFocus}
					autoStartBreaks={autoStartBreaks}
					pomodorosUntilLongBreak={pomodorosUntilLongBreak}
					setFocusTime={setFocusTime}
					setBreakTime={setBreakTime}
					setLongBreakTime={setLongBreakTime}
					setAutoStartFocus={setAutoStartFocus}
					setAutoStartBreaks={setAutoStartBreaks}
					setPomodorosUntilLongBreak={setPomodorosUntilLongBreak}
					currentStage={currentStage}
					setShowSettings={setShowSettings}
					updateStage={updateStage}
				/>
			)}
		</main>
	);
}

export default App;
