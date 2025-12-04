import { Share2, Linkedin, Twitter, Facebook } from 'lucide-react'

interface ShareButtonsProps {
    url?: string
    title?: string
}

export default function ShareButtons({
    url = 'https://illusion-of-reasoning.netlify.app/',
    title = 'How LLM Systems Create the Illusion of Reasoning'
}: ShareButtonsProps) {
    const shareLinks = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }

    const canShare = typeof navigator !== 'undefined' && typeof navigator.share !== 'undefined'

    const handleNativeShare = async () => {
        if (canShare) {
            try {
                await navigator.share({
                    title: title,
                    text: 'Interactive exploration of LLM architecture',
                    url: url
                })
            } catch (err) {
                console.log('Share cancelled')
            }
        }
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-[#858585] hidden sm:inline">Share:</span>

            {canShare && (
                <button
                    onClick={handleNativeShare}
                    className="p-2 rounded bg-[#3e3e42] hover:bg-[#4e4e52] text-[#d4d4d4] transition-colors"
                    aria-label="Share"
                >
                    <Share2 className="w-3 h-3" />
                </button>
            )}

            <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-[#0077b5] hover:bg-[#006399] text-white transition-colors"
                aria-label="Share on LinkedIn"
            >
                <Linkedin className="w-3 h-3" />
            </a>

            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-[#1da1f2] hover:bg-[#1a91da] text-white transition-colors"
                aria-label="Share on Twitter"
            >
                <Twitter className="w-3 h-3" />
            </a>

            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-[#1877f2] hover:bg-[#166fe5] text-white transition-colors"
                aria-label="Share on Facebook"
            >
                <Facebook className="w-3 h-3" />
            </a>
        </div>
    )
}
