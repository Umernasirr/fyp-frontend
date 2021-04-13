import Common from "../constants/Common";

export const setItemCounter = (payload) => (dispatch) => {
    dispatch({ type: Common.SET_ITEM_COUNTER, value: payload });
};