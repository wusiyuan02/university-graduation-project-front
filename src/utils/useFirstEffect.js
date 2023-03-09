/*
 * @Author: SiyuanWu
 * @Date: 2023-03-09 09:32:36
 * @LastEditors: SiyuanWu
 * @LastEditTime: 2023-03-09 09:37:01
 * @Description: 只执行一个的Effect
 */

import { useEffect, useState } from 'react'

export const useFirstEffect = (cb, dps) => {
  const [hasDo, setHasDo] = useState(false)

  useEffect(() => {
    if (!hasDo && dps) {
      cb && cb()
      console.log(JSON.stringify(dps))
      setHasDo(true)
    }
  }, [JSON.stringify(dps)])
}
