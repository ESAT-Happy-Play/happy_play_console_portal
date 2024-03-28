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
            let gameIds = await GameService.getCompanyGameSettings(tokenObj.companyId).then((res) => {
                if(res.status) { return res.data.map(m => m.gameId); }
                else { return []; }
            });

            let allGames = await GameService.getAllGameList().then((res1) => {
                if(res1.status) {
                    let listOfCompanyGames = res1.data.filter((item) => gameIds.includes(item.id));

                    let objCompanies = [];
                    listOfCompanyGames.forEach(item => {
                        // push parent
                        if(item.gameMechanics.isParent) {
                            objCompanies.push({
                                gameName: item.name,
                                id: item.id,
                                child: [{ gameName: item.name, id: item.id }]
                            });
                        } else {
                        let parentCompany = objCompanies.filter(obj => obj.id === item.gameMechanics.parentId);
                            if (parentCompany.length > 0) {
                                let parentIndex = objCompanies.findIndex(obj => obj.id === parentCompany[0].id);

                                //Update child
                                objCompanies[parentIndex].child.push({ gameName: item.name, id: item.id });
                            }
                        }
                    });
                    return objCompanies;
                } else { return []; }
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