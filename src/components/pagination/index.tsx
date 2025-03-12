export const Pagination = ({
	currentPage,
	totalPages,
	handlePageChange,
}: {
	currentPage: number;
	totalPages: number;
	handlePageChange: (newPage: number) => void;
}) => {
	return (
		<div className="flex justify-center mt-4 join">
			<button
				className="join-item btn"
				disabled={currentPage === 1}
				onClick={() => {
					handlePageChange(currentPage - 1);
				}}
			>
				«
			</button>

			<button disabled className="text-white join-item btn">
				{`Page ${currentPage} out of ${totalPages}`}
			</button>

			<button
				className="join-item btn"
				disabled={currentPage === totalPages}
				onClick={() => {
					handlePageChange(currentPage + 1);
				}}
			>
				»
			</button>
		</div>
	);
};
