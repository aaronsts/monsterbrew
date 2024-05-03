import { Checkbox } from "../ui/checkbox";
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
		<div className="grid grid-cols-3 gap-3 border-b pb-6 border-zinc-700">
			<FormField
				control={form.control}
				name="speed.walk"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Walking</FormLabel>
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
			<FormField
				control={form.control}
				name="speed.swim"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Swimming</FormLabel>
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
			<FormField
				control={form.control}
				name="speed.burrow"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Burrowing</FormLabel>
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
			<FormField
				control={form.control}
				name="speed.climb"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Climbing</FormLabel>
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
			<FormField
				control={form.control}
				name="speed.fly"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Flying</FormLabel>
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
			<FormField
				control={form.control}
				name="speed.hover"
				render={({ field }) => (
					<FormItem className="flex gap-2 items-center self-end h-9">
						<FormControl>
							<Checkbox
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						</FormControl>

						<FormLabel>Hover</FormLabel>
					</FormItem>
				)}
			/>
		</div>
	);
}
