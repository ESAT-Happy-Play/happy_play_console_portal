import React, { useState } from 'react';
import { CustomCard } from '../../components/card/CustomCard';

import './mechanicsSettings.scss';
import { IOSSwitch } from '../../components/switch/IOSSwitch';
import { FormatInteger } from '../../helper/Helpers';
import UpdateDialog from '../../components/Dialog/game/gameMechanics/UpdateDialog';
import { Box, IconButton, TextField } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { COLORS } from '../../helper/colors';

const PrizeCalculations = ({ subType }) => {
    var tabs = [];
    var keys = Object.keys(subType);


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
    const handleCeilValidation = (value) => {
        if (value.target.value < subType.prizeFloor)
            setValid(false);
        else
            setValid(true);
    }

    if (keys.includes("incrementAmount"))
        tabs.push(
            <CustomCard
                header="Increment Amount in %"
                body={<h2 className='card-header'>{subType.incrementAmount}</h2>}
                description="Percentage of bets to be added to the Prize"
                action={() => handleEdit(subType.incrementAmount, "Increment Amount")}
            />);

    if (keys.includes("prizeFloor"))
        tabs.push(
            <CustomCard
                header="Prize Floor"
                body={<h2 className='card-header'>{FormatInteger(subType.prizeFloor)}</h2>}
                description="Starting Prize Pool"
                action={() => handleEdit(subType.prizeFloor, "Prize Floor")}
            />);

    if (keys.includes("prizeCeiling"))
        tabs.push(
            <CustomCard
                header="Prize Ceiling"
                body={<h2 className='card-header'>{FormatInteger(subType.prizeCeiling)}</h2>}
                description="Maximum Prize Pool"
                action={() => handleEdit(subType.prizeCeiling, "Prize Ceiling")}
            />);

    if (keys.includes("consecutiveWins"))
        tabs.push(
            <CustomCard
                header="Consecutive Wins"
                body={<h2 className='card-header'>{subType.consecutiveWins}</h2>}
                description="Winning condition for achieving the prize."
                action={() => handleEdit(subType.consecutiveWins, "Consecutive Wins")}
            />);

    if (keys.includes("winningMultiplier"))
        tabs.push(
            <CustomCard
                header="Winning Multiplier"
                body={<h2 className='card-header'>{FormatInteger(subType.winningMultiplier)}</h2>}
                description="Equivalent winner prize per 1 peso"
                action={() => handleEdit(subType.winningMultiplier, "Winning Multiplier")}
            />);

    if (keys.includes("haveQuasi"))
        tabs.push(
            <CustomCard
                header="Enable Quasi Winnings"
                body={<IOSSwitch checked={subType.haveQuasi} />}
                description="The maximum bet amount per combination"
                action={() => handleEdit(subType.haveQuasi, "Quasi Winnings")}
            />);


    const getDialogBody = () => {

        var body;
        switch (selectedCard) {
            case "Consecutive Wins":
                body =
                    <>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Consecutive wins instance before achieving the prize</p>
                        <Box display='flex' alignItems='center' justifyContent='center'>
                            <h2 style={{ margin: 0, textAlign: 'center', color: COLORS.violetMain, fontWeight: 600, fontSize: 40, fontFamily: 'Inter' }}>{selectedValue}</h2>
                            <Box display='flex' flexDirection='column'>
                                <IconButton sx={{ width: 18, height: 18 }} onClick={() => handleArrowValues(1)}><KeyboardArrowUpOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
                                <IconButton sx={{ width: 18, height: 18 }} onClick={() => handleArrowValues(-1)}><KeyboardArrowDownIcon sx={{ fontSize: 16 }} /></IconButton>
                            </Box>
                        </Box>
                    </>
                break;

            case "Prize Floor":
                body =
                    <>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Starting Prize Amount for {subType.subTypeName}</p>
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

            case "Prize Ceiling":
                body =
                    <>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Max Prize Amount for {subType.subTypeName}</p>
                        <TextField
                            size="small"
                            defaultValue={selectedValue}
                            variant="outlined"
                            fullWidth
                            error={!valid}
                            onChange={handleCeilValidation}
                            helperText={!valid ? "Value should be greater than Prize Floor" : null}
                        /></>
                break;

            case "Increment Amount":
                body =
                    <>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Percentage of bets added to prize</p>
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

            case "Winning Multiplier":
                body =
                    <>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Equivalent winning multiplier for the first 2 wins</p>
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

            case "Quasi Winnings":
                body =
                    <Box display='flex' flexDirection='column' alignItems='center'>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Enable/Disable quasi type of winnings</p>
                        <IOSSwitch checked={selectedValue} onChange={() => setSelectedValue(!selectedValue)} />
                    </Box>
                break;

            default:
                body = <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>Info not provided, please try again later</p>
        }
        return body;
    }


    return (
        <div className="cards-container">
            {tabs}

            <UpdateDialog
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                title="Edit Limit for Combination"
                isValid={valid}
                successMessage={`${selectedCard} is updated and will be applied to all upcoming draws for ${subType.subTypeName}`}
            >
                {getDialogBody()}
            </UpdateDialog>
        </div>
    );
}

export default PrizeCalculations;