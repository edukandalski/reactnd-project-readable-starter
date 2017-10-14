const partial8 = () => {
  return (Math.random().toString(16)+'000000000').substr(2,8)
}

const Idgen = () => {
  return `${partial8()}${partial8()}${partial8().substr(0,4)}`
}

export default Idgen