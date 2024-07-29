import React, { useState } from "react";
import Stage from "./components/Stage";
import Settings from "./components/Settings";
import "./App.css";

function App() {
	const [currentStage, setCurrentStage] = useState("Focus");
	const [pomodoros, setPomodoros] = useState(0);
	const [showSettings, setShowSettings] = useState(false);

	/*settings*/
	const [focusTime, setFocusTime] = useState(1500);
	const [breakTime, setBreakTime] = useState(300);
	const [longBreakTime, setLongBreakTime] = useState(600);
	const [autoStartFocus, setAutoStartFocus] = useState(false);
	const [autoStartBreaks, setAutoStartBreaks] = useState(false);
	const [pomodorosUntilLongBreak, setPomodorosUntilLongBreak] = useState(3);

	const getStageTime = (stage) => {
		switch (stage) {
			case "Focus":
				return focusTime;
			case "Break":
				return breakTime;
			case "Long break":
				return longBreakTime;
			default:
				//console.log("Unknown stage:", stage);
				return 0;
		}
	};

	return (
		<main>
			<button
				className="settings-btn"
				onClick={() => setShowSettings(!showSettings)}>
				<img src="./settings.svg" alt="Settings" />
			</button>
			<h1 className="title page-title">{currentStage}</h1>
			<div className="stage-container">
				<button className="stage" onClick={() => setCurrentStage("Focus")}>
					Focus
				</button>
				<button className="stage" onClick={() => setCurrentStage("Break")}>
					Break
				</button>
				<button className="stage" onClick={() => setCurrentStage("Long break")}>
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
					setCurrentStage={setCurrentStage}
					setShowSettings={setShowSettings}
				/>
			)}
		</main>
	);
}

export default App;
