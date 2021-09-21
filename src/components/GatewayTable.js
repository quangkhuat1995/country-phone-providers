import * as React from 'react';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { convertToLocaleFormat, extractDollarSign } from '../services';

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		fontWeight: 700,
	},
}));

function GatewayTable(props) {
	const { tableData, numbers, numberMessages } = props;
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableHeadCell className="bold">Gateway</StyledTableHeadCell>
						<StyledTableHeadCell className="bold" align="right">
							Country
						</StyledTableHeadCell>
						<StyledTableHeadCell className="bold" align="right">
							Cost for {numbers} numbers
						</StyledTableHeadCell>
						<StyledTableHeadCell className="bold" align="right">
							Cost for {numberMessages} messages
						</StyledTableHeadCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tableData?.providers?.length ? (
						tableData?.providers.map((row, idx) => {
							const data = row.volume.filter((num) => num <= numberMessages);
							const meetConditionVolumeIndex = data.length ? data.length - 1 : 0;
							const costForMessage = extractDollarSign(row.messageCount[meetConditionVolumeIndex]) * numberMessages;
							const costForNumber = extractDollarSign(row.number[meetConditionVolumeIndex]) * numbers;
							return (
								<TableRow key={`${row.name}-${idx}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell scope="row">{row.name}</TableCell>
									<TableCell scope="row">{tableData.name}</TableCell>
									<TableCell align="right">{convertToLocaleFormat(costForNumber)}</TableCell>
									<TableCell align="right">{convertToLocaleFormat(costForMessage)}</TableCell>
								</TableRow>
							);
						})
					) : (
						<TableRow>
							<TableCell colSpan={4} className="no-data" component="th" scope="row">
								No data found
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

GatewayTable.defaultProps = {
	numbers: 0,
	numberMessages: 0,
	tableData: {
		name: '',
		providers: [],
	},
};

GatewayTable.propTypes = {
	tableData: PropTypes.shape({
		name: PropTypes.string.isRequired,
		providers: PropTypes.array.isRequired,
	}),
	numbers: PropTypes.number,
	numberMessages: PropTypes.number,
};

export default GatewayTable;
