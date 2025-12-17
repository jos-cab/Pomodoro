import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// Log the error to console or error reporting service
		console.error('ErrorBoundary caught an error:', error, errorInfo);

		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null, errorInfo: null });
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className='error-boundary'>
					<div className='error-content'>
						<h2>Something went wrong</h2>
						<p>
							The Pomodoro timer encountered an unexpected error.
						</p>
						<button
							className='error-reset-button'
							onClick={this.handleReset}
							aria-label='Reset application'>
							Try Again
						</button>
						{process.env.NODE_ENV === 'development' && (
							<details className='error-details'>
								<summary>Error Details (Development)</summary>
								<pre>
									{this.state.error &&
										this.state.error.toString()}
								</pre>
								<pre>{this.state.errorInfo.componentStack}</pre>
							</details>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
