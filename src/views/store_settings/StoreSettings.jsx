import React from 'react'
import CustomTab from '../../components/tab/CustomTab';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import { storeSettings } from '../../helper/mocks';
import StoreLimits from './StoreLimits';
import DeckLimits from './DeckLimits';

function StoreSettings() {

  const tabs =
    storeSettings.map((game) => {

      var verticalTabs = [
        { label: "Store Limits", Component: <StoreLimits storeLimits={game.storeLimits} gameName={game.gameName} /> },
        { label: "Deck Limits", Component: <DeckLimits deckLimits={game.deckLimits} gameName={game.gameName} /> },
      ];

      return {
        label: game.gameName,
        Component:
          <div className="tab-container">
            <div className="tab-header">
              <h1>Configurations</h1>
            </div>
            <CustomVerticalTab
              tabList={verticalTabs} />
          </div>
      }
    });

  return (
    <div className='container'>
      <CustomTab tabList={tabs} />
    </div>
  )
}

export default StoreSettings
