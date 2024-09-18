import axios, { AxiosResponse } from "axios";
import { ADDRESS_ERROR, API_KEY_ERROR } from "./constants/errors.constant";
import { BASE_URL, EXT, VERSION_NUMBER } from "./constants/tomtom.constant";
import { IFuzzySearchParams, ISearchResults } from "./types/tomtom.types";

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
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
		if (axios.isAxiosError(error) || error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw error;
		}
	}
}
