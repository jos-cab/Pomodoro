import { useState } from 'react';
import Stage from './components/Stage';
import Settings from './components/Settings';
import settingsIcon from './public/settings.svg';
import './App.css';

function App() {
	const [currentStage, setCurrentStage] = useState('Focus');
	const [pomodoros, setPomodoros] = useState(0);
	const [showSettings, setShowSettings] = useState(false);

	const [focusTimeHours, setFocusTimeHours] = useState(
		localStorage.getItem('focusTimeHours')
			? Number(localStorage.getItem('focusTimeHours'))
			: 0
	);
	const [focusTimeMinutes, setFocusTimeMinutes] = useState(
		localStorage.getItem('focusTimeMinutes')
			? Number(localStorage.getItem('focusTimeMinutes'))
			: 25
	);
	const [focusTimeSeconds, setFocusTimeSeconds] = useState(
		localStorage.getItem('focusTimeSeconds')
			? Number(localStorage.getItem('focusTimeSeconds'))
			: 0
	);
	const [breakTimeHours, setBreakTimeHours] = useState(
		localStorage.getItem('breakTimeHours')
			? Number(localStorage.getItem('breakTimeHours'))
			: 0
	);
	const [breakTimeMinutes, setBreakTimeMinutes] = useState(
		localStorage.getItem('breakTimeMinutes')
			? Number(localStorage.getItem('breakTimeMinutes'))
			: 5
	);
	const [breakTimeSeconds, setBreakTimeSeconds] = useState(
		localStorage.getItem('breakTimeSeconds')
			? Number(localStorage.getItem('breakTimeSeconds'))
			: 0
	);
	const [longBreakTimeHours, setLongBreakTimeHours] = useState(
		localStorage.getItem('longBreakTimeHours')
			? Number(localStorage.getItem('longBreakTimeHours'))
			: 0
	);
	const [longBreakTimeMinutes, setLongBreakTimeMinutes] = useState(
		localStorage.getItem('longBreakTimeMinutes')
			? Number(localStorage.getItem('longBreakTimeMinutes'))
			: 10
	);
	const [longBreakTimeSeconds, setLongBreakTimeSeconds] = useState(
		localStorage.getItem('longBreakTimeSeconds')
			? Number(localStorage.getItem('longBreakTimeSeconds'))
			: 0
	);

	const [autoStartFocus, setAutoStartFocus] = useState(
		localStorage.getItem('autoStartFocus') === 'true'
	);
	const [autoStartBreaks, setAutoStartBreaks] = useState(
		localStorage.getItem('autoStartBreaks') === 'true'
	);
	const [pomodorosUntilLongBreak, setPomodorosUntilLongBreak] = useState(
		localStorage.getItem('pomodorosUntilLongBreak')
			? Number(localStorage.getItem('pomodorosUntilLongBreak'))
			: 3
	);

	const focusTime =
		focusTimeHours * 3600 + focusTimeMinutes * 60 + focusTimeSeconds;
	const breakTime =
		breakTimeHours * 3600 + breakTimeMinutes * 60 + breakTimeSeconds;
	const longBreakTime =
		longBreakTimeHours * 3600 +
		longBreakTimeMinutes * 60 +
		longBreakTimeSeconds;

	const getStageTime = (stage) => {
		switch (stage) {
			case 'Focus':
				return focusTime;
			case 'Break':
				return breakTime;
			case 'Long break':
				return longBreakTime;
			default:
				return 0;
		}
	};

	const updateStage = (stage) => {
		setCurrentStage(stage);
	};

	return (
		<main>
			<button
				className='settings-btn'
				onClick={() => setShowSettings(!showSettings)}>
				<img src={settingsIcon} alt='Settings' />
			</button>
			<h1 className='title page-title'>{currentStage}</h1>
			<div className='stage-container'>
				<button className='stage' onClick={() => updateStage('Focus')}>
					Focus
				</button>
				<button className='stage' onClick={() => updateStage('Break')}>
					Break
				</button>
				<button
					className='stage'
					onClick={() => updateStage('Long break')}>
					Long break
				</button>
			</div>

			<Stage
				key={currentStage}
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
					setFocusTimeHours={setFocusTimeHours}
					setFocusTimeMinutes={setFocusTimeMinutes}
					setFocusTimeSeconds={setFocusTimeSeconds}
					setBreakTimeHours={setBreakTimeHours}
					setBreakTimeMinutes={setBreakTimeMinutes}
					setBreakTimeSeconds={setBreakTimeSeconds}
					setLongBreakTimeHours={setLongBreakTimeHours}
					setLongBreakTimeMinutes={setLongBreakTimeMinutes}
					setLongBreakTimeSeconds={setLongBreakTimeSeconds}
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
