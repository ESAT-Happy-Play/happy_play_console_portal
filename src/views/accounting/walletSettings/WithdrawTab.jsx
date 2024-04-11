import React, { useState } from 'react';
import { CustomCard } from '../../../components/card/CustomCard';

import UpdateDialog from '../../../components/Dialog/game/gameMechanics/UpdateDialog';
import { TextField } from '@mui/material';
import { FormatInteger } from '../../../helper/Helpers';

const WithdrawTab = ({ settingsData }) => {

    const [isSuccess, setisSuccess] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    const [selectedValue, setSelectedValue] = useState();
    const [selectedCard, setSelectedCard] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
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
        setisSuccess(true);

    }

    const handleUpdateCallback = () => {
        setisSuccess(false);
    }

    return (
        <div className="cards-container">
            <CustomCard
                header="Initial Minimum Withdrawal"
                body={<h2 className='card-header'>{FormatInteger(settingsData.initialMinimum)}</h2>}
                description="Minimum Amount to be Withdrawn for the first time"
                action={() => handleEdit(settingsData.initialMinimum, { label: "Initial Minimum Withdrawal", name: "initialMinimum", description: "Minimum Amount to be Withdrawn for the first time" })}
            />
            <CustomCard
                header="Subsequent Minimum Withdrawal"
                body={<h2 className='card-header'>{FormatInteger(settingsData.subsequentMinimum)}</h2>}
                description="Minimum Amount to be Withdrawn for subsequent withdrawal"
                action={() => handleEdit(settingsData.subsequentMinimum, { label: "Subsequent Minimum Withdrawal", name: "subsequentMinimum", description: "Minimum Amount to be Withdrawn for subsequent withdrawal" })}
            />
            <CustomCard
                header="Maximum Withdrawal at Once"
                body={<h2 className='card-header'>{FormatInteger(settingsData.maximumWithdrawal)}</h2>}
                description="Maximum amount to be withdrawn at a time"
                action={() => handleEdit(settingsData.maximumWithdrawal, { label: "Maximum Withdrawal at Once", name: "maximumWithdrawal", description: "Maximum amount to be withdrawn at a time" })}
            />
            <CustomCard
                header="Maximum Withdrawal per Day"
                body={<h2 className='card-header'>{FormatInteger(settingsData.maximumWithdrawal)}</h2>}
                description="Maximum amount to be withdrawn in a day"
                action={() => handleEdit(settingsData.dailyMaximum, { label: "Maximum Withdrawal at Once", name: "maximumWithdrawal", description: "Maximum amount to be withdrawn in a day" })}
            />
            <UpdateDialog
                isOpen={openEdit}
                onUpdate={handleUpdateSubmit}
                dialogCallback={handleUpdateCallback}
                isLoading={isLoading}
                isSuccess={isSuccess}
                onClose={() => setOpenEdit(false)}
                title={`Edit ${selectedCard?.label}`}
                isValid={valid}
                successMessage={`${selectedCard?.label} is updated and will be applied immediately`}
            >
                <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter' }}>
                    {selectedCard?.description}
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

export default WithdrawTab;