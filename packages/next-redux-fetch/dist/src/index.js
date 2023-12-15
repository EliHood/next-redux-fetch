import { configureStore, } from "@reduxjs/toolkit";
import { memoize } from "lodash";
export function createReduxFetch(newOptions) {
    const store = configureStore;
    const thunkActions = newOptions === null || newOptions === void 0 ? void 0 : newOptions.thunkActions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newFuncObj = Object.keys(thunkActions).reduce((acc, fn) => {
        const memo = memoize === null || memoize === void 0 ? void 0 : memoize(thunkActions === null || thunkActions === void 0 ? void 0 : thunkActions[fn]);
        return Object.assign(Object.assign({}, acc), { [fn]: memo });
    }, {});
    function oldOptions() {
        delete newOptions.thunkActions;
        return newOptions;
    }
    const mergeOptions = Object.assign(Object.assign({}, store(oldOptions())), { thunkActions: Object.assign({}, newFuncObj) });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newStore = Object.assign({}, mergeOptions);
    return newStore;
}
