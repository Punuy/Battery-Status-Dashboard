const express = require("express");
const mqtt = require("mqtt");
const WebSocket = require("ws");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const wss = new WebSocket.Server({ port: 3001 });

const MQTT_BROKER = "mqtt://ไม่บอก";
const client = mqtt.connect(MQTT_BROKER);

let batteryData = {
    voltage: 0,
    cell_voltage: 0,
    current: 0,
    temperature: 0
};

client.on("connect", () => {
    console.log(`Connected to ${MQTT_BROKER}`);

    client.subscribe("battery/voltage");
    client.subscribe("battery/cell_voltage");
    client.subscribe("battery/current");
    client.subscribe("battery/temperature");
});

client.on("message", (topic, message) => {
    const value = parseFloat(message.toString());

    switch (topic) {
        case "battery/voltage":
            batteryData.voltage = value;
            break;
        case "battery/cell_voltage":
            batteryData.cell_voltage = value;
            break;
        case "battery/current":
            batteryData.current = value;
            break;
        case "battery/temperature":
            batteryData.temperature = value;
            break;
    }

    broadcastData();
});

function broadcastData() {
    const data = JSON.stringify(batteryData);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

app.get("/battery", (req, res) => {
    res.json(batteryData);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
