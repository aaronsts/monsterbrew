import { createMonsterStatblockSchema } from "@/lib/formSchemas";
import { Controller, UseFormReturn } from "react-hook-form";
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
import TiptapEditor from "./tiptap";

const MonsterAbilitiesForm = (
	form:
		| UseFormReturn<z.infer<typeof createMonsterStatblockSchema>>
		| any
		| undefined
) => {
	return (
		<div>
			<Tabs defaultValue="traits">
				<TabsList className="w-full md:w-fit justify-between">
					<TabsTrigger value="traits">Traits</TabsTrigger>
					<TabsTrigger value="actions">Actions</TabsTrigger>
					<TabsTrigger value="bonus_actions">Bonus Actions</TabsTrigger>
					<TabsTrigger value="reactions">Reactions</TabsTrigger>
				</TabsList>
				<TabsContent value="traits">
					<FormItem className="min-h-36">
						<FormLabel>Traits</FormLabel>
						<FormControl>
							<Controller
								render={({ field }) => (
									<TiptapEditor
										description={field.value}
										onChange={field.onChange}
									/>
								)}
								name="monster_traits.description"
								defaultValue=""
							/>
						</FormControl>
					</FormItem>
				</TabsContent>
				<TabsContent value="actions">
					<FormItem className="min-h-36">
						<FormLabel>Actions</FormLabel>
						<FormControl>
							<Controller
								render={({ field }) => (
									<TiptapEditor
										description={field.value}
										onChange={field.onChange}
									/>
								)}
								name="monster_actions.description"
								defaultValue=""
							/>
						</FormControl>
					</FormItem>
				</TabsContent>
				<TabsContent value="bonus_actions">
					<FormItem className="min-h-36">
						<FormLabel>Bonus Actions</FormLabel>
						<FormControl>
							<Controller
								render={({ field }) => (
									<TiptapEditor
										description={field.value}
										onChange={field.onChange}
									/>
								)}
								name="monster_bonus_actions.description"
								defaultValue=""
							/>
						</FormControl>
					</FormItem>
				</TabsContent>
				<TabsContent value="reactions">
					<FormItem className="min-h-36 ">
						<FormLabel>Reactions</FormLabel>
						<FormControl>
							<Controller
								render={({ field }) => (
									<TiptapEditor
										description={field.value}
										onChange={field.onChange}
									/>
								)}
								name="monster_reactions.description"
								defaultValue=""
							/>
						</FormControl>
					</FormItem>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default MonsterAbilitiesForm;
