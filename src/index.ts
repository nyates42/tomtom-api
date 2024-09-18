import { ADDRESS_ERROR } from "./constants/errors.constant";
import { DEFAULT_COUNTRY, RESULT_LIMIT } from "./constants/tomtom.constant";
import { getPlaceAutocomplete } from "./maps-api";
import { IAutoCompleteDetails } from "./types/tomtom.types";

export async function getAutoCompleteDetails(
	address: string
): Promise<IAutoCompleteDetails[]> {
	if (!address) {
		throw new Error(ADDRESS_ERROR);
	}
	try {
		// Get autocomplete results
		const res = await getPlaceAutocomplete(address, {
			key: process.env.TOMTOM_API_KEY,
			limit: RESULT_LIMIT,
			countrySet: DEFAULT_COUNTRY,
		});
		// Loop over and get details and map results
		const addressData: IAutoCompleteDetails[] = res.map((result) => {
			return {
				placeId: result.id,
				...result.address,
			};
		});
		return addressData;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw error;
		}
	}
}
