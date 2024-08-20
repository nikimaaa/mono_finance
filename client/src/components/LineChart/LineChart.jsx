import { ResponsiveLine } from '@nivo/line'

const LineChart = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        isInteractive={false}
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