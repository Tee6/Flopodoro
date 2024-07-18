<template>
  <button
    class="timer-button"
    :style="{ backgroundColor: props.bgColor }"
    @click="useMainStore().TogglePomodoro()"
  >
    <p
      v-if="!useMainStore().isPomodoroActive"
      class="start-text"
      :style="{ color: props.textColor }"
    >
      Start Pomodoro
    </p>
    <p
      v-if="useMainStore().isPomodoroActive"
      class="start-text"
      :style="{ color: props.textColor }"
    >
      Stop Pomodoro
    </p>
  </button>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/mainStore'

const props = defineProps<{
  bgColor: string
  textColor: string
}>()
</script>
