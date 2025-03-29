const socket = new WebSocket("ws://localhost:3001");


    socket.onopen = () => {
        console.log("Connected to WebSocket server.");
        document.getElementById("connection-l").classList.remove("bg-red-500");
        document.getElementById("connection-l").classList.add("bg-green-500");
        document.getElementById("connection-status").textContent = "Connected"; 
    };

socket.onmessage = (event) => {
    console.log("Received message from WebSocket:", event.data);  // Debugging line
    try {
        const data = JSON.parse(event.data);
        console.log("Parsed data:", data);  // Dexing line

        // Update the UI with the latest data
        document.getElementById("battery-voltage").textContent = data.voltage.toFixed(2) + " V";
        const currentText = Math.abs(data.current) <= 20 ? "Idle" : (data.current >= 0 ? "Charging" : "Discharge");

        document.getElementById("battery-current").textContent = data.current.toFixed(2) + " mA";
        document.getElementById("battery-current-status").textContent = currentText; 

        document.getElementById("temperature").textContent = data.temperature.toFixed(2) + " °C";
        document.getElementById("capacity").textContent = data.capacity.toFixed(2) + "%";

        const minVoltage = 2.6;
        const maxVoltage = 3.4;

        const updateCellVoltageBar = (cellVoltage, cellId) => {
            const heightPercentage = ((cellVoltage - minVoltage) / (maxVoltage - minVoltage)) * 100;
            document.getElementById(cellId + "-bar").style.height = heightPercentage + "%";
        };

        const updateStatusIndicator = (statusId, value) => {
            const color = value === 0 ? 'bg-green-500' : 'bg-red-500';
            document.getElementById(statusId).className = `w-3 h-3 rounded-full ${color} mr-2`;
        };

        document.getElementById("cell-voltage-1").textContent = data.cell_voltage_1.toFixed(2) + " V";
        updateStatusIndicator("voltage-status", data.s_voltage);

        updateCellVoltageBar(data.cell_voltage_1, "cell-1");

        document.getElementById("cell-voltage-2").textContent = data.cell_voltage_2.toFixed(2) + " V";
        updateStatusIndicator("current-status", data.s_current);

        updateCellVoltageBar(data.cell_voltage_2, "cell-2");

        document.getElementById("cell-voltage-3").textContent = data.cell_voltage_3.toFixed(2) + " V";
        updateStatusIndicator("temp-status", data.s_temperature);

        updateCellVoltageBar(data.cell_voltage_3, "cell-3");

        document.getElementById("cell-voltage-4").textContent = data.cell_voltage_4.toFixed(2) + " V";
        updateStatusIndicator("capacity-status", data.s_capacity);

        updateCellVoltageBar(data.cell_voltage_4, "cell-4");

        document.getElementById("cell-voltage-5").textContent = data.cell_voltage_5.toFixed(2) + " V";
        updateStatusIndicator("balance-status", data.s_cellbalance);

        updateCellVoltageBar(data.cell_voltage_5, "cell-5");

        document.getElementById("cell-voltage-6").textContent = data.cell_voltage_6.toFixed(2) + " V";
        updateCellVoltageBar(data.cell_voltage_6, "cell-6");

        document.getElementById("cell-voltage-7").textContent = data.cell_voltage_7.toFixed(2) + " V";
        updateCellVoltageBar(data.cell_voltage_7, "cell-7");

        document.getElementById("cell-voltage-8").textContent = data.cell_voltage_8.toFixed(2) + " V";
        updateCellVoltageBar(data.cell_voltage_8, "cell-8");

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
