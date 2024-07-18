<template>
  <div v-if="props.showPopup" class="popup">
    <div class="content">
      <div v-if="props.status === 'notAllowed'" class="message not-allowed">
        <h2>Nicht 2 Vorgänge gleichzeitig!</h2>
        <p>Bitte warten Sie, bis der aktuelle Vorgang abgeschlossen ist.</p>
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
    validator: (value) => ['notAllowed', 'takeBreak'].includes(value)
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
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 90%;
  max-width: 600px;
  text-align: center;
  font-size: 1.5em;
  border: 1px solid #e0e0e0;
}

.content {
  margin-bottom: 30px;
}

.message {
  padding: 30px;
  border-radius: 12px;
}

.not-allowed {
  background-color: #ffebee;
  color: #c62828;
}

.take-break {
  background-color: #e3f2fd;
  color: #1565c0;
}

h2 {
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
}

p {
  font-size: 24px;
  line-height: 1.8;
  margin: 0;
  color: #555;
}

button {
  font-size: 1em;
  padding: 15px 30px;
  margin: 10px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.confirm-button {
  background-color: #4caf50;
  color: white;
}

.cancel-button {
  background-color: #f44336;
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
  font-size: 24px;
  padding: 15px 30px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid #2196f3;
}

.close-button:hover {
  background-color: #e3f2fd;
}

@media (max-width: 480px) {
  .popup {
    width: 95%;
    max-width: 350px;
    font-size: 1.2em;
  }

  h2 {
    font-size: 28px;
  }

  p {
    font-size: 20px;
  }

  button {
    font-size: 0.9em;
    padding: 10px 20px;
  }

  .close-button {
    font-size: 20px;
    padding: 10px 20px;
  }
}
</style>
