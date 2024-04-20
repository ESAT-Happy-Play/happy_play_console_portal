import { StoreExt } from "../helpers";
import { GameService } from "../../services";

import { store } from '../../redux/Store';
import { setGameState } from '../../redux/reducers/GamesStateReducer';

export const CompanyGameList = {
    getGameList: async (companyObjId = null, isRefresh = false) => {
        let gameList = StoreExt.getStore("listGames");
        let loginObj = StoreExt.getStore("auth");
        let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

        if (gameList !== null && !isRefresh) {
            return gameList;
        } else {
            let paramId = (companyObjId !== null) ? companyObjId : tokenObj.companyId;
            let allGames = await GameService.getCompanyGameDetail(paramId).then((res) => {
                if (res.status) { return res.data.sort((a, b) => a.id - b.id); }
                else { return []; }
            });

            store.dispatch(setGameState({
                companyId: paramId,
                gameList: allGames
            }));

            return {
                companyId: paramId,
                gameList: allGames
            };
        }
    }
}