function stringToPk(pkString) {
  return {
    className: 'nice2.entity.PrimaryKey',
    _chunks: [
      pkString
    ]
  }
}


export default {stringToPk}
