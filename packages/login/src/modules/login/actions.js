export const CHANGE_PAGE = 'Login/CHANGE_PAGE'

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    payload: {
      page
    }
  }
}
