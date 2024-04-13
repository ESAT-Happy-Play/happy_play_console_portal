import { StoreExt } from "../helpers";
import { GameService } from "../../services";

import { store } from '../../redux/Store';
import { setGameState } from '../../redux/reducers/GamesStateReducer';

export const CompanyGameList = {
    getGameList: async () => {
        let gameList = StoreExt.getStore("listGames");
        let loginObj = StoreExt.getStore("auth");
        let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

        if (gameList !== null) {
            return gameList;
        } else {
            let allGames = await GameService.getCompanyGameDetail(tokenObj.companyId).then((res) => {
                if (res.status) { return res.data.sort((a, b) => a.id - b.id); }
                else { return []; }
            });

            store.dispatch(setGameState({
                companyId: tokenObj.companyId,
                gameList: allGames
            }));

            return {
                companyId: tokenObj.companyId,
                gameList: allGames
            };
        }
    }
}