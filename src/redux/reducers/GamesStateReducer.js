import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const initialState = {
    companyId: "",
    gameList: []
};

export const GamesStateReducer = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setGameState: (state, action) => {
        const { companyId, gameList } = action.payload;

        state.companyId = companyId;
        state.gameList = gameList;

        const listGames = CryptoJS.AES.encrypt(JSON.stringify(action.payload), process.env.REACT_APP_SECRET_PASS).toString();
        localStorage.setItem("listGames", listGames)
    },
    removeGameState: (state) => {
        state.companyId = "";
        state.gameList = [];

        localStorage.removeItem("listGames")
    }
  }
});

export const { setGameState, removeGameState } = GamesStateReducer.actions;

export default GamesStateReducer.reducer;