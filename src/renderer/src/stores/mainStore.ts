import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
  state: () => ({
    Time: [0, 0, 0],
    Flopodoro: null,
    Pomodoro: null
  }),
  actions: {
    startFlomodoro() {
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
    startPomodoro() {
      this.Time = [1, 1, 1] // Setze die Startzeit auf 2 Stunden, 3 Minuten, 12 Sekunden
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
              alert("Time's up!")
            }
          }
        }
      }, 1000)
    },

    ResetTimer() {
      clearInterval(this.Flopodoro)
      clearInterval(this.Pomodoro)
      this.Time = [0, 0, 0]
    }
  }
})
