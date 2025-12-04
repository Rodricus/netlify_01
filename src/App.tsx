import { useState, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import IntroScreen from './components/IntroScreen'
import ChatDemo from './components/ChatDemo'
import LayerCard from './components/LayerCard'
import ShareButtons from './components/ShareButtons'
import PromptEditor from './components/PromptEditor'
import FinalSummary from './components/FinalSummary'
import { tokyoTripExample } from './data/exampleData'
import { articleQuotes } from './data/articleQuotes'
import { useAppStore } from './store/appStore'
import { simulatePromptProcessing } from './utils/promptSimulator'

type Screen = 'intro' | 'demo' | 'layers'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro')
  const [promptEditorVisible, setPromptEditorVisible] = useState(false)
  const promptEditorRef = useRef<HTMLDivElement>(null)
  const { enabledLayers, userInput, showCustomPrompt } = useAppStore()

  // Use custom prompt simulation or default example data
  const layerData = useMemo(() => {
    if (showCustomPrompt && userInput !== "Plan a 3-day trip to Tokyo") {
      return simulatePromptProcessing(userInput)
    }
    return tokyoTripExample
  }, [userInput, showCustomPrompt])

  const scrollToPromptEditor = () => {
    setPromptEditorVisible(true)
    setTimeout(() => {
      promptEditorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Focus textarea after scroll completes
      setTimeout(() => {
        const textarea = promptEditorRef.current?.querySelector('textarea')
        textarea?.focus()
      }, 500)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4]">
      <AnimatePresence mode="wait">
        {currentScreen === 'intro' && (
          <IntroScreen key="intro" onStart={() => setCurrentScreen('demo')} />
        )}

        {currentScreen === 'demo' && (
          <motion.div
            key="demo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen p-8 flex items-center justify-center"
          >
            <ChatDemo onReveal={() => setCurrentScreen('layers')} />
          </motion.div>
        )}

        {currentScreen === 'layers' && (
          <motion.div
            key="layers"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex flex-col overflow-hidden"
          >
            {/* 1. HEADER */}
            <header className="h-16 bg-[#252526] border-b border-[#3e3e42] flex items-center justify-between px-6 shrink-0 z-30">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentScreen('demo')}
                  className="flex items-center gap-2 text-[#858585] hover:text-[#d4d4d4] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back</span>
                </button>
                <h2 className="text-lg font-semibold text-[#d4d4d4]">Architecture Breakdown</h2>
              </div>

              <div className="flex items-center gap-4">
                <ShareButtons />
                <button
                  onClick={scrollToPromptEditor}
                  className="px-4 py-2 bg-[#4ec9b0] hover:bg-[#5fd6bd] text-[#1e1e1e] text-sm font-bold rounded transition-colors flex items-center gap-2"
                >
                  <span>Try Yours</span>
                  <span className="text-lg">→</span>
                </button>
              </div>
            </header>

            {/* MAIN LAYOUT: CENTERED CONTENT */}
            <div className="flex flex-1 overflow-hidden bg-[#1e1e1e]">


              {/* 3. MAIN STAGE (Layers) */}
              <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth relative">
                <div className="max-w-3xl mx-auto pb-20">

                  {/* Prompt Editor (Hidden by default) */}
                  <div ref={promptEditorRef} className="mb-8">
                    {promptEditorVisible && <PromptEditor />}
                  </div>

                  {/* Intro Text */}
                  <div className="text-center mb-12">
                    <p className="text-[#858585]">
                      The "intelligent" response was built from <strong className="text-[#d4d4d4]">10 architectural layers</strong>
                    </p>
                    <p className="text-sm text-[#858585] mt-1">
                      5 system layers + 5 LLM internal layers
                    </p>
                  </div>

                  {/* LAYERS */}
                  <div className="space-y-4">

                    {/* SYSTEM ARCHITECTURE LAYERS */}
                    <div className="my-6 px-4 py-2 bg-[#4ec9b0]/10 border-l-4 border-[#4ec9b0]">
                      <h3 className="font-bold text-[#4ec9b0]">Part 1: Input Processing</h3>
                    </div>

                    <LayerCard
                      layerNumber={1}
                      title="Raw Input"
                      caption="This is what you typed. No context, no memory, no goals. Just text."
                      data={layerData.layer1_rawInput}
                      articleQuote={articleQuotes.layer1.quote}
                      isDisabled={!enabledLayers.layer1}
                    />

                    <LayerCard
                      layerNumber={2}
                      title="Tokenization (Encode)"
                      caption="Text is converted to token IDs. The LLM doesn't understand words—it processes numbers."
                      data={{
                        input: layerData.layer2_tokenization.input_text,
                        tokens: layerData.layer2_tokenization.tokens,
                        token_ids: layerData.layer2_tokenization.token_ids,
                        vocab_size: layerData.layer2_tokenization.vocab_size
                      }}
                      code={layerData.layer2_tokenization.code}
                      codeLanguage="python"
                      articleQuote={articleQuotes.layer2.quote}
                      isDisabled={!enabledLayers.layer2}
                    />

                    <LayerCard
                      layerNumber={3}
                      title="Embedding Layer"
                      caption="Each token ID becomes a 12,288-dimensional vector. This is how the LLM represents meaning mathematically."
                      data={{
                        shape: layerData.layer3_embeddings.shape,
                        embedding_dim: layerData.layer3_embeddings.embedding_dim,
                        sample: layerData.layer3_embeddings.sample_embedding
                      }}
                      code={layerData.layer3_embeddings.code}
                      codeLanguage="python"
                      articleQuote={articleQuotes.layer3.quote}
                      isDisabled={!enabledLayers.layer3}
                    />

                    <LayerCard
                      layerNumber={4}
                      title="Semantic Search (Vector Similarity)"
                      caption="Your query is compared against a database using cosine similarity to find relevant context. The LLM doesn't 'remember'—the system retrieves and injects memories."
                      data={{
                        search_method: layerData.layer4_semanticSearch.search_method,
                        retrieved: layerData.layer4_semanticSearch.retrieved_docs
                      }}
                      code={layerData.layer4_semanticSearch.code}
                      codeLanguage="python"
                      articleQuote={articleQuotes.layer4.quote}
                      isDisabled={!enabledLayers.layer4}
                    />

                    <LayerCard
                      layerNumber={5}
                      title="Context Injection (MCP)"
                      caption="LLM has NO memory. This context is retrieved from external storage and ADDED to the prompt via Model Context Protocol."
                      data={layerData.layer5_contextInjection}
                      code={layerData.layer5_contextInjection.code}
                      codeLanguage="python"
                      articleQuote={articleQuotes.layer5.quote}
                      isDisabled={!enabledLayers.layer5}
                    />

                    <div className="my-6 px-4 py-2 bg-[#ffd700]/10 border-l-4 border-[#ffd700]">
                      <h3 className="font-bold text-[#ffd700]">Part 2: Orchestration</h3>
                    </div>

                    <LayerCard
                      layerNumber={6}
                      title="Task Decomposition (LangChain)"
                      caption="LLM has NO planning ability. These steps are imposed by an orchestration framework that chains multiple LLM calls together."
                      data={{
                        orchestrator: layerData.layer6_taskDecomposition.orchestrator,
                        steps: layerData.layer6_taskDecomposition.steps,
                        chain_type: layerData.layer6_taskDecomposition.chain_type
                      }}
                      code={layerData.layer6_taskDecomposition.code}
                      codeLanguage="python"
                      articleQuote={articleQuotes.layer6.quote}
                      isDisabled={!enabledLayers.layer6}
                    />

                    <div className="my-6 px-4 py-2 bg-[#ce9178]/10 border-l-4 border-[#ce9178]">
                      <h3 className="font-bold text-[#ce9178]">Part 3: LLM Internals</h3>
                    </div>

                    <LayerCard
                      layerNumber={7}
                      title="Attention Mechanism & Transformer"
                      caption="96 layers of multi-head attention. Each token 'attends' to other tokens to understand context. This is pattern matching, not reasoning."
                      data={{
                        mechanism: layerData.layer7_attention.mechanism,
                        num_heads: layerData.layer7_attention.num_heads,
                        num_layers: layerData.layer7_attention.num_layers,
                        context_window: layerData.layer7_attention.context_window
                      }}
                      code={layerData.layer7_attention.code}
                      codeLanguage="python"
                      articleQuote={articleQuotes.layer7.quote}
                      isDisabled={!enabledLayers.layer7}
                    />

                    <LayerCard
                      layerNumber={8}
                      title="Next-Token Prediction"
                      caption="This is ALL the LLM does: predict the next token based on probability. No reasoning, no truth, no intent—just statistical prediction."
                      data={{
                        vocab_size: layerData.layer8_prediction.vocab_size,
                        temperature: layerData.layer8_prediction.temperature,
                        top_tokens: layerData.layer8_prediction.output_logits.sample_tokens
                      }}
                      code={layerData.layer8_prediction.code}
                      codeLanguage="python"
                      articleQuote={articleQuotes.layer8.quote}
                      isDisabled={!enabledLayers.layer8}
                    />

                    <div className="my-6 px-4 py-2 bg-[#4ec9b0]/10 border-l-4 border-[#4ec9b0]">
                      <h3 className="font-bold text-[#4ec9b0]">Part 4: Output Processing</h3>
                    </div>

                    <LayerCard
                      layerNumber={9}
                      title="Detokenization (Decode)"
                      caption="Token IDs are converted back to text. The LLM outputs numbers, not words."
                      data={{
                        token_ids: layerData.layer9_detokenization.token_ids.slice(0, 10),
                        decoded_text: layerData.layer9_detokenization.decoded_text
                      }}
                      code={layerData.layer9_detokenization.code}
                      codeLanguage="python"
                      articleQuote={articleQuotes.layer9.quote}
                      isDisabled={!enabledLayers.layer9}
                    />

                    <LayerCard
                      layerNumber={10}
                      title="Post-Processing & Formatting"
                      caption="Even the 'professional' formatting is added by a separate layer. The raw LLM output is unstructured lowercase text."
                      data={layerData.layer10_postProcessing}
                      code={layerData.layer10_postProcessing.code}
                      codeLanguage="python"
                      articleQuote={articleQuotes.layer10.quote}
                      isDisabled={!enabledLayers.layer10}
                    />

                    {/* Final Summary & Read Article CTA */}
                    <FinalSummary
                      promptEditorVisible={promptEditorVisible}
                      scrollToPromptEditor={scrollToPromptEditor}
                    />
                  </div>
                </div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  )
}

export default App
