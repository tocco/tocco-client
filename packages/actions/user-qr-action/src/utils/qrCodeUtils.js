export const buildUserMecardString = data => {
  let string = `MECARD:N:${data.lastname},${data.firstname};`

  string = appendField(data, 'c_address', 'ADR', string, address => address.replace(/\s*<br\s?\/?>\s*/gi, ','))
  string = appendField(data, 'phone_mobile', 'TEL', string)
  string = appendField(data, 'phone_company', 'TEL', string)
  string = appendField(data, 'phone_private', 'TEL', string)
  string = appendField(data, 'email', 'EMAIL', string)
  string = appendField(data, 'email_alternative', 'EMAIL', string)
  string = appendField(data, 'birthdate', 'BDAY', string, date => date.replace(/-/gi, ''))

  return string
}

const appendField = (data, fieldName, outputPrefix, output, handler = fieldData => fieldData) => {
  if (data[fieldName] && data[fieldName].length > 0) {
    output += `${outputPrefix}:${handler(data[fieldName])};`
  }
  return output
}
