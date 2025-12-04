import { motion } from 'framer-motion'
import { Code, Database, ChevronDown, ChevronUp, BookOpen, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import CodeViewer from './CodeViewer'
import DataViewer from './DataViewer'
import ExportButton from './ExportButton'
import { useAppStore } from '../store/appStore'

interface LayerCardProps {
    layerNumber: number
    title: string
    caption: string
    data?: any
    code?: string
    codeLanguage?: string
    isActive?: boolean
    articleQuote?: string
    isDisabled?: boolean
}

export default function LayerCard({
    layerNumber,
    title,
    caption,
    data,
    code,
    codeLanguage = 'json',
    isActive = false,
    articleQuote,
    isDisabled = false
}: LayerCardProps) {
    const [showCode, setShowCode] = useState(false)
    const [showData, setShowData] = useState(true)
    const [isExpanded, setIsExpanded] = useState(true)
    const { toggleLayer, enabledLayers } = useAppStore()

    // Determine the layer key based on number
    const layerKey = `layer${layerNumber}` as keyof typeof enabledLayers

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isDisabled ? 0.5 : 1, y: 0, scale: isDisabled ? 0.98 : 1 }}
            transition={{ delay: layerNumber * 0.1 }}
            className={`bg-[#252526] border rounded mb-4 overflow-hidden transition-all ${isDisabled ? 'opacity-50 border-[#ffd700]' :
                isActive ? 'border-l-4 border-l-[#ffd700] border-[#3e3e42]' : 'border-[#3e3e42]'
                }`}
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between gap-4">
                <div
                    className="flex-1 flex items-center gap-4 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[#1e1e1e] font-bold text-sm ${isDisabled ? 'bg-[#858585]' : 'bg-[#4ec9b0]'
                        }`}>
                        {layerNumber}
                    </div>
                    <h3 className="text-lg font-semibold text-[#d4d4d4]">{title}</h3>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            toggleLayer(layerKey)
                        }}
                        className={`p-2 rounded-md transition-colors ${isDisabled
                            ? 'text-[#858585] hover:bg-[#3e3e42] hover:text-[#d4d4d4]'
                            : 'text-[#4ec9b0] bg-[#4ec9b0]/10 hover:bg-[#4ec9b0]/20'}`}
                        title={isDisabled ? "Enable Layer" : "Disable Layer"}
                    >
                        {isDisabled ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 hover:bg-[#3e3e42] rounded"
                    >
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-[#858585]" /> : <ChevronDown className="w-5 h-5 text-[#858585]" />}
                    </button>
                </div>
            </div>

            {/* Content */}
            {isExpanded && (
                <div className="px-4 pb-4 space-y-4">
                    {/* Disabled Banner */}
                    {isDisabled && (
                        <div className="p-3 bg-[#ffd700]/10 border border-[#ffd700] rounded">
                            <p className="text-sm text-[#ffd700] font-semibold">
                                ⚠️ This layer is currently disabled. Toggle it on in Layer Controls to see its effect.
                            </p>
                        </div>
                    )}

                    {/* Caption */}
                    <p className="text-sm text-[#858585] italic border-l-2 border-[#4ec9b0] pl-3">
                        {caption}
                    </p>

                    {/* Article Quote */}
                    {articleQuote && !isDisabled && (
                        <div className="bg-[#1e1e1e] border border-[#ffd700]/30 rounded p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-4 h-4 text-[#ffd700]" />
                                <span className="text-xs font-semibold text-[#ffd700] uppercase">From the Article</span>
                            </div>
                            <p className="text-sm text-[#d4d4d4] italic leading-relaxed">
                                "{articleQuote}"
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {!isDisabled && (
                        <div className="flex flex-wrap items-center gap-2">
                            {data && (
                                <button
                                    onClick={() => setShowData(!showData)}
                                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-colors ${showData
                                        ? 'bg-[#4ec9b0] text-[#1e1e1e]'
                                        : 'bg-[#3e3e42] text-[#d4d4d4] hover:bg-[#4e4e52]'
                                        }`}
                                >
                                    <Database className="w-4 h-4" />
                                    View Data
                                </button>
                            )}
                            {code && (
                                <button
                                    onClick={() => setShowCode(!showCode)}
                                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-colors ${showCode
                                        ? 'bg-[#4ec9b0] text-[#1e1e1e]'
                                        : 'bg-[#3e3e42] text-[#d4d4d4] hover:bg-[#4e4e52]'
                                        }`}
                                >
                                    <Code className="w-4 h-4" />
                                    View Code
                                </button>
                            )}
                            <div className="ml-auto">
                                <ExportButton layerNumber={layerNumber} layerTitle={title} layerData={data} />
                            </div>
                        </div>
                    )}

                    {/* Data Viewer */}
                    {!isDisabled && showData && data && (
                        <div className="animate-in">
                            <DataViewer data={data} />
                        </div>
                    )}

                    {/* Code Viewer */}
                    {!isDisabled && showCode && code && (
                        <div className="animate-in">
                            <CodeViewer code={code} language={codeLanguage} />
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    )
}
