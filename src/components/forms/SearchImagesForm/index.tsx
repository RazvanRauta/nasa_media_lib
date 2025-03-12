import { FormProvider, useForm } from "react-hook-form";
import type { ZodType } from "zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../FormInput";
import { SearchIcon } from "./SearchIcon";
import { useSearchContext } from "../../../stores/search/use-search-context";

export type FormData = {
	search: string;
	startYear?: string | number;
	endYear?: string | number;
};

const currentYear = new Date().getFullYear();

const SearchImagesSchema: ZodType<FormData> = z.object({
	search: z.string().min(3).max(50),
	startYear: z
		.string()
		.transform((value) => (value === "" ? undefined : parseInt(value)))
		.pipe(z.number().int().min(1920).max(currentYear))
		.optional(),
	endYear: z
		.string()
		.transform((value) => (value === "" ? undefined : parseInt(value)))
		.pipe(z.number().int().min(1920).max(currentYear))
		.optional(),
});

export const SearchImagesForm = () => {
	const {
		searchContext: {
			query: searchQuery,
			yearStart: searchYearStart,
			yearEnd: searchYearEnd,
		},
		searchActionsContext: { setQuery: setSearchParameters },
	} = useSearchContext();

	const methods = useForm({
		resolver: zodResolver(SearchImagesSchema),
		defaultValues: {
			search: searchQuery,
			startYear: searchYearStart?.toString(),
			endYear: searchYearEnd?.toString(),
		},
	});

	const { handleSubmit } = methods;

	const onSubmit = handleSubmit((formData) => {
		setSearchParameters({
			query: formData.search,
			yearStart: formData.startYear,
			yearEnd: formData.endYear,
			page: "1",
		});
	});

	return (
		<FormProvider {...methods}>
			<form data-testid="search-form" onSubmit={onSubmit}>
				<div className="grid grid-cols-2 gap-4 mt-4">
					<FormInput
						large
						className="col-span-2"
						data-testid="search-input"
						icon={<SearchIcon />}
						name="search"
						placeholder="Search: e.g. apollo 11"
						type="search"
					/>
					<div className="flex col-span-2 gap-4">
						<FormInput
							data-testid="start-year"
							hint="1920 - current year"
							name="startYear"
							placeholder="Start Year (optional)"
							type="number"
						/>
						<FormInput
							data-testid="end-year"
							hint="1920 - current year"
							name="endYear"
							placeholder="End Year (optional)"
							type="number"
						/>
					</div>

					<button
						className="col-span-2 btn btn-outline btn-primary"
						data-testid="search-button"
						type="submit"
					>
						<SearchIcon />
						Search
					</button>
				</div>
			</form>
		</FormProvider>
	);
};
