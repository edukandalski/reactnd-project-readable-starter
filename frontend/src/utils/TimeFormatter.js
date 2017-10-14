const TimeFormatter = (timestamp) => {
  const t = new Date(timestamp)
  return t.toLocaleString()
}

export default TimeFormatter