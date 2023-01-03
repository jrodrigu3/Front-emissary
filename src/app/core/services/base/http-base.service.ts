import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ETypeContent } from '../../enum/typeContent.enum';
import { GeneralUtils } from '../../utils/general-utils';
import { ObjParam } from '../../interfaces/base/objParam.interface';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class HttpBaseService {

  private _resolvedOptions = Intl.DateTimeFormat().resolvedOptions();

  private envPro = GeneralUtils.getUrlWebApiProceso();

  private _tokenService = inject(TokenService)

  constructor(private _http: HttpClient) { }


  public getMethod<T>(
    url: string,
    httpParams: Array<ObjParam> = [],
  ): Observable<T> {
    const urlApiResource = (this.envPro) + url;
    let params = new HttpParams();
    if (httpParams) httpParams.forEach(param => params = params.append(param.field!, param.value));
    let headers = this.tokenIntercept(new HttpHeaders());
    return this._http.get<T>(urlApiResource, { params, headers });
  }

  public postMethod<T>(
    url: string,
    bodyParams: any = null,
    httpParams: Array<ObjParam> = [],
  ): Observable<T> {
    const urlApiResource = (this.envPro) + url;
    let params = new HttpParams();
    if (httpParams) httpParams.forEach(param => params = params.append(param.field!, param.value));
    let headers = this.tokenIntercept(new HttpHeaders());
    return this._http.post<T>(urlApiResource, bodyParams, { params, headers });
  }


  public putMethod<T>(
    url: string,
    bodyParams: any = null,
    httpParams: Array<ObjParam> = []
  ): Observable<T> {

    const urlApiResource = (this.envPro) + url;
    let params = new HttpParams();
    let headers = this.tokenIntercept(new HttpHeaders());
    if (httpParams) httpParams.forEach(param => params = params.append(param.field!, param.value));
    return this._http.put<T>(urlApiResource, bodyParams, { params, headers });
  }


  public deleteMethod<T>(
    url: string,
    httpParams: Array<ObjParam> = [],
    //idPermiso: number = EPermisosEnum.eliminar,
  ): Observable<T> {

    const urlApiResource = (this.envPro) + url;
    let params = new HttpParams();
    if (httpParams) httpParams.forEach(param => params = params.append(param.field!, param.value));
    let headers = this.tokenIntercept(new HttpHeaders());
    return this._http.delete<T>(urlApiResource, { params, headers });
  }


  private tokenIntercept(headers: HttpHeaders): HttpHeaders {
    const tokem = this._tokenService.getToken();
    return headers = headers.append('token', tokem);
  }

}
