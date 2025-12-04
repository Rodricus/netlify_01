import { create } from 'zustand'

export type Level = 'amnesia-glitch' | 'hallucination-glitch' | 'blind-walk-glitch' | 'scaffolding-mod'

interface GameState {
    currentLevel: Level
    stability: number // 0-100%
    installedMods: string[]
    setCurrentLevel: (level: Level) => void
    increaseStability: (amount: number) => void
    installMod: (modId: string) => void
    uninstallMod: (modId: string) => void
    resetGame: () => void
}

export const useGameStore = create<GameState>((set) => ({
    currentLevel: 'amnesia-glitch',
    stability: 15, // Starts low, critical
    installedMods: [],
    setCurrentLevel: (level) => set({ currentLevel: level }),
    increaseStability: (amount) => set((state) => ({
        stability: Math.min(100, state.stability + amount)
    })),
    installMod: (modId) => set((state) => {
        if (state.installedMods.includes(modId)) return state
        return {
            installedMods: [...state.installedMods, modId],
            stability: Math.min(100, state.stability + 20)
        }
    }),
    uninstallMod: (modId) => set((state) => {
        if (!state.installedMods.includes(modId)) return state
        return {
            installedMods: state.installedMods.filter(id => id !== modId),
            stability: Math.max(0, state.stability - 20)
        }
    }),
    resetGame: () => set({
        currentLevel: 'amnesia-glitch',
        stability: 15,
        installedMods: []
    })
}))
