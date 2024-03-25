import React, { useMemo, useState } from 'react';
import { CustomCard } from '../../components/card/CustomCard';

import './mechanicsSettings.scss';
import UpdateDialog from '../../components/Dialog/game/gameMechanics/UpdateDialog';
import { TextField } from '@mui/material';
import { FormatInteger } from '../../helper/Helpers';
import { toast } from 'react-toastify';

import { GameService } from "../../services";

const BetPrice = ({ betPriceData, settingId, subType }) => {
    const [isSuccess, setisSuccess] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    const [selectedValue, setSelectedValue] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [valid, setValid] = useState(true);
    const priceType = subType.betPriceLimit ? "Bet Price Limit" : "Bet Price";

    const handleEdit = (value) => {
        setOpenEdit(true);
        setValid(true);
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
        betPriceData["amount"] = selectedValue;

        setisLoading(true);
        GameService.createBetPrice(betPriceData, settingId).then((res) => {
            if(res) { setisSuccess(true); }
            else { toast.error(`Unable to update Bet Price setting.`); }
            setisLoading(false);
        });
    }

    const handleUpdateCallback = () => {
        setisSuccess(false);
    }

    return (
        <div className="cards-container">
            {
                (betPriceData !== null) ?
                <>
                    {priceType == "Bet Price Limit" ?
                        <CustomCard
                            header="Bet Price Limit"
                            body={<h2 className='card-header'>{FormatInteger(betPriceData.betPriceLimit)}</h2>}
                            description="The maximum bet amount per combination"
                            action={() => handleEdit(betPriceData.betPriceLimit)}
                        />
                        :
                        <CustomCard
                            header="Bet Price"
                            body={<h2 className='card-header'>{FormatInteger(betPriceData.amount)}</h2>}
                            description="Price amount per bet"
                            action={() => handleEdit(betPriceData.amount)}
                        />
                    }
                    <UpdateDialog
                        isOpen={openEdit}
                        onUpdate={handleUpdateSubmit}
                        dialogCallback={handleUpdateCallback}
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        onClose={() => setOpenEdit(false)}
                        title={`Edit ${priceType}`}
                        isValid={valid}
                        successMessage={`${priceType} is updated and will be applied to all upcoming draws for ${subType.gameName}`}
                    >
                        <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter' }}>
                            {subType.betPriceLimit ?
                                "Maximum bet amount per combination"
                                :
                                `Fixed bet price for ${subType.gameName}`
                            }
                        </p>
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
                </> : <div style={{ padding: '25px'}}>Loading...Please wait.</div>
            }
        </div>
    );
}

export default BetPrice;
