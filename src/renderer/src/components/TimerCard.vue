<template>
  <div class="card">
    <div class="relative-wrapper-two">
      <p v-if="useMainStore().Time[0] > 9" class="num-00">{{ useMainStore().Time[0] }}</p>
      <p v-if="useMainStore().Time[0] <= 9" class="num-00">0{{ useMainStore().Time[0] }}</p>
      <p class="hours">hours</p>
    </div>
    <div class="relative-wrapper-two">
      <p v-if="useMainStore().Time[1] > 9" class="num-00">{{ useMainStore().Time[1] }}</p>
      <p v-if="useMainStore().Time[1] <= 9" class="num-00">0{{ useMainStore().Time[1] }}</p>
      <p class="minutes">Minutes</p>
    </div>
    <div class="relative-wrapper-two">
      <p v-if="useMainStore().Time[2] > 9" class="num-00">{{ useMainStore().Time[2] }}</p>
      <p v-if="useMainStore().Time[2] <= 9" class="num-00">0{{ useMainStore().Time[2] }}</p>
      <p class="seconds">Seconds</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/mainStore'
</script>

<style scoped>
.card {
  background: linear-gradient(105deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%);
  border-radius: 40px;
  padding: 60px 78px 43px;
  box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: flex-start;
  backdrop-filter: blur(25px);
  min-width: 845px;
  min-height: 300px;
}

.relative-wrapper-two {
  display: flex;
  justify-content: center;
  width: 28.57%;
  align-self: stretch;
  position: relative;
}

.relative-wrapper-two:not(:last-of-type) {
  margin-right: 56px;
}

.num-00 {
  height: 100%;
  width: 100%;
  color: rgba(12, 4, 58, 1);
  display: flex;
  text-align: center;
  position: relative;
  font-family: 'Roboto', sans-serif;
  font-size: 170px;
  font-weight: 400;
  line-height: normal;
}

.hours {
  width: 30.63%;
  height: 17.9%;
  color: rgba(12, 4, 58, 1);
  text-align: center;
  position: absolute;
  top: -17px;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: normal;
}

.relative-wrapper-one {
  width: 28.57%;
  margin-right: 44px;
  align-self: stretch;
  position: relative;
}

.line-1 {
  width: 68.02%;
  position: absolute;
  left: -45px;
  top: 6px;
}

.minutes {
  width: 40.99%;
  height: 17.9%;
  color: rgba(12, 4, 58, 1);
  text-align: center;
  position: absolute;
  top: -17px;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: normal;
}

.line-2 {
  width: 0.13%;
  height: 93.21%;
  background-color: rgba(0, 0, 0, 1);
  margin-top: 6px;
  margin-right: 10px;
}

.seconds {
  width: 44.59%;
  height: 17.9%;
  color: rgba(12, 4, 58, 1);
  text-align: center;
  position: absolute;
  top: -14px;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: normal;
}
</style>
