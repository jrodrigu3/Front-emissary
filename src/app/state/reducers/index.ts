import { ModuleWithProviders } from "@angular/core";
import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HomePageState } from "./home.reducers";
import * as fromHome from "./home.reducers"
export interface RootState {
  homePage: HomePageState
}
export const reducers: ActionReducerMap<RootState> = {
  homePage: fromHome.reducer
}

export const debug = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => reducer(state, action);
};

export const metaReducers: MetaReducer<RootState>[] = [debug];

export const storeDevTools: ModuleWithProviders<any>[] = [StoreDevtoolsModule.instrument({ name: "My Store" })];