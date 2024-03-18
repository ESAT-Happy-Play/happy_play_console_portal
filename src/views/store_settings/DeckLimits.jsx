import React, { useState } from 'react';
import { CustomCard } from '../../components/card/CustomCard';
import UpdateDialog from '../../components/Dialog/game/gameMechanics/UpdateDialog';
import { Box, IconButton, TextField } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { COLORS } from '../../helper/colors';

const DeckLimits = ({ deckLimits, gameName }) => {

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

    const getDialogBody = () => {
        var body;
        switch (selectedCard) {
            case "Deck Betting Open Time":
                body =
                    <>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>{`Open deck betting on the first [n] minutes of the draw for ${gameName}`}</p>
                        <Box display='flex' alignItems='center' justifyContent='center'>
                            <h2 style={{ margin: 0, textAlign: 'center', color: COLORS.violetMain, fontWeight: 600, fontSize: 40, fontFamily: 'Inter' }}>{selectedValue} min</h2>
                            <Box display='flex' flexDirection='column'>
                                <IconButton sx={{ width: 18, height: 18 }} onClick={() => handleArrowValues(1)}><KeyboardArrowUpOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
                                <IconButton sx={{ width: 18, height: 18 }} onClick={() => handleArrowValues(-1)}><KeyboardArrowDownIcon sx={{ fontSize: 16 }} /></IconButton>
                            </Box>
                        </Box>
                    </>
                break;

            case "Max Deck Units":
                body =
                    <>
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>{`Number of units that can be stored in the deck for ${gameName}`}</p>
                        <Box display='flex' alignItems='center' justifyContent='center'>
                            <h2 style={{ margin: 0, textAlign: 'center', color: COLORS.violetMain, fontWeight: 600, fontSize: 40, fontFamily: 'Inter' }}>{selectedValue}</h2>
                            <Box display='flex' flexDirection='column'>
                                <IconButton sx={{ width: 18, height: 18 }} onClick={() => handleArrowValues(1)}><KeyboardArrowUpOutlinedIcon sx={{ fontSize: 16 }} /></IconButton>
                                <IconButton sx={{ width: 18, height: 18 }} onClick={() => handleArrowValues(-1)}><KeyboardArrowDownIcon sx={{ fontSize: 16 }} /></IconButton>
                            </Box>
                        </Box>
                    </>
                break;

        }
        return body;
    }

    return (
        <div className="cards-container">
            <CustomCard
                header="Deck Betting Open Time"
                body={<h2 className='card-header'>{deckLimits?.deckOpenTime} min</h2>}
                description={`Open deck betting on the first [n] minutes of the draw for ${gameName}`}
                action={() => handleEdit(deckLimits?.deckOpenTime, "Deck Betting Open Time")}
            />
            <CustomCard
                header="Max Deck Units"
                body={<h2 className='card-header'>{deckLimits?.maxDeckUnits}</h2>}
                description={`Number of units that can be stored in the deck for ${gameName}`}
                action={() => handleEdit(deckLimits?.maxDeckUnits, "Max Deck Units")}
            />

            <UpdateDialog
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                title={selectedCard}
                isValid={valid}
                successMessage={`${selectedCard} for ${gameName} is updated and will be applied immediately`}
            >
                {getDialogBody()}
            </UpdateDialog>
        </div>
    )
}

export default DeckLimits;