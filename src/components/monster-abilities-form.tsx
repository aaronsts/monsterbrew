import { createMonsterStatblockSchema } from "@/lib/formSchemas";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

const MonsterAbilitiesForm = (
	form:
		| UseFormReturn<z.infer<typeof createMonsterStatblockSchema>>
		| any
		| undefined
) => {
	return (
		<div>
			<FormField
				control={form.control}
				name="monster_traits.description"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Traits</FormLabel>
						<FormControl>
							<Textarea placeholder="ex. Amphibious" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="monster_actions.description"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Actions</FormLabel>
						<FormControl>
							<Textarea placeholder="ex. Amphibious" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default MonsterAbilitiesForm;
