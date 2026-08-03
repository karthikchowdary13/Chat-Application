// Connect to the WebSocket server
const socket = new WebSocket("ws://localhost:3000");

// When connection opens
socket.onopen = () => {
    console.log("✅ Connected to server");
};

// When message is received from server
socket.onmessage = event => {
    appendMessage(event.data, 'server');
};

// Send message function
function sendMessage() {
    const input = document.getElementById("message");
    const message = input.value.trim();

    if (message === '') return;

    socket.send(message);
    appendMessage("You: " + message, 'client');
    input.value = '';
}

// Append message to chat box with style
function appendMessage(message, type) {
    const chatBox = document.getElementById("chat-box");
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", type);

    if (type === 'server') {
        // Remove "Server:" from the server message if it exists
        const cleanedMessage = message.replace(/^Server:\s*/i, "");
        msgDiv.textContent = "Venkat Panth: " + cleanedMessage;
    } else {
        msgDiv.textContent = message;
    }

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}
