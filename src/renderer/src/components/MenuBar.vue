<template>
  <div class="menu-bar">
    <div class="left-helper-div"></div>
    <div class="title">flopodoro</div>
    <div class="buttons">
      <button class="menu-button" @click="minimizeWindow">
        <img src="../assets/minimize-sign.png" style="width: 20px; padding-top: 15px" />
      </button>
      <button class="menu-button" @click="maximizeWindow">
        <img src="../assets/expand-window.png" style="width: 20px" />
      </button>
      <button class="menu-button" @click="closeWindow">
        <img src="../assets/x.png" style="width: 20px" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
function closeWindow() {
  window.close()
}

function minimizeWindow() {
  window.api.minimizeWindow()
}

function maximizeWindow() {
  window.api.maximizeWindow()
}
</script>

<style scoped>
.left-helper-div {
  width: 180px;
}

.menu-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Menüleiste nimmt die gesamte Breite ein */
  background-color: #1d2063; /* Hintergrundfarbe */
  color: #fff;
  box-sizing: border-box; /* Um Padding in der Breite zu berücksichtigen */
  -webkit-app-region: drag; /* Drag-Region für das Verschieben des Fensters */
  position: absolute;
  top: 0;
  left: 0;
}

.title {
  flex-grow: 1;
  text-align: center;
  font-size: 24px;
  letter-spacing: 3px;
}

.buttons {
  display: flex;
  -webkit-app-region: no-drag; /* Keine Drag-Region für die Buttons */
  min-width: 180px;
}

.menu-button {
  background-color: #1d2063; /* Gleiche Hintergrundfarbe wie die Menüleiste */
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 60px;
}

.menu-button:hover {
  background-color: #ff6666;
}

.menu-button:focus {
  outline: none;
}
</style>
