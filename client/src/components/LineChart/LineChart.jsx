import { ResponsiveLine } from '@nivo/line'
import formatCurrency from "../../helpers/formatCurrency.js";

const Tooltip = ({point}) => {
    return (
        <div style={{
            background: "#18191c",
            color: "#ffffff",
            padding: "5px 10px",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginRight: 100
        }}>
            <span>{point.data.x} </span>
            <span style={{color: point.borderColor}}>{formatCurrency(point.data.y)}</span>
        </div>
    )
}

const LineChart = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        tooltip={Tooltip}
        isInteractive
        theme={{
            "tooltip": {
                "container": {
                    "background": "#18191c",
                    "color": "#ffffff",
                    "fontSize": 12
                }
            }
        }}
        margin={{top: 5, bottom: 20}}
        enableCrosshair={false}
        colors={['#4872fb']}
        data={data}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableArea={true}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[]}
    />
)

export default LineChart;