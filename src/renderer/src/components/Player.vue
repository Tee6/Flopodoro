<template>
  <div class="record-container">
    <div class="record" :style="{ backgroundImage: `url(${albumCover})`, animationPlayState: MainStore.spinning ? 'running' : 'paused' }">
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
import { ref, onMounted, onBeforeUnmount } from 'vue';

const MainStore = useMainStore();
const props = defineProps<{
  albumCover: string
  textColor: string
}>()
</script>

<style scoped>
.track-info{
  margin-left: 20px;
}
.track-artist{
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
  animation: spin 3s linear infinite;
  animation-play-state: running;
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

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>