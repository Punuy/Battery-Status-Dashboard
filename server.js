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

const MQTT_BROKER = "mqtt://--";
const client = mqtt.connect(MQTT_BROKER);

let batteryData = {
    voltage: 0,
    current: 0,
    temperature: 0,

    cell_voltage_1: 0,
    cell_voltage_2: 0,
    cell_voltage_3: 0,
    cell_voltage_4: 0,
    cell_voltage_5: 0,
    cell_voltage_6: 0,
    cell_voltage_7: 0,
    cell_voltage_8: 0

};

client.on("connect", () => {
    console.log(`Connected to ${MQTT_BROKER}`);

    client.subscribe("battery/voltage");
    client.subscribe("battery/current");
    client.subscribe("battery/temperature");

    client.subscribe("battery/cell_voltage_1");
    client.subscribe("battery/cell_voltage_2");
    client.subscribe("battery/cell_voltage_3");
    client.subscribe("battery/cell_voltage_4");
    client.subscribe("battery/cell_voltage_5");
    client.subscribe("battery/cell_voltage_6");
    client.subscribe("battery/cell_voltage_7");
    client.subscribe("battery/cell_voltage_8");
});

client.on("message", (topic, message) => {
    const value = parseFloat(message.toString());

    switch (topic) {
        case "battery/voltage":
            batteryData.voltage = value;
            break;
        case "battery/current":
            batteryData.current = value;
            break;
        case "battery/temperature":
            batteryData.temperature = value;
            break;

        case "battery/cell_voltage_1":
            batteryData.cell_voltage_1 = value;
            break;
        case "battery/cell_voltage_2":
            batteryData.cell_voltage_2 = value;
            break;
        case "battery/cell_voltage_3":
            batteryData.cell_voltage_3 = value;
            break;
        case "battery/cell_voltage_4":
            batteryData.cell_voltage_4 = value;
            break;
        case "battery/cell_voltage_5":
            batteryData.cell_voltage_5 = value;
            break;
        case "battery/cell_voltage_6":
            batteryData.cell_voltage_6 = value;
            break;
        case "battery/cell_voltage_7":
            batteryData.cell_voltage_7 = value;
            break;
        case "battery/cell_voltage_8":
            batteryData.cell_voltage_8 = value;
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
