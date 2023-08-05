import { useSearchParams } from 'react-router-dom'
export default useQueryParam() {
    const [searchParams] = useSearchParams()
    return Object.fromEntries[...searchParams]
}