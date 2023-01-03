import { createAction, props } from "@ngrx/store";
import { Address } from "src/app/core/interfaces/processes/address.interface";

export const addressRequested = createAction("address Requested", props<{ criteria: string }>());
export const addressSucced = createAction("address Requested Succed", props<{ address: Address[] }>());
export const addressFailed = createAction("address Requested Failed", props<{ error: string }>());