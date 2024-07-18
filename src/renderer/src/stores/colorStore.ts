// store/theme.js
import { defineStore } from 'pinia'

export const useColorStore = defineStore('theme', {
  state: () => ({
    selectedTheme: 0,
    themes: [
      {
        name: 'defaultTheme',
        bgColor: '#bbbccf',
        accentColor: '#1d2063',
        textColor: '#FFFFFF',
        timerColor: 'rgba(12, 4, 58, 1)',
        timerTextColor: 'rgba(12, 4, 58, 1)',
        menuColor: '#1d2063'
      },
      {
        name: 'greenTheme',
        bgColor: '#E6F5E6',
        accentColor: '#77DD77',
        textColor: '#000000',
        timerColor: 'rgba(119, 221, 119, 1)',
        timerTextColor: 'rgba(12, 4, 58, 1)',
        menuColor: '#77DD77'
      },
      {
        name: 'pinkTheme',
        bgColor: '#fcf8f3',
        accentColor: '#ffaaa5',
        textColor: '#ffffff',
        timerColor: '#ffaaa5',
        timerTextColor: '#ffaaa5',
        menuColor: '#ffaaa5'
      },
      {
        name: 'purpleTheme',
        bgColor: '#f4ebff',
        accentColor: '#7b2cbf',
        textColor: '#ffffff',
        timerColor: 'rgb(157 78 221 / 60%)',
        timerTextColor: '#9d4edd',
        menuColor: '#3c096c'
      }
    ]
  }),
  actions: {}
})
