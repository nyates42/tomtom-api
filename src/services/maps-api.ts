import axios, { AxiosResponse } from "axios";
import { ADDRESS_ERROR, API_KEY_ERROR } from "../constants/errors.constant";
import { BASE_URL, EXT, VERSION_NUMBER } from "../constants/tomtom.constant";
import {
	IFuzzySearchParams,
	ISearchResults,
	ITomTomError,
} from "../types/tomtom.types";

export class TomTomAPIError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "TomTomAPIError";
	}
}

/**
 * Performs a fuzzy search on the TomTom Search API.
 *
 * @example
 * ```typescript
 * fuzzySearch('Pizza', { lat: 52.3765, lon: 4.908, limit: 5 })
 *   .then(results => console.log(results))
 *   .catch(error => console.error(error));
 * ```
 * @see {@link https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search}
 */
export async function getPlaceAutocomplete(
	address: string,
	searchOptions: IFuzzySearchParams
) {
	if (!address) {
		throw new Error(ADDRESS_ERROR);
	}
	if (!searchOptions.key) {
		throw new Error(API_KEY_ERROR);
	}

	try {
		const autocomplete: AxiosResponse<ISearchResults> = await axios.get(
			`${BASE_URL}/${VERSION_NUMBER}/search/${address}.${EXT}`,
			{ params: searchOptions }
		);
		return autocomplete.data.results;
	} catch (error) {
		// Would normally log to external telemetry service
		if (axios.isAxiosError(error)) {
			if (error.response?.data) {
				const tomtomError: ITomTomError = error.response.data;
				throw new TomTomAPIError(tomtomError.detailedError.message);
			} else {
				throw new Error(error.message);
			}
		} else if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw error;
		}
	}
}
