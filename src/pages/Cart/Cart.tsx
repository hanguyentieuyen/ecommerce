import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constant/path'
import { purchaseStatus } from 'src/constant/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
import { keyBy } from 'lodash'
interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}
export default function Cart() {
  const [extendedPurchase, setExtendPurchases] = useState<ExtendedPurchase[]>([])
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = extendedPurchase.every((purchase) => purchase.checked)

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  useEffect(() => {
    setExtendPurchases((prev) => {
      const extendedPurchaseObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchaseObject[purchase._id]?.checked)
        })) || []
      )
    })
  }, [purchasesInCart])
  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchase[purchaseIndex]
      setExtendPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }
  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }
  return (
    <div className='div bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchase?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='mb-5 grid  grid-cols-12 rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0 '
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={purchase.checked}
                          onChange={handleCheck(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            className='h-20 w-20 flex-shrink-0'
                            to={`${path.home}${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}
                          >
                            <img alt={purchase.product.name} src={purchase.product.image} />
                          </Link>
                          <div className='flex-grow px-2 pb-2 pt-1'>
                            <Link
                              className='line-clamp-2'
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                          onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                          onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                          onType={handleTypeQuantity(index)}
                          onFocusOut={(value) =>
                            handleQuantity(
                              index,
                              value,
                              value >= 1 &&
                                value <= purchase.product.quantity &&
                                value !== (purchasesInCart as Purchase[])[index]?.buy_count
                            )
                          }
                          disabled={purchase.disabled}
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button className='transition-color bg-none text-black hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 mt-10 flex flex-col rounded-sm border-gray-300 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input type='checkBox' className='h-5 w-5 accent-orange' checked={isAllChecked} />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
              Chọn tất cả ({extendedPurchase.length})
            </button>
            <button className='mx-3 border-none bg-none'>Xóa</button>
          </div>
          <div className='mt-5 flex flex-col items-center sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <span>Tổng thanh toán (0 Sản phẩm):</span>
                <span className='ml-2 text-2xl text-orange'>₫199.000</span>
              </div>

              <div className='flex items-center justify-end text-sm'>
                <span className='text-gray-500'>Tiết kiệm </span>
                <span className='ml-6 text-orange'>₫74k</span>
              </div>
            </div>
            <Button className='hover:bg-orange-600 ml-4 flex h-10 w-52 items-center justify-center rounded bg-orange text-sm uppercase text-white'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
