import moment from "moment";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DataRender = {
  date: string;
  isActive: boolean;
};
export const ChartTracking = ({ dataRender }: { dataRender: DataRender[] }) => {
  const rename = () => {
    return dataRender.map((item: DataRender) => {
      return {
        time: moment.utc(item.date).local().format("HH:mm"),
        signal: item.isActive ? 1 : 0,
      };
    });
  };

  const data = rename();

  return (
    <ResponsiveContainer width={"100%"} height={200}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis
          interval={3}
          tickFormatter={(value) => (value === 1 ? "On" : "Off")}
        />

        <Tooltip
          formatter={(value, name, props) => {
            const signal = value === 1 ? "On" : "Off";
            return [`${signal}`, `Time: ${props.payload.time}`];
          }}
        />

        <Line
          dataKey="signal"
          type={"stepAfter"}
          stroke={"#42A5F5"}
          dot={(dotProps) => {
            // Conditional dot color based on the signal value
            const color = dotProps.payload.signal === 1 ? "green" : "red";
            const uniqueKey = `dot-${dotProps.cx}-${dotProps.cy}`;
            return (
              <circle
                cx={dotProps.cx}
                cy={dotProps.cy}
                r={5}
                fill={color}
                key={uniqueKey}
              />
            );
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
