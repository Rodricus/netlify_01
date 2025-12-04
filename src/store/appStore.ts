import { create } from 'zustand'

interface AppState {
    // Current user input
    userInput: string
    setUserInput: (input: string) => void

    // Layer toggles (all on by default)
    enabledLayers: {
        layer1: boolean  // Raw Input
        layer2: boolean  // Tokenization
        layer3: boolean  // Embeddings
        layer4: boolean  // Semantic Search
        layer5: boolean  // Context Injection (MCP)
        layer6: boolean  // Task Decomposition (LangChain)
        layer7: boolean  // Attention
        layer8: boolean  // Next-Token Prediction
        layer9: boolean  // Detokenization
        layer10: boolean // Post-Processing
    }
    toggleLayer: (layer: keyof AppState['enabledLayers']) => void
    resetLayers: () => void

    // Compare mode
    compareMode: boolean
    setCompareMode: (enabled: boolean) => void

    // UI state
    showCustomPrompt: boolean
    setShowCustomPrompt: (show: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
    userInput: "Plan a 3-day trip to Tokyo",
    setUserInput: (input) => set({ userInput: input }),

    enabledLayers: {
        layer1: true,
        layer2: true,
        layer3: true,
        layer4: true,
        layer5: true,
        layer6: true,
        layer7: true,
        layer8: true,
        layer9: true,
        layer10: true
    },

    toggleLayer: (layer) =>
        set((state) => ({
            enabledLayers: {
                ...state.enabledLayers,
                [layer]: !state.enabledLayers[layer]
            }
        })),

    resetLayers: () =>
        set({
            enabledLayers: {
                layer1: true,
                layer2: true,
                layer3: true,
                layer4: true,
                layer5: true,
                layer6: true,
                layer7: true,
                layer8: true,
                layer9: true,
                layer10: true
            }
        }),

    compareMode: false,
    setCompareMode: (enabled) => set({ compareMode: enabled }),

    showCustomPrompt: false,
    setShowCustomPrompt: (show) => set({ showCustomPrompt: show })
}))
