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

	const rows = React.useMemo(() => {
		if (!tableData?.providers?.length) return [];
		const results = tableData?.providers.map((provider) => {
			const data = provider.volume.filter((num) => num <= numberMessages);
			const meetConditionVolumeIndex = data.length ? data.length - 1 : 0;
			const costForMessage = extractDollarSign(provider.messageCount[meetConditionVolumeIndex]) * numberMessages;
			const costForNumber = extractDollarSign(provider.number[meetConditionVolumeIndex]) * numbers;
			const totalCost = costForMessage + costForNumber;
			return {
				...provider,
				providerName: provider.name,
				countryName: tableData.name,
				costForNumber,
				costForMessage,
				totalCost,
			};
		});
		return results.sort((a, b) => a.totalCost - b.totalCost);
	}, [tableData, numbers, numberMessages]);

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
						<StyledTableHeadCell className="bold" align="right">
							Total Cost
						</StyledTableHeadCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows?.length ? (
						rows.map((row, idx) => {
							return (
								<TableRow key={`${row.name}-${idx}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell scope="row">{row.providerName}</TableCell>
									<TableCell scope="row">{row.countryName}</TableCell>
									<TableCell align="right">{convertToLocaleFormat(row.costForNumber)}</TableCell>
									<TableCell align="right">{convertToLocaleFormat(row.costForMessage)}</TableCell>
									<TableCell align="right">{convertToLocaleFormat(row.totalCost)}</TableCell>
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
