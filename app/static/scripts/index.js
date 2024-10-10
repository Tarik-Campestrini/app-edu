function updateClocks() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Relógio Digital
  document.getElementById('clock-digital').textContent = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Relógio Binário
  const binaryHours = hours.toString(2).padStart(4, '0');
  const binaryMinutes = minutes.toString(2).padStart(6, '0');
  const binarySeconds = seconds.toString(2).padStart(6, '0');
  document.getElementById('clock-binario').textContent = 
      `${binaryHours} : ${binaryMinutes} : ${binarySeconds}`;
}

setInterval(updateClocks, 1000);
updateClocks();