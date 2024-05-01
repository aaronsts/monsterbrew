import React from "react";

const Statistic = ({ stat, value }: { stat: string; value: number }) => {
	return (
		<div className="w-fit text-center">
			<h4 className="font-bold">{stat}</h4>
			<p>
				{value}
				{Math.floor(value / 2) - 5 >= 0 ? (
					<span>{`(+${Math.floor(value / 2) - 5})`}</span>
				) : (
					<span>{`(${Math.floor(value / 2) - 5})`}</span>
				)}
			</p>
		</div>
	);
};

export default Statistic;
