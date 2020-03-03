export const API_BASE_CLIENT = 'http://dev.mbl.mba/api/v1/';
export const API_BASE_SERVER = 'http://dev.mbl.mba/api/v1/';

const Api = {
  NewsList: 'News/List',
  NewsSingle: 'News/Details',

  MembersList: 'User/List',
  MembersItem: 'User/Details',

  ResetPassword: 'Account/ResetPassword',
  Login: 'Account/Login',
  Register: 'Account/Register',

  GetRoles: 'ProfileType/GetList',
  GetSkills: 'Skill/GetListForUser',

  GetCurrentProfile: 'User/Profile'
}

export default Api;