import { useImageSearchQuery } from "../../api/queries/use-image-search.query";
import { useSearchContext } from "../../stores/search/use-search-context";
import { Loader } from "../loader";
import { Pagination } from "../pagination";
import { ResultCard } from "./ResultCard";

export const ResultsGrid = () => {
	const {
		searchContext,
		searchActionsContext: { setPage },
	} = useSearchContext();

	const { data: response, isLoading } = useImageSearchQuery({
		query: searchContext.query,
		page: searchContext.page || "1",
		yearStart: searchContext.yearStart,
		yearEnd: searchContext.yearEnd,
	});

	const data = response?.data;
	const totalPages = response?.meta?.totalPages;
	const currentPage = parseInt(searchContext.page || "1");

	const handlePageChange = (newPage: number) => {
		setPage(newPage.toString());
	};

	if (isLoading) {
		return <Loader />;
	}

	if (!data || (data?.length === 0 && searchContext.query)) {
		return (
			<div className="container flex items-center justify-center w-full h-full mt-5">
				<div className="flex items-center justify-center px-4 py-4 mx-auto bg-gray-800 border border-gray-400 rounded-md bg-opacity-30 bg-clip-padding backdrop-filter backdrop-blur-sm">
					<p className="text-xl text-error">
						No results found for "{searchContext.query}"
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col py-10">
			<div className="container grid grid-cols-1 gap-4 mx-auto md:grid-cols-2 lg:grid-cols-3">
				{data && data.length > 0
					? data.map((item) => {
							const datum = item.data[0];

							if (!datum) {
								return null;
							}
							return (
								<ResultCard
									key={datum.nasa_id}
									item={datum}
									links={item.links}
								/>
							);
						})
					: null}
			</div>

			{totalPages && totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					handlePageChange={handlePageChange}
					totalPages={totalPages}
				/>
			)}
		</div>
	);
};
