import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"
import Title from "../../common/components/Title";

const data = [
  { name: 'Pagados', value: 400 },
  { name: 'Morosos', value: 300 },
  { name: 'Lista negra', value: 300 },
];

const CustomPieChart = (props) => {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <ResponsiveContainer width={250} height={250} className="text-center">
        <PieChart width={150} height={150}>
          <Pie data={data} dataKey="value" outerRadius={100} fill={props.color} />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}

export default CustomPieChart;