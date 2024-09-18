import { describe } from "@jest/globals";
import { config } from "dotenv";
import { getAutoCompleteDetails } from "../src";
import { ADDRESS_ERROR, API_KEY_ERROR } from "../src/constants/errors.constant";
import {
	DEFAULT_COUNTRY,
	RESULT_LIMIT,
} from "../src/constants/tomtom.constant";
import { getPlaceAutocomplete } from "../src/maps-api";

config();

// These are end-to-end tests and need an api key
describe("Tomtom Places E2E Tests", () => {
	describe("getAutoCompleteDetails", () => {
		it("returns a promise", () => {
			const res = getAutoCompleteDetails("Charlotte Street");
			expect(res).toBeInstanceOf(Promise);
		});

		it("can fetch from the autocomplete api", async () => {
			const res = await getAutoCompleteDetails("Charlotte Street");
			// Results should not exceed the API limit
			expect(res.length).toBeLessThanOrEqual(RESULT_LIMIT);
			const firstRes = res[0];
			expect(firstRes).toHaveProperty("placeId");
			// Street number does not always exist on response object
			if (firstRes.streetNumber) {
				expect(firstRes).toHaveProperty("streetNumber");
			}
			expect(firstRes).toHaveProperty("countryCode");
			expect(firstRes).toHaveProperty("country");
			expect(firstRes).toHaveProperty("freeformAddress");
			expect(firstRes).toHaveProperty("municipality");
		});

		it("should only allow Australian addresses to be returned", async () => {
			const res = await getAutoCompleteDetails("Charlotte Street");
			res.forEach((el) => {
				// check each element of the array individually
				expect(el).toEqual(
					expect.objectContaining({ countryCode: DEFAULT_COUNTRY })
				);
			});
		});

		it("should handle empty address", async () => {
			expect(getAutoCompleteDetails("")).rejects.toThrow(ADDRESS_ERROR);
		});
	});

	describe("getPlaceAutocomplete", () => {
		it("handles no results", async () => {
			const res = await getPlaceAutocomplete("jkhgjerghjreg", {
				key: process.env.TOMTOM_API_KEY,
			});
			expect(res).toStrictEqual([]);
		});

		it("handles error", async () => {
			expect(
				getPlaceAutocomplete("", { key: process.env.TOMTOM_API_KEY })
			).rejects.toThrow();
		});

		it("should handle empty env var", async () => {
			expect(
				getPlaceAutocomplete("Charlotte Street", { key: "" })
			).rejects.toThrow(API_KEY_ERROR);
		});
	});
});
