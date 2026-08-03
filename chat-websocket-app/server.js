const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

// 💬 Intelligent chatbot logic
function getBotReply(message) {
    message = message.toString().toLowerCase();

    if (message.includes("hello") || message.includes("hi")) 
        return "Hi there! How can I help you today?";

    if (message.includes("your name")) 
        return "I'm NPS Bot, your virtual assistant.";

    if (message.includes("time")) 
        return "Sorry, I can't tell time yet, but you can check your clock 😊";

    if (message.includes("bye")) 
        return "Goodbye! Have a great day!";

    // 🔌 Network Protocol related questions
    if (message.includes("what is tcp")) 
        return "TCP (Transmission Control Protocol) ensures reliable, ordered, and error-checked delivery of data.";

    if (message.includes("what is udp")) 
        return "UDP (User Datagram Protocol) is a faster, connectionless protocol, but it doesn't guarantee delivery or order.";

    if (message.includes("difference between tcp and udp")) 
        return "TCP is reliable and connection-based. UDP is faster but connectionless and doesn't guarantee delivery.";

    if (message.includes("what is ip")) 
        return "IP (Internet Protocol) handles addressing and routing of packets between devices.";

    if (message.includes("dns")) 
        return "DNS (Domain Name System) translates domain names (like google.com) into IP addresses.";

    if (message.includes("http")) 
        return "HTTP (Hypertext Transfer Protocol) is used for transferring web pages over the internet.";

    if (message.includes("https")) 
        return "HTTPS is a secure version of HTTP, using encryption via SSL/TLS.";

    if (message.includes("port number")) 
        return "Port numbers identify specific processes/services on a device. For example, HTTP uses port 80.";

    if (message.includes("what is protocol")) 
        return "A protocol is a set of rules that define how data is transmitted over a network.";

    if (message.includes("osi model")) 
        return "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.";

    return "I'm not sure how to respond to that. Try asking something else about networks or protocols.";
}

// 📡 WebSocket server
wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        console.log('Received:', message);
        const reply = getBotReply(message);

        // Add a 3–5 second delay
        const delay = Math.floor(Math.random() * 2000) + 3000;

        setTimeout(() => {
            ws.send(`Server: ${reply}`);
        }, delay);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// 🌐 Start the server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
