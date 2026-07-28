import { create } from 'zustand'

const useCounters = create(set => ({
  counterGood: 0,
  counterNeutral: 0,
  counterBad: 0,

  actions: {
    incrCounterGood: () => set(state => ({ counterGood: state.counterGood + 1})),
    incrCounterNeutral: () => set(state => ({ counterNeutral: state.counterNeutral + 1})),
    incrCounterBad: () => set(state => ({ counterBad: state.counterBad + 1 }))
  }
}))

export const useCounterGood = () => useCounters( state => state.counterGood )
export const useCounterNeutral = () => useCounters( state => state.counterNeutral)
export const useCounterBad = () => useCounters( state => state.counterBad)

export const useCounterControls = () => useCounters(state => state.actions)