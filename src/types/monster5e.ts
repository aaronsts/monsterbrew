import { monsterStatblockSchema } from "@/lib/formSchemas";
import * as z from "zod";

export type Monster5e = z.output<typeof monsterStatblockSchema>;
