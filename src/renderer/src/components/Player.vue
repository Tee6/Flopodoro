<template>
  <div class="record-container">
    <div 
      class="record" 
      :style="{
        backgroundImage: `url(${albumCover})`,
        transform: `rotate(${rotation}deg)`,
        transition: transitionStyle
      }"
    >
      <div class="label"></div>
    </div>
    <div class="track-info" :style="{ color: props.textColor }">
      <h1 class="track-name" :style="{ color: props.textColor }">{{ MainStore.TrackName }}</h1>
      <h3 class="track-artist" :style="{ color: props.textColor }">{{ MainStore.ArtistName }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/mainStore';
import { ref, watch } from 'vue';

const MainStore = useMainStore();
const props = defineProps<{
  albumCover: string;
  textColor: string;
}>();

const rotation = ref(0);
const transitionStyle = ref('none');
let animationFrame: number | null = null;

// Funktion zum Starten der Drehung
const startSpinning = () => {
  transitionStyle.value = 'none'; // Keine Transition während des Drehens
  const updateRotation = () => {
    rotation.value = (rotation.value + 2) % 360; // Dreht sich kontinuierlich weiter
    if (MainStore.spinning) {
      animationFrame = requestAnimationFrame(updateRotation);
    }
  };
  updateRotation();
};

// Funktion für sanftes Zurückdrehen auf 0° mit vollständiger Drehung
const stopSpinning = () => {
  if (animationFrame) cancelAnimationFrame(animationFrame);

  // Berechne die verbleibende Drehung bis zur nächsten vollen Umdrehung (360°)
  const currentRotation = rotation.value % 360;
  const remainingRotation = 360 - currentRotation;

  transitionStyle.value = `transform ${remainingRotation / 180}s ease-out`; // Geschwindigkeit abhängig von verbleibender Drehung
  rotation.value += remainingRotation; // Dreht weiter bis 360°
};

// Beobachtet Änderungen an spinning
watch(() => MainStore.spinning, (newVal) => {
  if (newVal) {
    startSpinning();
  } else {
    stopSpinning();
  }
}, { immediate: true });
</script>

<style scoped>
.track-info {
  margin-left: 20px;
}

.track-artist {
  color: rgba(12, 4, 58, 1);
  text-align: left;
  font-family: 'Roboto', sans-serif;
  font-size: 1.5vw;
  font-weight: 400;
}

.track-name {
  color: rgba(12, 4, 58, 1);
  text-align: left;
  font-family: 'Roboto', sans-serif;
  font-size: 2.5vw;
  font-weight: 400;
  line-height: normal;
}

.record-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  margin-top: 40px;
}

.record {
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  background-color: black;
  background-size: cover;
  background-position: center;
  border: 5px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.label {
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
