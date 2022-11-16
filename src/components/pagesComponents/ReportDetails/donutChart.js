import React from "react";
import Chart from "react-apexcharts";
// import { getThemeSettingsVariables, rgb2hex} from "../../common/Global/commonFunctions";
// let themeSettings = getThemeSettingsVariables();

const Donutchart = (props) => {
	const { donutData, id, labels } = props;
    // themeSettings = getThemeSettingsVariables();
    // const hexCompleted = rgb2hex(`rgba(${themeSettings.themeColor.r},${themeSettings.themeColor.g},${themeSettings.themeColor.b})`)
	return (
		<Chart
			options={{
				chart: {
					id,
				},
				plotOptions: {
					pie: {
						donut: {
							size: "40%",
						},
						expandOnClick: true,
					},
				},
                colors: ['#228B22', '#FF0000', '#A9A9A9'],
				dataLabels: {
					// formatter: function (val, opts) {
					// 	return opts.w.config.series[opts.seriesIndex];
					// },
				},
				legend: {
					show: false,
				},
				responsive: [
					{
						breakpoint: 600,
						options: {
							chart: {
								width: "100%",
								height: 250,
							},
							legend: {
								show: false,
							},
						},
					},
					{
						breakpoint: 480,
						options: {
							chart: {
								width: "100%",
							},
							legend: {
								show: false,
							},
						},
					},
				],
				labels,
			}}
			height={260}
			width={260}
			series={donutData}
			type="donut"
		/>
	);
};

export default Donutchart;
