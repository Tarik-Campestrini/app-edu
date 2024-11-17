function updateClock() {
  const clockDiv = document.getElementById('clock');
  const now = new Date();
  const timeString = now.toLocaleTimeString('pt-BR', { hour12: false });
  clockDiv.textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

