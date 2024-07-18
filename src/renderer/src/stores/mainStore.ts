import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
  state: () => ({
    title: 'Flopodoro',

    // Default Settings
    Time: [0, 0, 0],
    PomodoroTime: [0, 25, 0],
    PomodoroPauseTime: [0, 5, 0],

    Flopodoro: null,
    Pomodoro: null,
    PauseTimer: null,
    isFlopodoroActive: false,
    isPomodoroActive: false,
    pauseDivider: 2,
    pause: false,
    showSettingsPage: false,
    selectedTheme: 0,
    showPopup: false,
    popupStatus: 'notAllowed',
    PauseSentence: '',
    pauseTimeArray: [0, 0, 0]
  }),
  actions: {
    getState() {
      if (localStorage.getItem('pomodoroSettings')) {
        const settings = JSON.parse(localStorage.getItem('pomodoroSettings'))
        this.PomodoroTime = [0, settings.PomodoroWorkTime, 0]
        this.PomodoroPauseTime = [0, settings.PomodoroPauseTime, 0]
      }
    },
    ToggleFlomodoro() {
      this.title = 'Flopodoro Study Time!'
      if (this.isPomodoroActive) {
        this.showPopup = true
        this.popupStatus = 'notAllowed'
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
      this.title = 'Pomodoro Study Time!'
      if (this.isFlopodoroActive || this.pause) {
        this.showPopup = true
        this.popupStatus = 'notAllowed'
        return
      }
      if (this.isPomodoroActive) {
        clearInterval(this.Pomodoro)
        this.isPomodoroActive = false
        return
      } else {
        this.isPomodoroActive = true
      }
      if (this.Time[0] === 0 && this.Time[1] === 0 && this.Time[2] === 0) {
        this.Time = this.PomodoroTime
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
              this.popupStatus = 'takeBreak-p'
              this.PauseSentence = `Would you like to start your ${this.PomodoroPauseTime[1]} Minute break?`
              this.showPopup = true
            }
          }
        }
      }, 1)
    },
    resetHelper() {
      this.title = 'Flopodoro'
      this.disableTimers()
      clearInterval(this.Flopodoro)
      clearInterval(this.Pomodoro)
      clearInterval(this.PauseTimer)
      this.Time = [0, 0, 0]
      this.showPopup = false
    },
    disableTimers() {
      this.isPomodoroActive = false
      this.isFlopodoroActive = false
      this.pause = false
    },
    PomodoroPause() {
      this.showPopup = false
      this.pause = true
      this.Time = this.PomodoroPauseTime

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
              this.showTimesUpPopup()
            }
          }
        }
      }, 1000)
    },
    ResetTimer() {
      this.popupStatus = 'reset'
      this.showPopup = true
    },
    FlopodoroPause() {
      this.title = 'Pause'
      this.popupStatus = 'takeBreak'
      const TimerObject = this.getTimerMessage(this.Time)
      const timeMessage = TimerObject.message
      this.pauseTimeArray = TimerObject.timeArray
      this.PauseSentence = `Would you like to start your ${timeMessage} break?`
      this.showPopup = true
    },
    ifpausefalse() {
      this.Time = [0, 0, 0]
      this.disableTimers()
      this.showPopup = false
      return
    },
    ifpausetrue() {
      this.Time = this.pauseTimeArray
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
              this.showTimesUpPopup()
            }
          }
        }
      }, 1000)
      this.showPopup = false
    },
    getTimerMessage(timeArray) {
      const timePassed = timeArray[0] * 3600 + timeArray[1] * 60 + timeArray[2]
      const pauseTime = Math.floor(timePassed / this.pauseDivider)
      const newTimeArray = [
        Math.floor(pauseTime / 3600),
        Math.floor((pauseTime % 3600) / 60),
        pauseTime % 60
      ]
      const timeUnits = ['hour', 'minute', 'second']

      const timeStrings = newTimeArray
        .map((value, index) => {
          return value > 0 ? `${value} ${timeUnits[index]}` : ''
        })
        .filter(Boolean)

      const message = timeStrings.join(' and ')

      return {
        message,
        timeArray: newTimeArray
      }
    },
    showTimesUpPopup() {
      this.popupStatus = 'timesup'
      this.showPopup = true
    }
  }
})
