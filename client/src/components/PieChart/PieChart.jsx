import { ResponsivePie } from '@nivo/pie'
import formatCurrency from "../../helpers/formatCurrency.js";

const Tooltip = ({datum}) => {
    return (
        <div style={{
            background: "#18191c",
            color: "#ffffff",
            padding: "5px 10px",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: 10
        }}>
            <div style={{
                height: 10,
                width: 10,
                borderRadius: "50%",
                backgroundColor: datum.color
            }}>
            </div>
            <span>{datum.data.smile} {datum.label} - {formatCurrency(datum.value)} ({datum.data.percentage}%)</span>
        </div>
    )
}

const PieChart = ({data, enableArkLabels = false, arcLabel, margin}) => (
    <ResponsivePie
        theme={{
            text: {fill: "#ffffff"},
            "tooltip": {
                "container": {
                    "background": "#18191c",
                    "color": "#ffffff",
                    "fontSize": 12
                }
            }
        }}
        tooltip={Tooltip}
        data={data}
        margin={{ top: margin, right: margin, bottom: margin, left: margin }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        colors={['#3759CA', "#ffffff"]}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#ffffff"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        enableArcLinkLabels={enableArkLabels}
        arcLinkLabel={e=> `${e.data.smile} ${e.label}`}
        arcLabel={arcLabel}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
    />
)

export default PieChart;