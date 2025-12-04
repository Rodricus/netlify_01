import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeViewerProps {
    code: string
    language: string
    showLineNumbers?: boolean
}

export default function CodeViewer({ code, language, showLineNumbers = true }: CodeViewerProps) {
    return (
        <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={showLineNumbers}
            customStyle={{
                margin: 0,
                borderRadius: '4px',
                fontSize: '13px',
                padding: '16px',
                backgroundColor: '#1e1e1e'
            }}
            codeTagProps={{
                style: {
                    fontFamily: 'ui-monospace, monospace'
                }
            }}
        >
            {code}
        </SyntaxHighlighter>
    )
}
