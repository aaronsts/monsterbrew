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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const MonsterAbilitiesForm = (
	form:
		| UseFormReturn<z.infer<typeof createMonsterStatblockSchema>>
		| any
		| undefined
) => {
	return (
		<div>
			<Tabs defaultValue="traits">
				<TabsList>
					<TabsTrigger value="traits">Traits</TabsTrigger>
					<TabsTrigger value="actions">Actions</TabsTrigger>
					<TabsTrigger value="bonus_actions">Bonus Actions</TabsTrigger>
					<TabsTrigger value="reactions">Reactions</TabsTrigger>
				</TabsList>
				<TabsContent value="traits">
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
				</TabsContent>
				<TabsContent value="actions">
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
				</TabsContent>
				<TabsContent value="bonus_actions">
					<FormField
						control={form.control}
						name="monster_bonus_actions.description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bonus Actions</FormLabel>
								<FormControl>
									<Textarea placeholder="ex. Amphibious" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</TabsContent>
				<TabsContent value="reactions">
					<FormField
						control={form.control}
						name="monster_reactions.description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Reactions</FormLabel>
								<FormControl>
									<Textarea placeholder="ex. Amphibious" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default MonsterAbilitiesForm;
