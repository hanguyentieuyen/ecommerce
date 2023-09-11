import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buyCount: number }) {
    return http.post<SuccessResponseApi<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponseApi<Purchase[]>>(`${URL}`, {
      params
    })
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponseApi<Purchase[]>>(`${URL}/buy-product`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponseApi<Purchase[]>>(`${URL}/update-product`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponseApi<{ delete_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
