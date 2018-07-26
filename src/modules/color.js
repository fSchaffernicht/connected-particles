export default (value) => {
  const r = Math.max(0, Math.floor(Math.random() * 100))
  const g = Math.max(0, Math.floor(Math.random() * 50))
  const b = Math.max(0, Math.floor(Math.random() * 100))

  if (value) {
    return `rgba(${r},${g},${b}, 0.${value})`
  }

  return `rgba(${r},${g},${b}, ${0.4})`
}
