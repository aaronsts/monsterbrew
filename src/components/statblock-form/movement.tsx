import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { IChildForm } from "./ability-scores";

export default function Movement({ form }: IChildForm) {
	return (
		<FormField
			control={form.control}
			name="speed.walk"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Walking Speed</FormLabel>
					<FormControl>
						<div className="relative w-full">
							<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10">
								ft.
							</span>
							<Input type="number" placeholder="ex. 40" {...field} />
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
