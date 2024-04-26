"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
	monster_name: z.string().min(2).max(50),
	monster_type: z.string().min(2).max(50),
});

const CreateStatblock = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			monster_name: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="monster_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Monster Name</FormLabel>
							<FormControl>
								<Input placeholder="ex. Ancient Black Dragon" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="monster_type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Monster Type</FormLabel>
							<FormControl>
								<Input placeholder="ex. Dragon" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default CreateStatblock;
