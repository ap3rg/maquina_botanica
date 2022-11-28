import { store } from "../store";

export const switchMode = () => {
    store.dispatch({
        type: 'SWITCH'
    })
};

export const selectBook = (book) => {
    store.dispatch({
        type: 'APPEND',
        payload: book
    });
};

export const removeBook = (book) => {
    store.dispatch({
        type: 'POP',
        payload: book
    });
};

export const newComposition = (layerObjs) => {
    store.dispatch({
        type: 'NEW_COMPOSITION',
        payload: layerObjs
    });
}