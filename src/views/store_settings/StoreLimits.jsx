import React, { useState } from 'react';
import { CustomCard } from '../../components/card/CustomCard';
import UpdateDialog from '../../components/Dialog/game/gameMechanics/UpdateDialog';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';

import { GameService } from "../../services";

const StoreLimits = ({ storeLimits, settingId, gameName }) => {

    const [isSuccess, setisSuccess] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    
    var keys = Object.keys(storeLimits);

    const additionalDetails = (e) => {
        switch (e) {
            case "maxUnitsPrice":
                return {
                    name: "maxUnitsPrice",
                    header: `Max quantity per unit in ${gameName}`,
                    description: `Max quantity per unit in ${gameName}`,
                    editModalHeader: "Update Max Quantity per Unit",
                    editModalDescription: `Max quantity per unit in ${gameName}`,
                    successMessage: "Max Quantity per Unit is updated and will be applied immediately"
                };
            case "maxUnits":
                return {
                    name: "maxUnits",
                    header: `Max units for ${gameName}`,
                    description: `Max units for ${gameName}`,
                    editModalHeader: `Update Max Units for ${gameName}`,
                    editModalDescription: `Number of ${gameName} units allowed to be bought at a time`,
                    successMessage: "Max Units is updated and will be applied immediately"
                };
            case "maxUnitsRegular":
                return {
                    name: "maxUnitsRegular",
                    header: `Max units for Regular`,
                    description: `Max units for Regular`,
                    editModalHeader: `Update Max Units for Regular`,
                    editModalDescription: `Number of Regular units allowed to be bought at a time`,
                    successMessage: "Max Units is updated and will be applied immediately"
                };
            case "maxUnitsPowerWin":
                return {
                    name: "maxUnitsPowerWin",
                    header: `Max units for Power Win`,
                    description: `Max units for Power Win`,
                    editModalHeader: `Update Max Units for Power Win`,
                    editModalDescription: `Number of Power Win units allowed to be bought at a time`,
                    successMessage: "Max Units is updated and will be applied immediately"
                };
            case "maxFavorites":
                return {
                    name: "maxFavorites",
                    header: `Max units for Favorites`,
                    description: `Number of combinations allowed to be favorited at a time for ${gameName}`,
                    editModalHeader: `Update Max Units for Favorites`,
                    editModalDescription: `Number of combinations allowed to be favorited at a time for ${gameName}`,
                    successMessage: "Max Units for favorites is updated and will be applied immediately"
                };
            case "hotCombinationsRange":
                return {
                    name: "hotCombinationsRange",
                    header: "Hot Combination Range",
                    description: `Bottom percantage from Limit per Combination in which the Hot Combinations will be taken from for ${gameName}`,
                    editModalHeader: " Update Hot Combination Range",
                    editModalDescription: `Bottom percantage from Limit per Combination in which the Hot Combinations will be taken from for ${gameName}`,
                    successMessage: "Hot Combination Range is updated and will be applied immediately"
                };
            case "hotCombinationsRefreshUnits":
                return {
                    name: "hotCombinationsRefreshUnits",
                    header: "Hot Combination Refresh Units",
                    description: `Number of hot combination units to be shown every refresh for ${gameName}`,
                    editModalHeader: " Update Hot Combination Refresh Units",
                    editModalDescription: `Number of hot combination units to be shown every refresh for ${gameName}`,
                    successMessage: "Hot Combination Refresh Units is updated and will be applied immediately"
                };
        }
    }


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

    const handleValidation = (value) => {
        setSelectedValue(value.target.value);

        if (value.target.value < 1)
            setValid(false);
        else
            setValid(true);
    }

    const handleUpdateSubmit = () => {
        storeLimits[selectedCard.name] = selectedValue;

        setisLoading(true);
        GameService.createStoreLimits(storeLimits, settingId).then((res) => {
            if(res) { setisSuccess(true); }
            else { toast.error(`Unable to update ${selectedCard.name} setting.`); }
            setisLoading(false);
        });
    }

    const handleUpdateCallback = () => {
        setisSuccess(false);
    }

    return (
        <div className="cards-container">
            {
                keys.map((e, i) => {
                    var x = additionalDetails(e);
                    return (
                        <CustomCard
                            header={x?.header}
                            body={<h2 className='card-header'>{ storeLimits[e] }</h2>}
                            description={x?.description}
                            action={() => handleEdit(storeLimits[e], x)}
                            key={i}
                        />)
                })
            }

            <UpdateDialog
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                onUpdate={handleUpdateSubmit}
                dialogCallback={handleUpdateCallback}
                isLoading={isLoading}
                isSuccess={isSuccess}
                title={selectedCard?.editModalHeader}
                isValid={valid}
                successMessage={selectedCard?.successMessage}
            >
                <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter', textAlign: 'center' }}>{selectedCard?.editModalDescription}</p>
                <TextField
                    size="small"
                    defaultValue={selectedValue}
                    variant="outlined"
                    fullWidth
                    error={!valid}
                    onChange={handleValidation}
                    helperText={!valid ? "Value should be atleast 1" : null}
                />
            </UpdateDialog>
        </div>
    )
}

export default StoreLimits;