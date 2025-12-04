import { useState } from 'react'
import { Edit3, Sparkles } from 'lucide-react'
import { useAppStore } from '../store/appStore'

export default function PromptEditor() {
    const { userInput, setUserInput, showCustomPrompt, setShowCustomPrompt, resetLayers } = useAppStore()
    const [localInput, setLocalInput] = useState(userInput)
    const [isEditing, setIsEditing] = useState(false)

    const handleApply = () => {
        setUserInput(localInput)
        setShowCustomPrompt(true)
        setIsEditing(false)
    }

    const handleReset = () => {
        const defaultPrompt = "Plan a 3-day trip to Tokyo"
        setLocalInput(defaultPrompt)
        setUserInput(defaultPrompt)
        setShowCustomPrompt(false)
        setIsEditing(false)
        resetLayers()
    }

    return (
        <div className="mb-8 p-6 bg-[#252526] border border-[#4ec9b0] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
                <Edit3 className="w-5 h-5 text-[#4ec9b0]" />
                <h3 className="text-lg font-semibold text-[#d4d4d4]">Try Your Own Query</h3>
            </div>

            <p className="text-sm text-[#858585] mb-4">
                Type your own question to see how it flows through all 10 layers
            </p>

            <div className="space-y-3">
                <textarea
                    value={localInput}
                    onChange={(e) => {
                        setLocalInput(e.target.value)
                        setIsEditing(true)
                    }}
                    placeholder="Enter your query..."
                    className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#3e3e42] rounded text-[#d4d4d4] font-mono text-sm resize-none focus:outline-none focus:border-[#4ec9b0] transition-colors"
                    rows={3}
                />

                <div className="flex gap-2">
                    <button
                        onClick={handleApply}
                        disabled={!isEditing || !localInput.trim()}
                        className="flex items-center gap-2 px-4 py-2 bg-[#4ec9b0] hover:bg-[#5fd6bd] disabled:bg-[#3e3e42] disabled:text-[#858585] text-[#1e1e1e] font-semibold rounded transition-colors"
                    >
                        <Sparkles className="w-4 h-4" />
                        Process Through Layers
                    </button>

                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-[#3e3e42] hover:bg-[#4e4e52] text-[#d4d4d4] rounded transition-colors"
                    >
                        Reset to Default
                    </button>
                </div>

                {showCustomPrompt && (
                    <div className="p-3 bg-[#4ec9b0]/10 border border-[#4ec9b0] rounded">
                        <p className="text-sm text-[#4ec9b0]">
                            ✓ Custom query active: "{userInput.substring(0, 50)}{userInput.length > 50 ? '...' : ''}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
