import { useCallback, useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CountrySelect from './components/CountrySelect';
import SliderCustom from './components/SliderCustom';
import GatewayTable from './components/GatewayTable';
import './App.css';
import { getDataProvidersFromCountry } from './services';

const createMarks = (...args) => {
	return args.map((number) => {
		number = Number(number);
		return { value: number, label: `${number}` };
	});
};

function App() {
	const marksNumbers = useMemo(() => createMarks(1, 5, 10, 15, 20), []);
	const marksMessages = useMemo(() => createMarks(100, 1900, 3500, 5200, 7300, 8900, 11000), []);
	const [numbers, setNumbers] = useState(1);
	const [numberMessages, setNumberMessages] = useState(100);
	const [tableData, setTableData] = useState(null);
	const [countryValue, setCountryValue] = useState(null);

	const handleChangeNumbers = useCallback((e, newValue) => {
		setNumbers(newValue);
	}, []);

	const handleChangeNumberMessages = useCallback((e, newValue) => {
		setNumberMessages(newValue);
	}, []);

	const handleChangeCountry = useCallback((e, newValue) => {
		if (newValue?.code) {
			setCountryValue(newValue);
			const tmpTableData = getDataProvidersFromCountry(newValue.code);
			setTableData(tmpTableData);
		} else {
			setCountryValue(null);
		}
	}, []);

	useEffect(() => {
		fetch('https://extreme-ip-lookup.com/json/')
			.then((data) => data.json())
			.then((result) => {
				setCountryValue({ code: result.countryCode, label: result.country });
				const tmpTableData = getDataProvidersFromCountry(result.countryCode);
				setTableData(tmpTableData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="App">
			<Grid container rowSpacing={4}>
				<Grid item xs={12}>
					<Typography>What country will you send and receive SMS in?</Typography>
					<CountrySelect onChange={handleChangeCountry} countryValue={countryValue} />
				</Grid>
				<Grid item xs={12}>
					<Typography>How many phone numbers do you need?</Typography>
					<SliderCustom marks={marksNumbers} max={20} onChangeCommitted={handleChangeNumbers} />
				</Grid>
				<Grid item xs={12}>
					<Typography>How many messages will you send per month?</Typography>
					<SliderCustom marks={marksMessages} min={100} onChangeCommitted={handleChangeNumberMessages} />
				</Grid>
				<Grid item xs={12}>
					<GatewayTable tableData={tableData} numbers={numbers} numberMessages={numberMessages} />
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
