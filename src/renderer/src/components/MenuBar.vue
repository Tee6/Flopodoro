<template>
  <div id="menu-bar-id" class="menu-bar" :style="{ background: props.bgColor }">
    <div class="left-helper-div"></div>
    <div class="title">flopodoro</div>
    <div class="buttons">
      <button
        class="menu-button"
        :style="{ background: props.bgColor }"
        @click="useMainStore().showSettingsPage = true"
      >
        <img src="../assets/settings.png" style="width: 25px" />
      </button>
      <button
        class="menu-button"
        :style="{ backgroundColor: props.bgColor }"
        @click="minimizeWindow"
      >
        <img src="../assets/minimize-sign.png" style="width: 20px; padding-top: 15px" />
      </button>
      <button
        class="menu-button"
        :style="{ backgroundColor: props.bgColor }"
        @click="maximizeWindow"
      >
        <img src="../assets/expand-window.png" style="width: 20px" />
      </button>
      <button class="menu-button" :style="{ backgroundColor: props.bgColor }" @click="closeWindow">
        <img src="../assets/x.png" style="width: 20px" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/mainStore'

function closeWindow() {
  window.close()
}

function minimizeWindow() {
  window.api.minimizeWindow()
}

function maximizeWindow() {
  window.api.maximizeWindow()
}

const props = defineProps<{
  bgColor: string
}>()
</script>

<style scoped>
.left-helper-div {
  width: 240px;
}

.menu-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  /* Feste Höhe hinzugefügt */
  background-color: #1d2063;
  color: #fff;
  box-sizing: border-box;
  -webkit-app-region: drag;
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
  -webkit-app-region: no-drag;
  min-width: 240px;
  height: 50px;
}

.menu-button {
  background-color: #1d2063;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 60px;
}

.menu-button img {
  display: block;
  margin: auto;
}

.menu-button:hover {
  background-color: #ff6666 !important;
}

.menu-button:focus {
  outline: none !important;
}
</style>
