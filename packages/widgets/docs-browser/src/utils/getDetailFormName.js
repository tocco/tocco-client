const getDetailFormName = (context, entityName) =>
  context.detailFormNames && context.detailFormNames[entityName]
    ? context.detailFormNames[entityName]
    : `Dms${entityName}`

export default getDetailFormName
