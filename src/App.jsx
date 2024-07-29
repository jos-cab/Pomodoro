import React, { useState } from "react";
import Stage from "./components/Stage";
import Settings from "./components/Settings";
import "./App.css";

function App() {
	const [currentStage, setCurrentStage] = useState("Focus");
	const [pomodoros, setPomodoros] = useState(0);

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
		<>
			<h1>{currentStage}</h1>
			<button onClick={() => setCurrentStage("Focus")}>Focus</button>
			<button onClick={() => setCurrentStage("Break")}>Break</button>
			<button onClick={() => setCurrentStage("Long break")}>Long break</button>

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
			/>
		</>
	);
}

export default App;
