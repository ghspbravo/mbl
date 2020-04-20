export const API_BASE_CLIENT = process.env.API_BASE_CLIENT;
export const API_BASE_SERVER = process.env.API_BASE_SERVER;

const Api = {
	NewsList: "News/List",
	NewsSingle: "News/Details",

	MembersList: "User/List",
	MembersItem: "User/Details",

	CreateCompany: "Company/Create",
	EditCompany: "Company/Edit",
	CompanyList: "Company/List",
	CompanySingle: "Company/Details",

	CreateEvent: "Event/Create",
	EventList: "Event/List",
	EventSingle: "Event/Details",
	EventApply: "Event/ToRegister",

	CreateCource: "Program/Create",
	CourceList: "Program/List",
	CourceSingle: "Program/Details",
	CourceApply: "Program/ToRegister",

	CreateProject: "Project/CreateProject",
	ProjectList: "Project/List",
	ProjectSingle: "Project/Details",

	ResetPassword: "Account/ResetPassword",
	Login: "Account/Login",
	Register: "Account/Register",

	GetRoles: "ProfileType/GetList",
	GetSkills: "Skill/GetListForUser",

  GetCurrentProfile: "User/Profile",
  EditProfile: "User/EditProfile",

  UploadFile: "File/Upload"
};

export default Api;
