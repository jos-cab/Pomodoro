import React, { useState } from "react";
import Stage from "./components/Stage";
import "./App.css";

function App() {
	const [currentStage, setStage] = useState("Focus");
	const [pomodoros, setPomodoros] = useState(0);

	console.log(pomodoros);

	return (
		<>
			<h1>{currentStage}</h1>
			<button onClick={() => setStage("Focus")}>Focus</button>
			<button onClick={() => setStage("Break")}>Break</button>
			<button onClick={() => setStage("Long break")}>Long break</button>
			<Stage
				time={getStageTime(currentStage)}
				currentStage={currentStage}
				setStage={setStage}
				pomodoros={pomodoros}
				setPomodoros={setPomodoros}
			/>
		</>
	);
}

const getStageTime = (stage) => {
	switch (stage) {
		case "Focus":
			return 1500;
		case "Break":
			return 300;
		case "Long break":
			return 600;
		default:
			console.log("Unknown stage:", stage);
			return 0;
	}
};

export default App;
