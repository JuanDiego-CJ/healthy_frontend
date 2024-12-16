import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { PaypalCaptureResponse, PaypalOrderResponse } from '../../shared/models/paypal-response.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl = `${environment.baseURL}/checkout`;
  private http = inject(HttpClient);

  createPaypalOrder(paymentId: number){
    let params = new HttpParams();
    params = params.append('paymentId', paymentId);
    params = params.append('returnUrl', environment.paypalUrl);
    params = params.append('cancelUrl', environment.paypalUrl);
    return this.http.post<PaypalOrderResponse>(`${this.baseUrl}/create`, null, {params: params});
  }
  capturePaypalOrder(orderId: string){
    return this.http.post<PaypalCaptureResponse>(
      `${this.baseUrl}/capture?orderId=${orderId}`,
      null
    );
  }
}
