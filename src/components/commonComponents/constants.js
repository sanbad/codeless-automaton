import * as Constants from './url';

export const RAZOR_PAY_KEY = "rzp_test_QPWvP7KML3iWqr";
export const RAZORPAY_STD_SUBSCRIPTION = "Radical Test Standard";

export const LOADER_TYPE = "ThreeDots";
export const LOADER_COLOR = "#333";
export const LOADER_COLOR_BTN = "#fff";

export const WRNG_MSG_TIMEOUT = 5000;
export const REFRESH_REPORT_TIMEOUT = 30000;
export const REFRESH_LIVELOGS_TIMEOUT = 5000;
export const RESULT_SIZE_PAGINATION = 20;
export const VALID_PROFILE_IMAGE_SIZE = 1;

export const GOOGLE_CLIENT_ID = "229378014374-90o6chbhrv7362ib9vqvpn7gbds0eqvi.apps.googleusercontent.com";
export const FACEBOOK_APP_ID = "426975781092422";

export const CLEAR_SEARCH = "Reset Filters";

export const DASHBOARD_EMAIL_VER_MSG = "Your email is not verified. Please verify now.";

export const SUBSCRIPTION_TYPE_FREE = "FREE";
export const SUBSCRIPTION_TYPE_PAID = "PAID";

export const PROJECT_USER_PRIVILEGE_OWNER = "Owner";
export const USER_TYPE_OWNER = "OWNER";

export const WINDOW_LOCATION = "/";
export const GENERIC_WARNING = "Something went wrong. Please try again later";

export const SELECTION_DROPDOWN = [
    {
        label:"Select"
    },
    {
        label:"Select All"
    },
    {
        label:"None"
    }
]

export const PROJECTROLESMAP = {
    Owner:"Project Admin",
    Editor:"Team Member"
}

export const USERROLESMAP = {
    OWNER:"Admin",
    EDITOR:"User"
}
export const DEFAULT_RESULT_SIZE = 20;
export const RESULT_SIZE_ARR = [
    {
        label:20
    },
    {
        label:30
    },
    {
        label:50
    }
]
/********************************URL PATHS START*********************************/
export const PROJECTS_LISTING_PATH = "/projects";

export const SCENARIO_LISTING_PATH = "/projects/scenarios";
export const SCENARIO_DETAILS_PATH = "/projects/scenariodetails";
export const CREATE_SCENARIO_PATH = "/projects/createscenario";
export const EDIT_SCENARIO_PATH = "/projects/editscenario";

export const ACTION_LISTING_PATH = "/projects/actions";
export const ACTION_DETAILS_PATH = "/projects/actiondetails";
export const EDIT_ACTION_PATH = "/projects/editaction";
export const CREATE_ACTION_PATH = "/projects/createaction";

export const ELEMENTS_LISTING_PATH = "/projects/elements";
export const TESTPARAMS_LISTING_PATH = "/projects/testparameters";
export const CONFIG_LISTING_PATH = "/projects/configs";
export const REPORTS_LISTING_PATH = "/projects/reports";
export const TEAM_LISTING_PATH = "/projects/team";
export const REPORT_DETAILS_PATH = "/projects/reportdetails";
export const PROJECT_DETAILS_PATH = "/projects/details";
export const PROJECT_MEMBERS_PATH = "/projects/members";
/********************************URL PATHS END*********************************/


/********************************PROJECTS WARNINGS START*********************************/
export const PROJECTS_DELETE_WARNING = "Are you sure you want to delete the project ";
export const PROJECTS_DELETE_BUTTON = "Delete Project";
export const PROJECTS_DELETE_HEADING = "Delete Project";
export const PROJECTS_EMPTY_WARNING = "You have not created any projects. Create a new project now";
export const DASHBOARD_PROJECTS_EMPTY_WARNING = "You have not created any projects";
export const PROJECTS_EMPTY_SEARCH_WARNING = "There aren't any results for that query.";
export const ALERT_TYPE_PASSWORD = "Enter your password";
export const PROJECTS_ARCHIVE_WARNING = "Are you sure you want to archive this custom project Visit site and check Logo?";
export const PROJECTS_ARCHIVE_BUTTON = "Archive Project";
export const PROJECTS_STATUS_ACTIVE = "ACTIVE";
export const PROJECTS_STATUS_ARCHIVE = "ARCHIVE";
export const PROJECTS_STATUS_VIEWONLY = "VIEWONLY";
export const PROJECTS_USER_PRIVILEGE_WRITE_SCENARIO_AND_ACTION = "Write Scenarios And Action";
export const PROJECTS_USER_PRIVILEGE_CREATE_NEW_CONFIG = "Create New Config";
export const PROJECTS_USER_PRIVILEGE_RUN_TEST_CASES = "Run Test Cases";
export const PROJECTS_USER_PRIVILEGE_VIEW_REPORTS = "View Reports";
export const PROJECTS_USER_PRIVILEGE_INVITE_AND_MANAGE_TEAM = "Invite and Manage Team";
export const PROJECT_USER_DELETE_WARNING = "Are you sure you want to delete this team member?";
export const PROJECT_USER_DELETE_BUTTON = "Delete Team Member";
export const PROJECT_USERS_EMPTY_WARNING = "You have not created any team member.";
export const PROJECT_USERS_EMPTY_SEARCH_WARNING = "There aren't any results for that query.";
export const PROJECT_USERS_OWNER_DELETE = "You are not authorized to delete this team member.";
/********************************PROJECTS WARNINGS ENDS*********************************/

/********************************SCENARIOS WARNINGS STARTS*********************************/
export const SCENARIOS_EMPTY_WARNING = "You have not created any scenarios. Create a new custom scenario now";
export const SCENARIOS_EMPTY_SEARCH_WARNING = "There aren't any results for that query.";
export const SCENARIOS_DELETE_WARNING = "Are you sure you want to delete this custom scenario Visit site and check Logo?";
export const SCENARIOS_DELETE_BUTTON = "Delete Scenario";
/********************************SCENARIOS WARNINGS ENDS*********************************/

/********************************User WARNINGS STARTS*********************************/
export const USER_DELETE_WARNING = "Are you sure you want to delete this User?";
export const USER_DELETE_BUTTON = "Delete User";
/********************************SCENARIOS WARNINGS ENDS*********************************/


/********************************ACTIONS WARNINGS STARTS*********************************/
export const ACTIONS_EMPTY_WARNING = "You have not created any actions. Create a new custom action now";
export const ACTIONS_EMPTY_SEARCH_WARNING = "There aren't any results for that query.";
export const ACTIONS_COPY_WARNING = "Are you sure you want to copy this custom action Visit site and check Logo?";
export const ACTIONS_DELETE_WARNING = "Are you sure you want to delete this custom action Visit site and check Logo?";
export const ACTIONS_DELETE_BUTTON = "Delete Action";
export const ACTIONS_COPY_BUTTON = "Copy Action";
export const ALERT_TYPE_WARNING = "warning";
export const ALERT_TYPE_INFO = "info";
export const ALERT_TYPE_ALERT = "alert";
export const ALERT_TYPE_OKAY_LABEL = "Okay";

/********************************ACTIONS WARNINGS ENDS*********************************/

/********************************ELEMENTS WARNINGS STARTS*********************************/
export const ELEMENTS_DELETE_WARNING = "Are you sure you want to delete this custom element Visit site and check Logo?";
export const ELEMENTS_DELETE_BUTTON = "Delete Element";
export const PARAMETERS_DELETE_BUTTON = "Delete Parameter";
export const ELEMENTS_EMPTY_WARNING = "You have not created any elements. Create a new element now";
export const TEST_PARAM_EMPTY_WARNING = "You have not created any test parameters. Create a new test parameter now";
export const ELEMENTS_EMPTY_SEARCH_WARNING = "There aren't any results for that query.";
/********************************ELEMENTS WARNINGS ENDS*********************************/

/********************************REPORTS STARTS*********************************/
export const REPORTS_STATUS_ALL = "All";
export const REPORTS_STATUS_INITIATED = "INITIATED";
export const REPORTS_STATUS_COMPLETED = "COMPLETED";
export const REPORTS_STATUS_FAILED = "FAILED";
export const REPORTS_STATUS_ABORTED = "ABORTED";
export const REPORTS_STATUS_STOPPED = "STOPPED";
export const REPORTS_EMPTY_WARNING = "There are no reports for this Project.";
export const REPORTS_EMPTY_SEARCH_WARNING = "There aren't any results for that query.";
export const REPORTS_SEARCH_FILTER_MSG = "Please select atleast one search filter";
export const REPORTS_SEARCH_EXECUTION_MSG = "Please enter Execution ID";
export const REPORTS_DELETE_BUTTON = "Delete Report";
export const REPORTS_DELETE_WARNING = "Are you sure you want to delete this custom report Visit site and check Logo?";
/********************************REPORTS ENDS*********************************/

/********************************CONFIGS WARNINGS STARTS*********************************/
export const CONFIGS_EMPTY_WARNING = "You have not created any configs. Create a new custom config now";
export const CONFIGS_EMPTY_SEARCH_WARNING = "There aren't any results for that query.";
export const CONFIGS_DELETE_WARNING = "Are you sure you want to delete this custom config Visit site and check Logo?";
export const CONFIGS_DELETE_BUTTON = "Delete Config";
export const CONFIGS_STATUS_ACTIVE = "ACTIVE";
export const CONFIGS_STATUS_DELETED = "DELETED";
export const CONFIGS_DELETE_ADD_EDIT_ROW_MSG = "Are you sure you want to delete this row?"
/********************************CONFIGS WARNINGS ENDS*********************************/
export const RESPONSE_CODE_SUCCESS = 1;
export const RESPONSE_CODE_SUCCESS_V4 = 0;
export const RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4 = 19;
export const RESPONSE_CODE_ACCESS_TOKEN_EXPIRED_V4 = 20;
export const RESPONSE_CODE_ACCESSTOKEN_INVALID = 2;


/***************** URLS ******************/
export const ImageBaseUrl = Constants.BASE_URL__NEW_API;
//LOGIN/PROFILE
export const CheckLogin = Constants.BASE_URL__NEW_API+"login"; 
export const Register = Constants.BASE_URL__NEW_API+"register"; 
export const ForgotPassword = Constants.BASE_URL__NEW_API+"forgotpassword"; 
export const Checkforgotpasswordcode = Constants.BASE_URL__NEW_API+"checkforgotpasswordcode"; 
export const Resetpassword = Constants.BASE_URL__NEW_API+"resetpassword";

export const Checkemailverificationcode = Constants.BASE_URL__NEW_API+"checkemailverificationcode";
export const Verifyemail = Constants.BASE_URL__NEW_API+"verifyemail";
export const ResendVerificationEmail = Constants.BASE_URL__NEW_API+"resendverificationemail";
//PROFILE
export const GetDashboard = Constants.BASE_URL__NEW_API+"getdashboard"; 
export const ChangePassword = Constants.BASE_URL__NEW_API+"changepassword"; 
export const GetProfile = Constants.BASE_URL__NEW_API+"getprofile";
export const UpdateProfilePic = Constants.BASE_URL__NEW_API+"updateprofilepic"; 
//PROJECTS
export const ProjectList = Constants.BASE_URL__NEW_API+"listprojects"; 
export const AddProject = Constants.BASE_URL__NEW_API+"createproject"; 
export const EditProject = Constants.BASE_URL__NEW_API+"editproject"; 
export const DeleteProject = Constants.BASE_URL__NEW_API+"deleteproject"; 
//SCENARIOS
export const ScenarioList = Constants.BASE_URL__NEW_API+"listscenarios"; 
export const EditScenario = Constants.BASE_URL__NEW_API+"editscenario";
export const ScenarioDetails = Constants.BASE_URL__NEW_API+"scenariodetails"; 
export const DeleteScenario = Constants.BASE_URL__NEW_API+"deletescenario"; 
export const CloneScenario = Constants.BASE_URL__NEW_API+"clonescenario"; 
export const AddScenario = Constants.BASE_URL__NEW_API+"addscenario";
export const RunScenarios = Constants.BASE_URL__NEW_API+"runscenarios";
export const GetProjectScenarioTags = Constants.BASE_URL__NEW_API+"getprojectscenariotags";
export const GetProjectActionTags = Constants.BASE_URL__NEW_API+"getprojectactiontags";
//ACTIONS
export const ActionList = Constants.BASE_URL__NEW_API+"listactions"; 
export const ActionDetails = Constants.BASE_URL__NEW_API+"actiondetails";  
export const ListPrimitiveActions = Constants.BASE_URL__NEW_API+"liststepmasters"; 
export const AddAction = Constants.BASE_URL__NEW_API+"addaction"; 
export const EditAction = Constants.BASE_URL__NEW_API+"editaction"; 
export const Deleteaction = Constants.BASE_URL__NEW_API+"deleteaction"; 
export const Copyaction = Constants.BASE_URL__NEW_API+"copyaction"; 
//ELEMENTS
export const ElementList = Constants.BASE_URL__NEW_API+"listelements"; 
export const AddElement = Constants.BASE_URL__NEW_API+"addelement";  
export const DeleteElement = Constants.BASE_URL__NEW_API+"deleteelement"; 
export const EditElement = Constants.BASE_URL__NEW_API+"editelement"; 
//TEST PARAMS
export const TestParamList = Constants.BASE_URL__NEW_API+"listtestparams"; 
export const AddTestParam = Constants.BASE_URL__NEW_API+"addtestparam";  
export const DeleteTestParam = Constants.BASE_URL__NEW_API+"deletetestparam"; 
export const EditTestParam = Constants.BASE_URL__NEW_API+"edittestparam"; 
//REPORTS
export const ReportList = Constants.BASE_URL__NEW_API+"listreports"; 
export const DeleteReport = Constants.BASE_URL__NEW_API+"deletereport"; 
export const ReportDetails = Constants.BASE_URL__NEW_API+"reportdetails"; 
export const GetVideoUrl = Constants.BASE_URL__NEW_API+"getvideourl"; 
export const DownloadMailReport = Constants.BASE_URL__NEW_API+"downloadreport";
export const GetLivelogs = Constants.BASE_URL__NEW_API+"getlivelogs";

export const ConfigList = Constants.BASE_URL__NEW_API+"listconfigs"; 
export const AddConfig = Constants.BASE_URL__NEW_API+"addconfig";
export const EditConfig = Constants.BASE_URL__NEW_API+"editconfig";
export const DeleteConfig = Constants.BASE_URL__NEW_API+"deleteconfig";
export const ConfigDetails = Constants.BASE_URL__NEW_API+"configdetails";
export const MasterConfigList = Constants.BASE_URL__NEW_API+"masterarray";

export const NotificationsList = Constants.BASE_URL__NEW_API+"getnotifications";
export const ReadNotifications = Constants.BASE_URL__NEW_API+"readnotifications";

export const ListProjectUsers = Constants.BASE_URL__NEW_API+"listprojectusers"; 
export const ListAllProjectUsers = Constants.BASE_URL__NEW_API+"getprojectusersall";
export const AddProjectUser = Constants.BASE_URL__NEW_API+"addprojectuser"; 
export const EditProjectUser = Constants.BASE_URL__NEW_API+"editprojectuser"; 
export const DeleteProjectUser = Constants.BASE_URL__NEW_API+"deleteprojectuser"; 
export const AddUserToOrganisation = Constants.BASE_URL__NEW_API+"addusertoorganisation";
export const DeactivateUser = Constants.BASE_URL__NEW_API+"deactivateuser";
export const AddUserToProjectMasterData = Constants.BASE_URL__NEW_API+"addusertoprojectmasterdata";

export const ContactSupport = Constants.BASE_URL__NEW_API+"contactsupport";

export const CreateSubscriptionId = Constants.BASE_URL__NEW_API+"upgradesubscription";
export const VerifySubscription = Constants.BASE_URL__NEW_API+"verifysubscription";
export const DowngradeToFree = Constants.BASE_URL__NEW_API+"downgradetofree";
export const UpgradeDowngradeSubscription = Constants.BASE_URL__NEW_API+"upgradedowngradesubscription";
