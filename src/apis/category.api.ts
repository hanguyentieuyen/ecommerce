import http from 'src/utils/http'
import { Category } from 'src/types/category.type'
import { SuccessResponseApi } from 'src/types/utils.type'

const URL = 'categories'

const categoriesApi = {
  getCategories() {
    return http.get<SuccessResponseApi<Category[]>>(URL)
  }
}
export default categoriesApi
