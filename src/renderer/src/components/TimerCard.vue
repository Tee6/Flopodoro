<template>
  <div class="card">
    <div class="relative-wrapper-two">
      <p class="num-00" :style="{ color: props.timerColor }">
        {{ formatNumber(useMainStore().Time[0]) }}
      </p>
      <p class="time-desc" :style="{ color: props.timerTextColor }">Hours</p>
    </div>
    <div class="relative-wrapper-two">
      <p class="num-00" :style="{ color: props.timerColor }">
        {{ formatNumber(useMainStore().Time[1]) }}
      </p>
      <p class="time-desc" :style="{ color: props.timerTextColor }">Minutes</p>
    </div>
    <div class="relative-wrapper-two">
      <p class="num-00" :style="{ color: props.timerColor }">
        {{ formatNumber(useMainStore().Time[2]) }}
      </p>
      <p class="time-desc" :style="{ color: props.timerTextColor }">Seconds</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/mainStore'

function formatNumber(number: number): string {
  return number <= 9 ? '0' + number : number.toString()
}
const props = defineProps<{
  timerColor: string
  timerTextColor: string
}>()
</script>

<style scoped>
.card {
  background: linear-gradient(105deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%);
  border-radius: 3vw;
  padding: 3vw;
  box-shadow: 0 2vw 4vw 0 rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: flex-start;
  backdrop-filter: blur(2.5vw);
  width: 80vw;
  height: auto;
  margin: auto;
  justify-content: space-between;
  box-sizing: border-box;
}

.relative-wrapper-two {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25vw;
}

.num-00 {
  color: rgba(12, 4, 58, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 10vw;
  line-height: normal;
  margin: 0;
}

.time-desc {
  color: rgba(12, 4, 58, 1);
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 2.5vw;
  font-weight: 400;
  line-height: normal;
  margin-top: 0.5vw;
}

@media (max-width: 600px) {
  .card {
    flex-direction: column;
    align-items: center;
    padding: 5vw 3vw;
    width: 90vw;
  }

  .relative-wrapper-two {
    width: 80vw;
    margin-bottom: 5vw;
  }

  .num-00 {
    font-size: 15vw;
  }

  .time-desc {
    font-size: 4vw;
  }
}
</style>
