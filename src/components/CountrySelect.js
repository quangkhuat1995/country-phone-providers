import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import countries from '../constants/countries.json';

function CountrySelect(props) {
	return (
		<Autocomplete
			sx={{ width: 300 }}
			options={countries}
			autoHighlight
			getOptionLabel={(option) => option.label || ''}
			renderOption={(props, option) => {
				return (
					<Box component="li" {...props}>
						{option.label} ({option.code})
					</Box>
				);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Choose a country"
					inputProps={{
						...params.inputProps,
						autoComplete: 'new-password', // disable autocomplete and autofill
					}}
				/>
			)}
			value={props.countryValue}
			onChange={props.onChange}
		/>
	);
}

export default React.memo(CountrySelect);
