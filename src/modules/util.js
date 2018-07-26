export const transformAlphaFromColor = (currentColor, alpha) => {
  const a = currentColor.split(' ').shift()
  const rounded = (alpha + '').split('.').shift()
  const test = (100 - rounded) < 10 ? '0' + (100 - rounded) : 100 - rounded
  return `${a} 0.${test})`
}
