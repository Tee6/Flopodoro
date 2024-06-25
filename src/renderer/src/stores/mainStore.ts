import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
  state: () => ({
    title: 'Flopodoro Timer',
    Time: [0, 0, 0],
    Flopodoro: null,
    Pomodoro: null,
    PauseTimer: null,
    isFlopodoroActive: false,
    isPomodoroActive: false,
    pauseDivider: 2,
    pause: false
  }),
  actions: {
    ToggleFlomodoro() {
      this.title = 'Flopodoro Timer'
      if (this.isPomodoroActive) {
        alert("You can't start Flopodoro while a Pomodoro is active!")
        return
      }

      if (this.isFlopodoroActive) {
        clearInterval(this.Flopodoro)
        this.isFlopodoroActive = false
        this.FlopodoroPause()
        return
      } else {
        this.isFlopodoroActive = true
      }
      this.Flopodoro = setInterval(() => {
        this.Time[2]++
        if (this.Time[2] === 60) {
          this.Time[2] = 0
          this.Time[1]++
        }
        if (this.Time[1] === 60) {
          this.Time[1] = 0
          this.Time[0]++
        }
      }, 1000)
    },
    TogglePomodoro() {
      this.title = 'Pomodoro Timer'
      if (this.isFlopodoroActive) {
        alert("You can't start Pomodoro while a Flopodoro is active!")
        if (this.Time[0] !== 0 || this.Time[1] !== 0 || this.Time[2] !== 0) {
          const result = confirm('Would you like to convert your Flopodoro time to Pomodoro time?')
          if (result == true) {
            this.Time = [this.Time[0], this.Time[1], this.Time[2]]
            this.ToggleFlomodoro()
          } else {
            this.Time = [0, 0, 0]
          }
        }
      }
      if (this.isPomodoroActive) {
        clearInterval(this.Pomodoro)
        this.isPomodoroActive = false
        return
      } else {
        this.isPomodoroActive = true
      }
      if (this.Time[0] === 0 && this.Time[1] === 0 && this.Time[2] === 0) {
        this.Time = [0, 2, 0]
      }
      this.Pomodoro = setInterval(() => {
        if (this.Time[2] > 0) {
          this.Time[2]--
        } else {
          if (this.Time[1] > 0) {
            this.Time[2] = 59
            this.Time[1]--
          } else {
            if (this.Time[0] > 0) {
              this.Time[2] = 59
              this.Time[1] = 59
              this.Time[0]--
            } else {
              clearInterval(this.Pomodoro)
              this.disableTimers()
              alert("Time's up! Take a 5 minute break!")
              this.PomodoroPause()
            }
          }
        }
      }, 1000)
    },

    ResetTimer() {
      this.disableTimers()
      clearInterval(this.Flopodoro)
      clearInterval(this.Pomodoro)
      clearInterval(this.PauseTimer)
      this.Time = [0, 0, 0]
    },
    disableTimers() {
      this.isPomodoroActive = false
      this.isFlopodoroActive = false
      this.pause = false
    },
    PomodoroPause() {
      this.pause = true
      this.Time = [0, 5, 0]

      this.PauseTimer = setInterval(() => {
        if (this.Time[2] > 0) {
          this.Time[2]--
        } else {
          if (this.Time[1] > 0) {
            this.Time[2] = 59
            this.Time[1]--
          } else {
            if (this.Time[0] > 0) {
              this.Time[2] = 59
              this.Time[1] = 59
              this.Time[0]--
            } else {
              clearInterval(this.PauseTimer)
              this.disableTimers()
              alert("Time's up! Continue Working!")
            }
          }
        }
      }, 1000)
    },
    FlopodoroPause() {
      this.title = 'Pause'
      const timePassed = this.Time[0] * 3600 + this.Time[1] * 60 + this.Time[2]
      const pauseTime = Math.floor(timePassed / this.pauseDivider)
      this.Time = [
        Math.floor(pauseTime / 3600),
        Math.floor((pauseTime % 3600) / 60),
        pauseTime % 60
      ]
      const timeUnits = ['hour', 'minute', 'second']
      const timeValues = this.Time

      const timeStrings = timeValues
        .map((value, index) => {
          return value > 0 ? `${value} ${timeUnits[index]}` : ''
        })
        .filter(Boolean)

      const timeMessage = timeStrings.join(' and ')

      const checkPause = confirm(`Would you like to start your ${timeMessage} break?`)

      if (!checkPause) {
        this.Time = [0, 0, 0]
        return
      }

      this.pause = true
      this.PauseTimer = setInterval(() => {
        if (this.Time[2] > 0) {
          this.Time[2]--
        } else {
          if (this.Time[1] > 0) {
            this.Time[2] = 59
            this.Time[1]--
          } else {
            if (this.Time[0] > 0) {
              this.Time[2] = 59
              this.Time[1] = 59
              this.Time[0]--
            } else {
              clearInterval(this.PauseTimer)
              this.disableTimers()
              alert("Time's up! Continue Working!")
            }
          }
        }
      }, 1000)
    }
  }
})
