import { useImageSearchQuery } from "../../api/queries/use-image-search.query";
import { useSearchContext } from "../../stores/search/use-search-context";
import { ItemLinkType } from "../../types/nasa-response";

export const ResultsGrid = () => {
	const { searchContext } = useSearchContext();

	const { data: response, isLoading } = useImageSearchQuery({
		query: searchContext.query,
		page: searchContext.page || "1",
		yearStart: searchContext.yearStart,
		yearEnd: searchContext.yearEnd,
	});

	const data = response?.data;

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!data && searchContext.query) {
		return <div>No data for this query</div>;
	}

	return (
		<div>
			<h1>Results Grid</h1>
			<div>
				{data && data.length > 0
					? data.map((item) => {
							const datum = item.data[0];

							if (!datum) {
								return null;
							}

							return (
								<div key={datum.nasa_id}>
									<img
										alt={datum.title}
										src={
											item?.links?.find(
												(link) => link.rel === ItemLinkType.Preview
											)?.href
										}
									/>

									<p>{datum.title}</p>

									<p>{datum.description}</p>

									<p>{datum.secondary_creator}</p>

									<p>{datum.location}</p>
								</div>
							);
						})
					: null}
			</div>
		</div>
	);
};
