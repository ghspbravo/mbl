export const API_BASE_CLIENT = 'http://localhost:59029/api/v1/'//process.env.API_BASE_CLIENT;
export const API_BASE_SERVER = 'http://localhost:59029/api/v1/'//process.env.API_BASE_SERVER;

const Api = {
  NewsList: 'News/List',
  NewsSingle: 'News/Details',

  MembersList: 'User/List',
  MembersItem: 'User/Details',

  CreateCompany: 'Company/Create',
  CompanyList: 'Company/List',
  CompanySingle: 'Company/Details',

  ResetPassword: 'Account/ResetPassword',
  Login: 'Account/Login',
  Register: 'Account/Register',

  GetRoles: 'ProfileType/GetList',
  GetSkills: 'Skill/GetListForUser',

  GetCurrentProfile: 'User/Profile'
}

export default Api;