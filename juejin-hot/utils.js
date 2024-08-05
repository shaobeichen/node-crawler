/**
 * 延迟函数
 * @param delay 延迟时间
 * @returns
 */
export const sleep = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
