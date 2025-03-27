const socket = new WebSocket("ws://localhost:3001");

socket.onopen = () => {
    console.log("Connected to WebSocket server.");
};

socket.onmessage = (event) => {
    console.log("Received message from WebSocket:", event.data);  // Debugging line
    try {
        const data = JSON.parse(event.data);
        console.log("Parsed data:", data);  // Debugging line

        // Update the UI with the latest data
        document.getElementById("battery-voltage").textContent = data.voltage.toFixed(2);
        document.getElementById("battery-current").textContent = data.current.toFixed(2);
        document.getElementById("temperature").textContent = data.temperature.toFixed(2);

        document.getElementById("cell-voltage-1").textContent = data.cell_voltage_1.toFixed(2);
        document.getElementById("cell-voltage-2").textContent = data.cell_voltage_2.toFixed(2);
        document.getElementById("cell-voltage-3").textContent = data.cell_voltage_3.toFixed(2);
        document.getElementById("cell-voltage-4").textContent = data.cell_voltage_4.toFixed(2);
        document.getElementById("cell-voltage-5").textContent = data.cell_voltage_5.toFixed(2);
        document.getElementById("cell-voltage-6").textContent = data.cell_voltage_6.toFixed(2);
        document.getElementById("cell-voltage-7").textContent = data.cell_voltage_7.toFixed(2);
        document.getElementById("cell-voltage-8").textContent = data.cell_voltage_8.toFixed(2);
    } catch (error) {
        console.error("Error parsing WebSocket data:", error);
    }
};

socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};

socket.onclose = () => {
    console.log("WebSocket connection closed.");
};