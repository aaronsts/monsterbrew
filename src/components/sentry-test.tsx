import React from "react";

function SentryTest() {
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
		</div>
	);
}

export default SentryTest;
