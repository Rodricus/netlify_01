import ReactJson from 'react-json-view'

interface DataViewerProps {
    data: any
    collapsed?: number
}

export default function DataViewer({ data, collapsed = 1 }: DataViewerProps) {
    return (
        <div className="bg-[#1e1e1e] rounded p-4">
            <ReactJson
                src={data}
                theme="monokai"
                collapsed={collapsed}
                displayDataTypes={false}
                displayObjectSize={false}
                enableClipboard={true}
                iconStyle="triangle"
                style={{
                    backgroundColor: 'transparent',
                    fontSize: '13px',
                    fontFamily: 'ui-monospace, monospace'
                }}
            />
        </div>
    )
}
