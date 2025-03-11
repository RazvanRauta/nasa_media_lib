import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { ZodType } from "zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextInput from "../forms/TextInput";

export type FormData = {
	search: string;
	startYear?: number;
	endYear?: number;
};

const SearchImagesSchema: ZodType<FormData> = z.object({
	search: z.string().min(3).max(50),
	startYear: z.number().optional(),
	endYear: z.number().optional(),
});

export const SearchImages = (): ReactNode => {
	const methods = useForm({
		resolver: zodResolver(SearchImagesSchema),
		defaultValues: {
			search: "",
			startYear: null,
			endYear: null,
		},
	});

	const { handleSubmit } = methods;

	const onSubmit = handleSubmit((formData) => {
		console.log(formData);
	});

	return (
		<div className="bg-gray-800 bg-opacity-30 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-400 px-4 py-8 container mx-auto w-full max-w-2xl">
			<div className="container">
				<h1 className="text-4xl text-white text-center">Search Images</h1>
				<FormProvider {...methods}>
					<form data-testid="search-form" onSubmit={onSubmit}>
						<FormTextInput
							name="search"
							placeholder="Search"
							icon={
								<svg
									className="h-[1em] opacity-50"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2.5"
									>
										<circle cx="11" cy="11" r="8"></circle>
										<path d="m21 21-4.3-4.3"></path>
									</g>
								</svg>
							}
						/>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};
