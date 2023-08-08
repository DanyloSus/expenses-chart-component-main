import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  BarProps,
} from "recharts";

interface DataItem {
  day: string;
  amount: number;
}

interface Props {
  data: DataItem[];
}

const Graphic: React.FC<Props> = ({ data }) => {
  const maxAmount = Math.max(...data.map((item) => item.amount));

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const onMouseEnter = (e: any) => {
    const tooltipHeight = 50;
    setTooltipPosition({ x: e.x - 10, y: e.y - tooltipHeight });
  };

  useEffect(() => {
    getChartWidth();
  }, [window.innerWidth]);

  const getChartWidth = () => {
    return window.innerWidth > 500 ? 460 : 250;
  };

  return (
    <section className="bg-very-pale-orange rounded-3xl sm:rounded-xl p-10 mt-6">
      <h2 className="text-3xl">Spending - Last 7 days</h2>
      <BarChart
        width={getChartWidth()}
        height={250}
        data={data}
        margin={{ top: 40 }}
      >
        <XAxis
          dataKey="day"
          stroke="medium-brown"
          label={{
            value: "random text",
            position: "insideBottomRight",
            offset: -20,
          }}
        />
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0)" }}
          content={<CustomTooltip />}
          position={tooltipPosition}
        />
        <Bar dataKey="amount" onMouseEnter={onMouseEnter}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                index === hoverIndex
                  ? entry.amount === maxAmount
                    ? "hsla(186, 34%, 60%, 0.5)"
                    : "hsla(10, 79%, 65%, 0.5)"
                  : entry.amount === maxAmount
                  ? "hsl(186, 34%, 60%)"
                  : "hsl(10, 79%, 65%)"
              }
              radius={5}
              onMouseEnter={() => {
                handleMouseEnter(index);
              }}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </Bar>
      </BarChart>
      <hr className="mt-5" />
      <div className="flex items-end mt-5">
        <div className="flex flex-col">
          <p>Total the month</p>
          <h1 className="text-5xl sm:text-3xl">$478.33</h1>
        </div>
        <div className="flex flex-col text-right ml-auto">
          <h3>+2.4%</h3>
          <p>from last month</p>
        </div>
      </div>
    </section>
  );
};

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg bg-dark-brown text-very-pale-orange px-3 py-2">
        <p className="text-very-pale-orange">${data.amount}</p>
      </div>
    );
  }

  return null;
};

export default Graphic;
