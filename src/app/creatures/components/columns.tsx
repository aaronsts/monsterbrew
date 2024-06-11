"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import {
	CHALLENGE_RATINGS,
	CREATURE_SOURCES,
	monster_sizes,
	monster_types,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListCreature } from "@/types";

export const creatureColumns: ColumnDef<ListCreature>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => (
			<div className="w-72 font-short">
				{row.getValue("name")}{" "}
				<span className="text-xs ml-1 bg-zinc-300/20 px-1 rounded-sm border border-zinc-300 py-0.5 text-zinc-500">
					{row.getValue("document__slug")}
				</span>
			</div>
		),
		enableSorting: true,
	},
	{
		accessorKey: "challenge_rating",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="CR" />
		),
		cell: ({ row }) => {
			const cr = CHALLENGE_RATINGS.find(
				(challenge) => challenge.label === row.getValue("challenge_rating")
			);

			if (!cr) {
				return null;
			}

			return (
				<div className="flex font-short items-center">
					<span>{cr.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "type",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
		cell: ({ row }) => {
			const type = monster_types.find(
				(priority) =>
					priority.value === (row.getValue("type") as string).toLowerCase()
			);

			if (!type) {
				return null;
			}

			return (
				<div className="flex font-short items-center">
					<span
						className={`bg-${type.value}/20 border-${type.value} border px-1 rounded-sm`}
					>
						{type.label}
					</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes((row.getValue(id) as string).toLowerCase());
		},
	},
	{
		accessorKey: "size",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Size" />
		),
		cell: ({ row }) => {
			const size = monster_sizes.find(
				(label) =>
					label.value === (row.getValue("size") as string).toLowerCase()
			);

			if (!size) return null;

			return (
				<div className="flex w-24 font-short space-x-2">
					<span>{size.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes((row.getValue(id) as string).toLowerCase());
		},
	},
	{
		accessorKey: "environments",
		header: ({ column }) => (
			// <DataTableColumnHeader column={column} title="Environments" />
			<></>
		),
		cell: ({ row }) => {
			const environments: string[] = row.getValue("environments");
			return (
				// <div className="flex w-full flex-wrap font-short gap-2">
				// 	{environments.map((env, i) => (
				// 		<Badge className="w-fit" key={i}>
				// 			{env}
				// 		</Badge>
				// 	))}
				// </div>
				<></>
			);
		},
		filterFn: (row, id, value) => {
			const environments = (row.getValue(id) as string[]).map((env) =>
				env.toLowerCase()
			);
			return value.some((v: string) => environments.includes(v));
		},
	},
	{
		accessorKey: "document__slug",
		header: ({ column }) => (
			<></>
			// <DataTableColumnHeader column={column} title="Source" />
		),
		cell: ({ row }) => {
			const src = CREATURE_SOURCES.find(
				(label) =>
					label.value ===
					(row.getValue("document__slug") as string).toLowerCase()
			);

			if (!src) return null;

			return (
				<></>
				// <div className="flex w-full font-short space-x-2">
				// 	<span>{src.label}</span>
				// </div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes((row.getValue(id) as string).toLowerCase());
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return (
				<Link
					href={{ pathname: "editor", query: { creature: row.original.slug } }}
					passHref
				>
					<Button
						className="bg-tower-200 text-black border border-tower-400 h-fit py-1 hover:bg-tower-400"
						size="sm"
					>
						View
					</Button>
				</Link>
			);
		},
	},
];
