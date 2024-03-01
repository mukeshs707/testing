
const BASE_URL = process.env.REACT_APP_BASE_URL

const apiRoute = {
  adminLoginURL: BASE_URL+'admin/login',
  
  // Categories
  categoriesCreate: BASE_URL+'admin/createCategory',
  getCategories: BASE_URL+'admin/getcategories',
  deleteCategories: BASE_URL+'admin/deletecategory',
  updateCategories: BASE_URL+'admin/updatecategory',
  
  coinWebsiteCreate: BASE_URL+'admin/createCoin',
  coinWebsiteListing: BASE_URL+'admin/getcoins',
  deleteCoinWebsite: BASE_URL+'admin/deletecoin',
  updateCoinWebsite: BASE_URL+'admin/updatecoin',
  categoryWithLink: BASE_URL+'admin/category_with_link',
  categoryWithDetail: BASE_URL+'admin/links_by_category',
}

export { apiRoute }
