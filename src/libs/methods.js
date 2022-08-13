export function DateFn (time) {
  const localDate = new Date(time * 1000)
  return localDate.toLocaleDateString()
}

export function DateTimeFn (time) {
  const date = new Date(time * 1000)
  // const content = '' + date.getFullYear() +
  // '/' + (date.getMonth() + 1) +
  // '/' + date.getDate() +
  // ' ' + date.getHours() +
  // ':' + date.getMinutes() +
  // ':' + date.getSeconds()
  const tent = ` ${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  return tent
}

export function toThousandths (num) {
  const n = num.toString().split('.')
  n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return n.join('.')
}
