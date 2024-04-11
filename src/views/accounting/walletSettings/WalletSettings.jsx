import './walletSettings.scss';
import React, { useState } from 'react';
import CustomVerticalTab from '../../../components/tab/CustomVerticalTab';
import DepositTab from './DepositTab';
import { mockWalletSettings } from '../../../helper/mocks';
import WithdrawTab from './WithdrawTab';


const WalletSettings = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabs = [
        {
            label: "Deposit Settings",
            Component: <DepositTab settingsData={mockWalletSettings.depositSettings} />
        },
        {
            label: "Withdrawal Settings",
            Component: <WithdrawTab settingsData={mockWalletSettings.withdrawalSettings} />
        },
    ]

    return (
        <div className="home">
            <div className="header">
                <h1>{tabs[selectedTab].label}</h1>
            </div>
            <CustomVerticalTab changeEvent={setSelectedTab} tabList={tabs} />
        </div >

    )
}

export default WalletSettings;