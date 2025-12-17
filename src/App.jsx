import { useState, useCallback } from 'react';
import Stage from './components/Stage';
import Settings from './components/Settings';
import ErrorBoundary from './components/ErrorBoundary';
import { useTimerConfig } from './hooks/useTimerConfig';
import { TIMER_CONSTANTS } from './constants/timer';
import settingsIcon from './assets/icons/settings.svg';
import './App.css';
import './components/ErrorBoundary.css';

function App() {
	const [currentStage, setCurrentStage] = useState(
		TIMER_CONSTANTS.STAGES.FOCUS
	);
	const [pomodoros, setPomodoros] = useState(0);
	const [showSettings, setShowSettings] = useState(false);

	const {
		timerConfig,
		configSetters,
		getStageTime,
		autoStartFocus,
		autoStartBreaks,
		pomodorosUntilLongBreak,
	} = useTimerConfig();

	const updateStage = useCallback(
		(stage) => {
			setCurrentStage(stage);
		},
		[setCurrentStage]
	);

	return (
		<ErrorBoundary>
			<main>
				<button
					className='settings-toggle-button'
					onClick={() => setShowSettings(!showSettings)}
					aria-label='Toggle settings'
					aria-expanded={showSettings}>
					<img src={settingsIcon} alt='Settings' />
				</button>
				<h1 className='title page-title'>{currentStage}</h1>
				<div className='stage-container'>
					<button
						className='stage-selector-button'
						onClick={() =>
							updateStage(TIMER_CONSTANTS.STAGES.FOCUS)
						}
						aria-pressed={
							currentStage === TIMER_CONSTANTS.STAGES.FOCUS
						}>
						{TIMER_CONSTANTS.STAGES.FOCUS}
					</button>
					<button
						className='stage-selector-button'
						onClick={() =>
							updateStage(TIMER_CONSTANTS.STAGES.BREAK)
						}
						aria-pressed={
							currentStage === TIMER_CONSTANTS.STAGES.BREAK
						}>
						{TIMER_CONSTANTS.STAGES.BREAK}
					</button>
					<button
						className='stage-selector-button'
						onClick={() =>
							updateStage(TIMER_CONSTANTS.STAGES.LONG_BREAK)
						}
						aria-pressed={
							currentStage === TIMER_CONSTANTS.STAGES.LONG_BREAK
						}>
						{TIMER_CONSTANTS.STAGES.LONG_BREAK}
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
						timerConfig={timerConfig}
						configSetters={configSetters}
						currentStage={currentStage}
						setShowSettings={setShowSettings}
						updateStage={updateStage}
					/>
				)}
			</main>
		</ErrorBoundary>
	);
}

export default App;
