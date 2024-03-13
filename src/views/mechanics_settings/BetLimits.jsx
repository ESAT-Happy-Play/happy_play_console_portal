import React, { useMemo, useState } from 'react';
import { CustomCard } from '../../components/card/CustomCard';

import './mechanicsSettings.scss';
import { FormatInteger } from '../../helper/Helpers';
import UpdateDialog from '../../components/Dialog/game/gameMechanics/UpdateDialog';
import { Box, IconButton, TextField } from '@mui/material';
import { COLORS } from '../../helper/colors';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const BetLimits = ({ subType }) => {

    const [currentBetAmount, setCurrentBetAmount] = useState(2100);
    const [currentPercentage, setCurrentPercentage] = useState(21.20);

    //Update Modal states
    const [selectedCard, setSelectedCard] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [valid, setValid] = useState(true);

    const handleEdit = (value, card) => {
        setOpenEdit(true);
        setValid(true);
        setSelectedCard(card);
        setSelectedValue(value);
    }

    const handleArrowValues = (increment) => {
        if (selectedValue + increment > 0)
            setSelectedValue(selectedValue + increment);
    }

    const handleValidation = (value) => {
        if (value.target.value < 1)
            setValid(false);
        else
            setValid(true);
    }

    const getDialogBody = () => {
        var body;
        switch (selectedCard) {
            case "Bet Entry Limit":
                body =
                    <>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Number of bets in a batch for {subType.subTypeName} game</p>
                        <Box display='flex' alignItems='center' justifyContent='center'>
                            <h2 style={{ margin: 0, textAlign: 'center', color: COLORS.violetMain, fontWeight: 600, fontSize: 40, fontFamily: 'Inter' }}>{selectedValue}</h2>
                            <Box display='flex' flexDirection='column'>
                                <IconButton sx={{ width: 18, height: 18 }} onClick={() => handleArrowValues(1)}><KeyboardArrowUpOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
                                <IconButton sx={{ width: 18, height: 18 }} onClick={() => handleArrowValues(-1)}><KeyboardArrowDownIcon sx={{ fontSize: 16 }} /></IconButton>
                            </Box>
                        </Box>
                    </>
                break;

            case "Bet Amount Limit":
                body =
                    <>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Limit of all {subType.subTypeName} bets per draw</p>
                        <TextField
                            size="small"
                            defaultValue={selectedValue}
                            variant="outlined"
                            fullWidth
                            error={!valid}
                            onChange={handleValidation}
                            helperText={!valid ? "Value should be atleast 1" : null}
                        /></>
                break;
            case "Unique Combination":
                body =
                    <>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Percentage limit of all {selectedCard} Pool bets for {subType.subTypeName}</p>
                        <TextField
                            size="small"
                            defaultValue={selectedValue}
                            variant="outlined"
                            fullWidth
                            error={!valid}
                            onChange={handleValidation}
                            helperText={!valid ? "Value should be atleast 1" : null}
                        /></>
                break;
        }
        return body;
    };

    return (
        <div className="cards-container">
            <CustomCard
                header="Bet Entry Limit"
                body={<h2 className='card-header'>{FormatInteger(subType.betEntryLimit)}</h2>}
                description="Number of bets in a batch"
                action={() => handleEdit(subType.betEntryLimit, "Bet Entry Limit")}
            />
            <CustomCard
                header="Bet Amount Limit"
                body={<h2 className='card-header'>{FormatInteger(subType.betAmountLimit)}</h2>}
                description={`Current Bet Amount: ${FormatInteger(currentBetAmount)}`}
                action={() => handleEdit(subType.betAmountLimit, "Bet Amount Limit")}
            />
            <CustomCard
                header="Unique Combination"
                body={<h2 className='card-header'>{FormatInteger(subType.uniqueCombination)}</h2>}
                description={`Current Percentage: ${currentPercentage}%`}
                action={() => handleEdit(subType.uniqueCombination, "Unique Combination")}
            />
            <UpdateDialog
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                title="Edit Limit for Combination"
                isValid={valid}
                successMessage={`${selectedCard} is updated and will be applied to all upcoming draws for ${subType.subTypeName}`}
            >
                {getDialogBody()}
            </UpdateDialog>
        </div >
    );
}

export default BetLimits;
