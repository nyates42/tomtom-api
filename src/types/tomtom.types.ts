export interface ISearchResults {
	summary: Summary;
	results: IResult[];
}

interface Summary {
	query: string;
	queryType: string;
	queryTime: number;
	numResults: number;
	offset: number;
	totalResults: number;
	fuzzyLevel: number;
	geoBias: GeoBias;
	queryIntent: any[];
}

interface GeoBias {
	lat: number;
	lon: number;
}

export interface IResult {
	type: string;
	id: string;
	score: number;
	dist: number;
	info: string;
	poi: Poi;
	address: Address;
	position: Position;
	viewport: Viewport;
	entryPoints: EntryPoint[];
}

interface Poi {
	name: string;
	categorySet: CategorySet[];
	categories: string[];
	classifications: Classification[];
	phone?: string;
	url?: string;
	brands?: Brand[];
}

interface CategorySet {
	id: number;
}

interface Classification {
	code: string;
	names: Name[];
}

interface Name {
	nameLocale: string;
	name: string;
}

interface Brand {
	name: string;
}

interface Address {
	streetNumber?: string;
	streetName: string;
	municipalitySubdivision: string;
	municipality: string;
	countrySecondarySubdivision: string;
	countrySubdivision: string;
	countrySubdivisionName: string;
	countrySubdivisionCode: string;
	postalCode: string;
	countryCode: string;
	country: string;
	countryCodeISO3: string;
	freeformAddress: string;
	localName: string;
	neighbourhood?: string;
}

interface Position {
	lat: number;
	lon: number;
}

interface Viewport {
	topLeftPoint: TopLeftPoint;
	btmRightPoint: BtmRightPoint;
}

interface TopLeftPoint {
	lat: number;
	lon: number;
}

interface BtmRightPoint {
	lat: number;
	lon: number;
}

interface EntryPoint {
	type: string;
	position: Position2;
}

interface Position2 {
	lat: number;
	lon: number;
}

export interface IAutoCompleteDetails extends Address {
	placeId: string;
}

export interface IFuzzySearchParams {
	key: string;
	query?: string;
	typeahead?: boolean;
	limit?: number;
	ofs?: number;
	countrySet?: string;
	lat?: number;
	lon?: number;
	radius ?: number;
	topLeft?: string;
	btmRight?: string;
	geobias?: string;
	language?: string;
	extendedPostalCodesFor?: string;
	minFuzzyLevel?: number;
	maxFuzzyLevel?: number;
	idxSet?: string;
	categorySet?: string;
	brandSet?: string;
	connectorSet?: string;
	minPowerKW?: number;
	maxPowerKW?: number;
	fuelSet?: string;
	vehicleTypeSet?: string;
	view?: string;
	openingHours?: string;
	timeZone?: string;
	mapcodes?: string;
	relatedPois?: string;
	entityTypeSet?: string;
}