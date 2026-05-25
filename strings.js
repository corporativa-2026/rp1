export function split(str, separator) {
  if (typeof str !== 'string') {
    throw new TypeError('str must be a string');
  }
  if (separator !== undefined && typeof separator !== 'string') {
    throw new TypeError('separator must be a string');
  }
  const result = []
  let current = ""
  for (var i = 0, j = 0; i < str.length; i++) {
    if (!separator) {  
      result[j++] = str[i]
    } else if (str[i] == separator) {
      result[j++] = current
      current = ''
    } else {
      current += str[i]
    }
  }
  if (separator) result[j] = current
  return result
}