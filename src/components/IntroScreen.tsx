import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface IntroScreenProps {
    onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1e1e1e] flex items-center justify-center p-4"
        >
            <div className="max-w-3xl w-full space-y-12">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-[#d4d4d4] tracking-tight">
                        How LLM Systems Create Reasoning
                    </h1>

                    <p className="text-xl text-[#858585] max-w-2xl mx-auto leading-relaxed">
                        An interactive breakdown of the architecture behind ChatGPT, Claude, and other LLM systems.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
                >
                    <div className="bg-[#252526] border border-[#3e3e42] rounded p-6">
                        <div className="text-2xl font-bold text-[#4ec9b0] mb-2">1</div>
                        <h3 className="font-semibold text-[#d4d4d4] mb-2">Experience</h3>
                        <p className="text-sm text-[#858585]">See a ChatGPT-style response that looks intelligent</p>
                    </div>

                    <div className="bg-[#252526] border border-[#3e3e42] rounded p-6">
                        <div className="text-2xl font-bold text-[#4ec9b0] mb-2">2</div>
                        <h3 className="font-semibold text-[#d4d4d4] mb-2">Deconstruct</h3>
                        <p className="text-sm text-[#858585]">Reveal the 10 layers that create the illusion</p>
                    </div>

                    <div className="bg-[#252526] border border-[#3e3e42] rounded p-6">
                        <div className="text-2xl font-bold text-[#4ec9b0] mb-2">3</div>
                        <h3 className="font-semibold text-[#d4d4d4] mb-2">Explore</h3>
                        <p className="text-sm text-[#858585]">View code and data for each architectural layer</p>
                    </div>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onStart}
                    className="w-full bg-[#4ec9b0] hover:bg-[#5fd6bd] text-[#1e1e1e] font-semibold py-4 rounded flex items-center justify-center gap-2 transition-colors"
                >
                    Start Exploration
                    <ArrowRight className="w-5 h-5" />
                </motion.button>

                <div className="text-center space-y-2">
                    <p className="text-xs text-[#858585]">
                        Interactive companion to the article:
                    </p>
                    <a
                        href="https://www.linkedin.com/pulse/why-how-current-llm-systems-create-illusion-reasoning-rodrigo-bphwe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#4ec9b0] hover:text-[#5fd6bd] transition-colors underline block"
                    >
                        "Why and How Current LLM Systems Create the Illusion of Reasoning"
                    </a>
                </div>
            </div>
        </motion.div>
    )
}
