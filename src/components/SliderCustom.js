import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function SliderCustom(props) {
	const { marks, min, max, ...rest } = props;
	return (
		<Box sx={{ width: 300 }}>
			<Slider
				aria-label="Custom marks"
				min={min}
				max={max}
				defaultValue={1}
				step={1}
				valueLabelDisplay="auto"
				marks={marks}
				{...rest}
			/>
		</Box>
	);
}

SliderCustom.defaultProps = {
	marks: [],
	min: 1,
	max: 11000,
};

SliderCustom.propTypes = {
	marks: PropTypes.array,
	min: PropTypes.number,
	max: PropTypes.number,
};

export default SliderCustom;
