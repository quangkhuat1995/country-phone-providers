import DATA from '../constants/data.json';
import COUNTRIES from '../constants/countries.json';

const getCountryNameByCode = (code = 'AU') => {
	const data = COUNTRIES.find((country) => country.code === code);
	if (data) {
		return data.label;
	}
	return 'Not found country name';
};

const findCountryDataByCode = (code = 'AU') => {
	return DATA.filter((country) => country.country_code === code);
};

const mapProviderToValue = (countryData = []) => {
	// const mock = DATA.filter((country) => country.country_code === code)
	return countryData.reduce((acc, cur) => {
		if (!acc[cur.gateway]) {
			acc[cur.gateway] = {
				name: cur.gateway,
				volume: [cur.minimum_volume],
				number: [cur.cost_per_dedicated_number_per_month_usd],
				messageCount: [cur.outbound_sms_costs_usd],
			};
		} else {
			acc[cur.gateway].volume.push(cur.minimum_volume);
			acc[cur.gateway].number.push(cur.cost_per_dedicated_number_per_month_usd);
			acc[cur.gateway].messageCount.push(cur.outbound_sms_costs_usd);
		}
		return acc;
	}, {});
};

/**
 *
 *code: {
		name: 'New Zealand',
		providers: [
			{
				name: 'Plivo',
				volume: [0],
				number: [2.55],
				messageCount: [0.1],
			},
			{
				name: 'MessageMedia USA Inc.',
				volume: [0, 0, 167, 357],
				number: [18, 35, 95],
				messageCount: [0.1, 0.1, 0.08],
			},
		],
	}
 *
 */
export const getDataProvidersFromCountry = (code = 'AU') => {
	if (!code) return {};
	const countryData = findCountryDataByCode(code);
	const providerDict = mapProviderToValue(countryData);

	const providers = [];
	Object.keys(providerDict).forEach((key) => {
		providers.push(providerDict[key]);
	});
	return {
		name: getCountryNameByCode(code),
		providers,
	};
};

export const extractDollarSign = (str = '') => {
	str = String(str);
	return Number(str.trim().replace('$', ''));
};

export const convertToLocaleFormat = (num) => {
	return num.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		style: 'currency',
		currency: 'USD',
	});
};
