export const API_BASE = 'http://dev.mbl.mba/api/v1/';// i tak soidet

const Api = {
  NewsList: 'News/List',
  NewsSingle: 'News/Details',

  ResetPassword: 'Account/ResetPassword',
  Login: 'Account/Login',
  Register: 'Account/Register',

  GetRoles: 'ProfileType/GetList',
  GetSkills: 'Skill/GetListForUser',

  GetCurrentProfile: 'User/Profile'
}

export default Api;