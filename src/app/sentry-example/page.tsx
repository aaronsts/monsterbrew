import React from "react";

export default async function SentryExample() {
	return (
		<div>
			<button
				type="button"
				onClick={() => {
					throw new Error("Sentry Frontend Error");
				}}
			>
				Throw error
			</button>
			;
		</div>
	);
}
