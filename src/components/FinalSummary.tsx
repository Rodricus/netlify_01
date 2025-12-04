interface FinalSummaryProps {
    promptEditorVisible: boolean
    scrollToPromptEditor: () => void
}

export default function FinalSummary({ promptEditorVisible, scrollToPromptEditor }: FinalSummaryProps) {
    return (
        <div className="mt-12 p-8 bg-[#252526] border border-[#ffd700] rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-[#ffd700]">The Illusion Revealed</h3>
            <p className="text-lg text-[#d4d4d4] leading-relaxed mb-4">
                What looks like "reasoning" is actually a sophisticated pipeline of:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#d4d4d4] mb-6">
                <li><strong>5 System Layers</strong>: Input processing, retrieval, context injection, orchestration</li>
                <li><strong>5 LLM Internals</strong>: Tokenization, embeddings, attention, prediction, formatting</li>
                <li>NO memory, NO reasoning, NO goals—just statistical pattern matching</li>
            </ul>

            {!promptEditorVisible && (
                <div className="mt-8 p-6 bg-[#4ec9b0]/10 border-2 border-[#4ec9b0] rounded-lg">
                    <h4 className="text-xl font-bold text-[#4ec9b0] mb-3">🚀 Ready to Test Your Own Query?</h4>
                    <p className="text-[#d4d4d4] mb-4">
                        See how YOUR question flows through these same 10 layers
                    </p>
                    <button
                        onClick={scrollToPromptEditor}
                        className="px-6 py-3 bg-[#4ec9b0] hover:bg-[#5fd6bd] text-[#1e1e1e] font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        <span>Try Your Own Query</span>
                        <span className="text-xl">→</span>
                    </button>
                </div>
            )}

            <p className="text-[#858585] mt-6">
                Want to understand the technical details behind this illusion?{' '}
                <a
                    href="https://www.linkedin.com/pulse/why-how-current-llm-systems-create-illusion-reasoning-rodrigo-bphwe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4ec9b0] hover:text-[#5fd6bd] underline"
                >
                    Read the full article
                </a>
            </p>
        </div>
    )
}
