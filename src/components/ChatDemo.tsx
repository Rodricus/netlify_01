import { motion } from 'framer-motion'
import { Send, User, Bot } from 'lucide-react'
import { useState } from 'react'

interface ChatDemoProps {
    onReveal: () => void
}

export default function ChatDemo({ onReveal }: ChatDemoProps) {
    const [showResponse, setShowResponse] = useState(false)

    const finalResponse = `**Day 1: Traditional Tokyo**
- Morning: Tsukiji Market for fresh sushi breakfast
- Midday: Tokyo National Museum in Ueno Park
- Afternoon: Asakusa and Sensoji Temple

**Day 2: Modern Tokyo**
- Morning: Shibuya and Harajuku
- Midday: Meiji Shrine
- Afternoon: teamLab Borderless Digital Art Museum

**Day 3: Cultural Deep Dive**
- Morning: Imperial Palace Gardens
- Afternoon: Akihabara electronics and anime district
- Evening: Dinner in Shinjuku's Omoide Yokocho alley`

    const handleSend = () => {
        setShowResponse(true)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-bold text-[#d4d4d4]">Step 1: Experience the Illusion</h2>
                <p className="text-[#858585]">Watch a seemingly intelligent AI response</p>
            </div>

            <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 space-y-4">
                {/* User Message */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#4ec9b0] flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-[#1e1e1e]" />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold text-[#d4d4d4] mb-1">You</div>
                        <div className="text-[#d4d4d4]">Plan a 3-day trip to Tokyo</div>
                    </div>
                </div>

                {/* AI Response */}
                {showResponse && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#858585] flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 text-[#1e1e1e]" />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-semibold text-[#d4d4d4] mb-1">AI Assistant</div>
                            <div className="text-[#d4d4d4] whitespace-pre-line">{finalResponse}</div>
                        </div>
                    </motion.div>
                )}

                {/* Send Button */}
                {!showResponse && (
                    <div className="flex justify-end">
                        <button
                            onClick={handleSend}
                            className="flex items-center gap-2 px-4 py-2 bg-[#4ec9b0] hover:bg-[#5fd6bd] text-[#1e1e1e] font-semibold rounded transition-colors"
                        >
                            <Send className="w-4 h-4" />
                            Send
                        </button>
                    </div>
                )}
            </div>

            {/* Reveal Button */}
            {showResponse && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center"
                >
                    <button
                        onClick={onReveal}
                        className="px-8 py-4 bg-[#ffd700] hover:bg-[#ffed4e] text-[#1e1e1e] font-bold rounded-lg transition-colors text-lg"
                    >
                        ◀ Reveal Architecture
                    </button>
                </motion.div>
            )}
        </div>
    )
}
