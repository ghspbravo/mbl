export const API_BASE_CLIENT = process.env.API_BASE_CLIENT;
export const API_BASE_SERVER = process.env.API_BASE_SERVER;

const Api = {
  NewsList: 'News/List',
  NewsSingle: 'News/Details',

  MembersList: 'User/List',
  MembersItem: 'User/Details',

  CreateCompany: 'Company/Create',
  CompanyList: 'Company/List',
  CompanyItem: 'Company/Details',

  ResetPassword: 'Account/ResetPassword',
  Login: 'Account/Login',
  Register: 'Account/Register',

  GetRoles: 'ProfileType/GetList',
  GetSkills: 'Skill/GetListForUser',

  GetCurrentProfile: 'User/Profile'
}

export default Api;