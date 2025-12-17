# Pomodoro Timer

A productivity-focused Pomodoro timer built with React, available both as a web application and desktop app. Style was influenced by [pomofocus](https://pomofocus.io/).

## 🌐 Web Version

Check out the [Live Demo](https://jos-cab.github.io/Pomodoro/)

## 🖥️ Desktop App

Cross-platform desktop application with enhanced features:

-   **Native system notifications** when sessions end
-   **Always-on-top** during focus sessions
-   **Dynamic window titles** showing current timer
-   **Clean interface** without menu bar clutter
-   **Fast startup** and optimized performance

### Desktop Features

-   Focus session notifications: "Focus session complete! Time for a break."
-   Break end notifications: "Break time is over! Ready to focus again?"
-   Long break notifications: "Long break finished! Time to get back to work."
-   Window stays on top during focus sessions for better productivity

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm

### Installation

```bash
git clone https://github.com/jos-cab/Pomodoro.git
cd Pomodoro
npm install
```

### Development

```bash
# Web development server
npm run dev

# Desktop app development (with hot reload)
npm run dev:electron
```

### Building

#### Web Version

```bash
# Build for web deployment
npm run build:web

# Deploy to GitHub Pages
npm run deploy
```

#### Desktop App

```bash
# Build and run desktop app
npm run start:electron

# Build distributables for all platforms
npm run dist:all

# Build for current platform only
npm run dist
```

## 📦 Desktop App Distribution

The desktop app builds for multiple platforms:

-   **Windows**: NSIS installer and portable executable
-   **macOS**: DMG installer and ZIP archive (Intel + Apple Silicon)
-   **Linux**: AppImage (universal), DEB and RPM packages

Built files are located in the `release/` directory.

## ⚙️ Usage

### Timer Settings

-   All times in settings must be in minutes
-   Customizable focus, break, and long break durations
-   Adjustable number of pomodoros until long break
-   Auto-start options for focus sessions and breaks

### Desktop App Controls

-   Standard keyboard shortcuts work (Cmd+Q/Alt+F4 to quit)
-   Window can be minimized, resized, and moved
-   Notifications appear automatically when sessions end

## 🛠️ Built With

-   **React** - Frontend framework
-   **Vite** - Build tool and development server
-   **Electron** - Desktop app framework
-   **electron-builder** - Desktop app packaging

## 📝 Scripts

-   `npm run dev` - Start web development server
-   `npm run dev:electron` - Start desktop app in development mode
-   `npm run build:web` - Build web version
-   `npm run start:electron` - Build and run desktop app
-   `npm run dist` - Build desktop distributables
-   `npm run lint` - Run ESLint

## 🤝 Contributing

Feel free to suggest any changes or improvements by opening an issue or pull request.

## ⚠️ Development Notes

### NPM Warnings

During `npm install`, you may see deprecation warnings for packages like `rimraf`, `glob`, and `inflight`. These warnings come from deep dependencies of `electron-builder` and similar tools, not from our direct dependencies.

**These warnings are safe to ignore** as they:

-   Don't affect the functionality of the application
-   Come from transitive dependencies we don't control directly
-   Will be resolved when the maintainers of those packages update their dependencies

All our direct dependencies are up-to-date and use modern, non-deprecated packages.

## 📄 License

This project is licensed under the ISC License.
