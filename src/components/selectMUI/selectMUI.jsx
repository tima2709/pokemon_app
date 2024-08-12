import React from 'react';
import {Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";

const SelectMUI = ({pageSize, setPageSize}) => {

    return (
        <Box sx={{ minWidth: 220}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Cards per page</InputLabel>
                <Select
                    value={pageSize}
                    label="Cards per page"
                    onChange={setPageSize}
                    input={<OutlinedInput label="Cards per page"/>}
                >
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={52}>52</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectMUI;