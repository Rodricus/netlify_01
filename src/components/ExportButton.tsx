import { Download, Share } from 'lucide-react'

interface ExportButtonProps {
    layerNumber: number
    layerTitle: string
    layerData: any
}

export default function ExportButton({ layerNumber, layerTitle, layerData }: ExportButtonProps) {
    const handleExport = () => {
        const exportData = {
            layer: layerNumber,
            title: layerTitle,
            timestamp: new Date().toISOString(),
            data: layerData,
            url: window.location.href,
            article: "https://www.linkedin.com/pulse/why-how-current-llm-systems-create-illusion-reasoning-rodrigo-bphwe"
        }

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `layer-${layerNumber}-${layerTitle.toLowerCase().replace(/\s+/g, '-')}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleShareLayer = () => {
        const shareUrl = `${window.location.origin}${window.location.pathname}#layer-${layerNumber}`

        if (navigator.share) {
            navigator.share({
                title: `Layer ${layerNumber}: ${layerTitle}`,
                text: `Check out how ${layerTitle} works in LLM systems`,
                url: shareUrl
            }).catch(() => {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(shareUrl)
                alert('Link copied to clipboard!')
            })
        } else {
            // Fallback for browsers without share API
            navigator.clipboard.writeText(shareUrl)
            alert('Link copied to clipboard!')
        }
    }

    return (
        <div className="flex gap-2 mt-2">
            <button
                onClick={handleExport}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-[#3e3e42] hover:bg-[#4e4e52] text-[#d4d4d4] rounded transition-colors"
                aria-label={`Export Layer ${layerNumber} data`}
            >
                <Download className="w-3 h-3" />
                Export JSON
            </button>

            <button
                onClick={handleShareLayer}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-[#3e3e42] hover:bg-[#4e4e52] text-[#d4d4d4] rounded transition-colors"
                aria-label={`Share Layer ${layerNumber} link`}
            >
                <Share className="w-3 h-3" />
                Share Layer
            </button>
        </div>
    )
}
