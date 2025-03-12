import { test, expect } from "@playwright/test";

test.describe("SearchImagesForm", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:5173/");
	});

	test("should allow searching with a valid query", async ({ page }) => {
		const searchInput = page.getByTestId("search-input");
		const searchButton = page.getByTestId("search-button");

		await searchInput.fill("apollo 11");
		await searchButton.click();

		await expect(page).toHaveURL(/.*apollo%2011/);
	});

	test("should display an error message for an invalid query", async ({
		page,
	}) => {
		const searchInput = page.getByTestId("search-input");
		const searchButton = page.getByTestId("search-button");

		await searchInput.fill("ap");
		await searchButton.click();

		const errorMessage = page.getByTestId("search-error");
		await expect(errorMessage).toBeVisible();
	});

	test("should allow searching with a valid year range", async ({ page }) => {
		const searchInput = page.getByTestId("search-input");
		const startYearInput = page.getByTestId("start-year");
		const endYearInput = page.getByTestId("end-year");
		const searchButton = page.getByTestId("search-button");

		await searchInput.fill("apollo 11");
		await startYearInput.fill("1960");
		await endYearInput.fill("1970");
		await searchButton.click();

		await expect(page).toHaveURL(/.*yearStart=1960/);
		await expect(page).toHaveURL(/.*yearEnd=1970/);
	});

	test("should display an error message for an invalid year range", async ({
		page,
	}) => {
		const startYearInput = page.getByTestId("start-year");
		const endYearInput = page.getByTestId("end-year");
		const searchButton = page.getByTestId("search-button");

		await startYearInput.fill("1800");
		await endYearInput.fill("2030");
		await searchButton.click();

		const startYearError = page.getByTestId("startYear-error");
		const endYearError = page.getByTestId("endYear-error");

		await expect(startYearError).toBeVisible();
		await expect(endYearError).toBeVisible();
	});

	test("should display results for a valid search query", async ({ page }) => {
		const searchInput = page.getByTestId("search-input");
		const searchButton = page.getByTestId("search-button");

		await searchInput.fill("apollo 11");
		await searchButton.click();

		// Add assertions to check if the search results are displayed
		const resultsGrid = page.getByTestId("results-grid");
		await expect(resultsGrid).toBeVisible();

		// Check if there are some results
		const resultCards = resultsGrid.locator(".card");
		const count = await resultCards.count();
		expect(count).toBeGreaterThan(0);
	});
});
