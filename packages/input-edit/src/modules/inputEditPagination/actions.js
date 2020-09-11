export const SET_CURRENT_PAGE = 'inputEditPagination/SET_CURRENT_PAGE'
export const SET_TOTAL_COUNT = 'inputEditPagination/SET_TOTAL_COUNT'

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  payload: {currentPage}
})

export const setTotalCount = totalCount => ({
  type: SET_TOTAL_COUNT,
  payload: {
    totalCount
  }
})
