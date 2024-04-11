import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const GameService = {
    getAllGameList: async () => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/game/?includeIsDeleted=false`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    },
    getCompanyGameDetail: async (companyId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/game/mechanics/${companyId}`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    },
    getCompanyGameSettings: async (companyId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-settings?companyId=${companyId}`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    },
    getBetLimits: async (companySettingId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-settings/${companySettingId}/bet-limits`)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
    createBetLimit: async (data, companySettingId) => {
        // {
        //     betEntryLimit: 0,
        //     betAmountLimit: 0,
        //     uniqueCombination: 0
        // }
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-settings/${companySettingId}/bet-limits`, data)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
    getPrizeCalculations: async (companySettingId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-settings/${companySettingId}/prize-calculation`)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
    createPrizeCalculation: async (data, companySettingId) => {
        // {
        //     pooling: {
        //         prizeFloor: 0,
        //         prizeCeiling: 0,
        //         incrementAmount: 0
        //     },
        //     enableQuasi: true,
        //     consecutiveWins: 0,
        //     winningMultiplier: {
        //         minAmount: 0,
        //         winPerBet: 0
        //     }
        // }
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-settings/${companySettingId}/prize-calculation`, data)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
    getBetPrices: async (companySettingId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-settings/${companySettingId}/bet-price`)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
    createBetPrice: async (data, companySettingId) => {
        // {
        //     isFixed: true,
        //     amount: 0
        // }
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-settings/${companySettingId}/bet-price`, data)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
    getStoreLimits: async (companySettingId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-settings/${companySettingId}/store-limits`)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
    createStoreLimits: async (data, companySettingId) => {
        // {
        //     maxUnitsPrice: 0,
        //     maxUnits: 0,
        //     maxFavorites: 0,
        //     hotCombinationsRange: 0,
        //     hotCombinationsRefreshUnits: 0
        // }
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-settings/${companySettingId}/store-limits`, data)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
    getDeckLimits: async (companySettingId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-settings/${companySettingId}/deck-limits`)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
    createDeckLimits: async (data, companySettingId) => {
        // {
        //     deckOpenTime: 0,
        //     maxDeckUnits: 0
        // }
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-settings/${companySettingId}/deck-limits`, data)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
    getCombinationLimit: async (data) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/gamelimit/combinations`, data)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
    getDrawBacklogs: async (companyGameId, count = 15) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/game/company-game/${companyGameId}/draw/backlogs/${count}`)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    },
}