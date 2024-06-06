"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	CHALLENGE_RATINGS,
	CREATURE_SOURCES,
	ENVIRONMENTS,
	monster_sizes,
	monster_types,
} from "@/lib/constants";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;
	const monster_ratings = Object.values(CHALLENGE_RATINGS).map((rating) => ({
		label: rating.value,
		value: rating.label,
	}));

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Search Creatures..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) => {
						table.getColumn("name")?.setFilterValue(event.target.value);
					}}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn("challenge_rating") && (
					<DataTableFacetedFilter
						column={table.getColumn("challenge_rating")}
						title="CR"
						options={monster_ratings}
					/>
				)}
				{table.getColumn("type") && (
					<DataTableFacetedFilter
						column={table.getColumn("type")}
						title="Type"
						options={monster_types}
					/>
				)}
				{table.getColumn("size") && (
					<DataTableFacetedFilter
						column={table.getColumn("size")}
						title="Size"
						options={monster_sizes}
					/>
				)}
				{table.getColumn("environments") && (
					<DataTableFacetedFilter
						column={table.getColumn("environments")}
						title="Environment"
						options={ENVIRONMENTS}
					/>
				)}
				{table.getColumn("document__slug") && (
					<DataTableFacetedFilter
						column={table.getColumn("document__slug")}
						title="Source"
						options={CREATURE_SOURCES}
					/>
				)}

				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Clear Filters
						<Cross2Icon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
		</div>
	);
}
