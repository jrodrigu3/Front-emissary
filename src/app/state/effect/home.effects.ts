import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, Observable, of } from "rxjs";
import { Address } from "src/app/core/interfaces/processes/address.interface";
import { AddressService } from "src/app/modules/processes/address/services/address.service";
import { homeActions } from "../actions";
import { RootState } from "../reducers";

@Injectable()
export class HomeEffects {

  public constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private service: AddressService
  ) { }

  public addressRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(homeActions.addressRequested),
      exhaustMap(action => {
        const obSer: Observable<Address[]> = this.service.getAddress(action.criteria);
        return obSer.pipe(
          map(address => {
            return homeActions.addressSucced({ address });
          }),
          catchError((error: { message: string }) => of(homeActions.addressFailed({ error: error.message })))
        );
      })
    )
  );
}
