import React from 'react';
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select} from "@mui/material";
import {useDispatch} from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const TypesOfPokemon = ({types, selectedType, setSelectedType}) => {
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        dispatch(setSelectedType(
            typeof value === 'string' ? value.split(',') : value,
        ));
    };

    return (
        <div>
            <FormControl sx={{ width: 300,}}>
                <InputLabel id="demo-multiple-checkbox-label">Types</InputLabel>
                <Select
                    multiple
                    value={selectedType}
                    onChange={handleChange}
                    input={<OutlinedInput label="Types"/>}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {types.map((type) => (
                        <MenuItem key={type} value={type}>
                            <Checkbox checked={selectedType.indexOf(type) > -1}/>
                            <ListItemText primary={type}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default TypesOfPokemon;