import { useEffect, useState } from "react"
const useGetWidthHeight = (ref) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setWidth(ref.current.clientWidth)
        setHeight(ref.current.clientHeight)
    }, [ref])

    return [width, height]
}

export default useGetWidthHeight