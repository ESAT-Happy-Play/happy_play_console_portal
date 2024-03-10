import React, { useMemo, useState } from 'react';
import { CustomCard } from '../../components/card/CustomCard';

import './mechanicsSettings.scss';
import UpdateDialog from '../../components/Dialog/game/gameMechanics/UpdateDialog';
import { TextField } from '@mui/material';

const BetPrice = ({ subType }) => {

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
        if (value.target.value < 1)
            setValid(false);
        else
            setValid(true);
    }

    return (
        <div className="cards-container">
            {priceType == "Bet Price Limit" ?
                <CustomCard
                    header="Bet Price Limit"
                    body={<h2 className='card-header'>{subType.betPriceLimit}</h2>}
                    description="The maximum bet amount per combination"
                    action={() => handleEdit(subType.betPriceLimit)}
                />
                :
                <CustomCard
                    header="Bet Price"
                    body={<h2 className='card-header'>{subType.betPrice}</h2>}
                    description="Price amount per bet"
                    action={() => handleEdit(subType.betPrice)}
                />
            }
            <UpdateDialog
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                title={`Edit ${priceType}`}
                isValid={valid}
                successMessage={`${priceType} is updated and will be applied to all upcoming draws for ${subType.subTypeName}`}
            >
                <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter' }}>
                    {subType.betPriceLimit ?
                        "Maximum bet amount per combination"
                        :
                        `Fixed bet price for ${subType.subTypeName}`
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
        </div>
    );
}

export default BetPrice;
