import React, { useMemo, useState, useEffect } from 'react';
import { CustomCard } from '../../components/card/CustomCard';
import { toast } from 'react-toastify';

import './mechanicsSettings.scss';
import { FormatInteger } from '../../helper/Helpers';
import UpdateDialog from '../../components/Dialog/game/gameMechanics/UpdateDialog';
import { Box, IconButton, TextField } from '@mui/material';
import { COLORS } from '../../helper/colors';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

import { GameService } from "../../services";
const BetLimits = ({ bitLimitData, settingId, subType }) => {

    const [isSuccess, setisSuccess] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    const [currentBetAmount, setCurrentBetAmount] = useState(2100);
    const [currentPercentage, setCurrentPercentage] = useState(21.20);

    //Update Modal states
    const [selectedCard, setSelectedCard] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0);
    const [valid, setValid] = useState(true);

    const handleEdit = (value, card) => {
        setOpenEdit(true);
        setValid(true);
        setSelectedCard(card);
        setSelectedValue(value);
    }

    const handleArrowValues = (increment) => {
        if (selectedValue + increment > 0) {
            setSelectedValue(parseInt(selectedValue) + parseInt(increment));
        }
    }

    const handleValidation = (value) => {
        setSelectedValue(value.target.value);

        if (value.target.value < 1)
            setValid(false);
        else
            setValid(true);
    }

    const handleUpdateSubmit = () => {
        console.log(selectedCard);
        bitLimitData[selectedCard.name] = selectedValue;
        console.log(bitLimitData);

        setisLoading(true);
        GameService.createBetLimit(bitLimitData, settingId).then((res) => {
            if(res) { setisSuccess(true); }
            else { toast.error(`Unable to update ${selectedCard.name} setting.`); }
            setisLoading(false);
        });
    }

    const handleUpdateCallback = () => {
        setisSuccess(false);
    }

    const getDialogBody = () => {
        var body;
        var cardDesc = (selectedCard !== null) ? selectedCard.description : "";
        switch (cardDesc) {
            case "Bet Entry Limit":
                body =
                    <>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Number of bets in a batch for {subType.gameName} game</p>
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
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Limit of all {subType.gameName} bets per draw</p>
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
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Percentage limit of all {(selectedCard !== null) ? selectedCard.description : ""} Pool bets for {subType.gameName}</p>
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
            {
                (bitLimitData !== null) ?
                <>
                    <CustomCard
                        header="Bet Entry Limit"
                        body={<h2 className='card-header'>{ FormatInteger(bitLimitData.betEntryLimit) }</h2>}
                        description="Number of bets in a batch"
                        action={() => handleEdit(FormatInteger(bitLimitData.betEntryLimit), {name:"betEntryLimit" , description: "Bet Entry Limit"})}
                    />
                    <CustomCard
                        header="Bet Amount Limit"
                        body={<h2 className='card-header'>{FormatInteger(bitLimitData.betAmountLimit) }</h2>}
                        description={`Current Bet Amount: ${FormatInteger(currentBetAmount)}`}
                        action={() => handleEdit(FormatInteger(bitLimitData.betAmountLimit), {name:"betAmountLimit" , description: "Bet Amount Limit"})}
                    />
                    <CustomCard
                        header="Unique Combination"
                        body={<h2 className='card-header'>{FormatInteger(bitLimitData.uniqueCombination) }</h2>}
                        description={`Current Percentage: ${currentPercentage}%`}
                        action={() => handleEdit(FormatInteger(bitLimitData.uniqueCombination), {name:"uniqueCombination" , description: "Unique Combination"})}
                    />
                    <UpdateDialog
                        isOpen={openEdit}
                        onUpdate={handleUpdateSubmit}
                        dialogCallback={handleUpdateCallback}
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        onClose={() => setOpenEdit(false)}
                        title="Edit Limit for Combination"
                        isValid={valid}
                        successMessage={`${(selectedCard !== null) ? selectedCard.description : ""} is updated and will be applied to all upcoming draws for ${subType.gameName}`}
                    >
                        {getDialogBody()}
                    </UpdateDialog>
                </> : <div style={{padding:'25px'}}>Loading...Please wait.</div>
            }
        </div >
    );
}

export default BetLimits;
