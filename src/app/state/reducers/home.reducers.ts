import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Address } from "src/app/core/interfaces/processes/address.interface";
import { addressSucced } from "../actions/home.actions";
export interface HomePageState {
    address: Address[]
}
export const initialState: HomePageState = {
    address: []
};

const homePageReducers = createReducer(initialState, on(addressSucced, (state, { address }) => ({
    ...state, address
})));

export const reducer = (state: HomePageState | undefined, action: Action): HomePageState =>
    homePageReducers(state, action);

export const selectHomePageState = createFeatureSelector<HomePageState>("homePage");
export const selectAddress = createSelector(selectHomePageState, (state) => state.address);