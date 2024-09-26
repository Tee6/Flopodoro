<template>
  <div v-if="props.showPopup" class="popup">
    <div class="content">
      <div v-if="props.status === 'notAllowed'" class="message not-allowed">
        <h2>Running Process!</h2>
        <p>Please stop the running Timer before starting another one</p>
      </div>
      <div v-else-if="props.status === 'takeBreak'" class="message take-break">
        <h2>Take a Break!</h2>
        <p>{{ MainStore.PauseSentence }}</p>
        <div>
          <button class="confirm-button" @click="MainStore.ifpausetrue">Take the Break</button>
          <button class="cancel-button" @click="MainStore.ifpausefalse">Cancel</button>
        </div>
      </div>
      <div v-else-if="props.status === 'takeBreak-p'" class="message take-break">
        <h2>Take a Break!</h2>
        <p>{{ MainStore.PauseSentence }}</p>
        <div>
          <button class="confirm-button" @click="MainStore.PomodoroPause">Take the Break</button>
          <button class="cancel-button" @click="MainStore.ifpausefalse">Cancel</button>
        </div>
      </div>
      <div v-if="props.status === 'reset'" class="message take-break">
        <h2>Reset!</h2>
        <p>Are you sure you want to reset the timer?</p>
        <div>
          <button class="confirm-button" @click="MainStore.resetHelper">Reset</button>
          <button class="cancel-button" @click="MainStore.ifpausefalse">Cancel</button>
        </div>
      </div>
      <div v-if="props.status === 'timesup'">
        <h2>Times Up!</h2>
      </div>
    </div>
    <button
      v-if="props.status != 'takeBreak' && props.status != 'takeBreak-p' && props.status != 'reset'"
      class="close-button"
      @click="closePopup"
    >
      Close
    </button>
  </div>
</template>

<script setup>
import { useMainStore } from '../stores/mainStore'
const MainStore = useMainStore()
const props = defineProps({
  showPopup: Boolean,
  status: {
    type: String,
    required: true,
    validator: (value) => ['notAllowed', 'takeBreak', 'reset', 'timesup'].includes(value)
  }
})
const emit = defineEmits(['close'])

const closePopup = () => {
  emit('close')
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 5vh;
  border-radius: 1.5vw;
  box-shadow: 0 1.5vh 2.5vh rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 90vw;
  max-width: 80vw;
  text-align: center;
  font-size: 1.5em;
  border: 0.2vw solid #e0e0e0;
}

.content {
  margin-bottom: 1vh;
}

.message {
  padding: 4vh;
  border-radius: 1.5vw;
}

h2 {
  font-size: 4vh;
  margin-bottom: 2.5vh;
  color: #333;
}

p {
  font-size: 3vh;
  line-height: 1.8;
  margin: 0;
  color: #555;
}

button {
  font-size: 2vh;
  padding: 2vh 3vw;
  margin: 1.5vh;
  border-radius: 1vw;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.confirm-button {
  background-color: #76c878;
  color: white;
}

.cancel-button {
  background-color: #f45f55;
  color: white;
}

.confirm-button:hover {
  background-color: #45a049;
}

.cancel-button:hover {
  background-color: #e53935;
}

.close-button {
  background-color: transparent;
  color: #2196f3;
  font-size: 3vh;
  padding: 2vh 3vw;
  border-radius: 1vw;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 0.2vw solid #2196f3;
}

.close-button:hover {
  background-color: #e3f2fd;
}

@media (max-width: 480px) {
  .popup {
    width: 95vw;
    max-width: 70vw;
    font-size: 1.2em;
  }

  h2 {
    font-size: 3.5vh;
  }

  p {
    font-size: 2.5vh;
  }

  button {
    font-size: 2vh;
    padding: 1.5vh 2.5vw;
  }

  .close-button {
    font-size: 2.5vh;
    padding: 1.5vh 2.5vw;
  }
}
</style>
