import { ResponsiveBar } from '@nivo/bar'
import formatCurrency from "../../helpers/formatCurrency.js";
import {Stack} from "@mui/material";

const Tooltip = ({data, color, value, id, ...rest}) => {
    return (
        <div style={{
            background: "#18191c",
            color: "#ffffff",
            padding: "5px 10px",
            borderRadius: "2px",
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>
            <Stack direction="row" alignItems="center" gap={1}>
                <div style={{
                    height: 10,
                    width: 10,
                    borderRadius: "50%",
                    backgroundColor: color
                }}>
                </div>
                <div>{id}</div>
            </Stack>

            <span>Дата: {data.date}</span>
            <span>Сумма: {formatCurrency(value)}</span>
        </div>
    )
}

const BarChart = ({data, keys, indexBy}) => (
    <ResponsiveBar
        data={data}
        keys={keys}
        tooltip={Tooltip}
        theme={{
            "grid": {
                "line": {
                    "stroke": "#36393E",
                    "strokeWidth": 1
                }
            },
            text: {fill: "#ffffff"},
            "tooltip": {
                "container": {
                    "background": "#18191c",
                    "color": "#ffffff",
                    "fontSize": 12
                }
            }
        }}
        indexBy={indexBy}
        margin={{bottom: 40}}
        padding={0.3}
        groupMode="stacked"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#3759CA', "#ffffff"]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={null}
        enableGridY
        enableLabel
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[]}
        role="application"
    />
)

export default BarChart;