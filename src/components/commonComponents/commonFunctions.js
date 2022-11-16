import moment from "moment";
// Get varialbles from local storage
export const getLocalStorageVariables = () => {
    let userId = typeof window !== 'undefined'?localStorage.getItem('loggedInUserDetails')?JSON.parse(localStorage.getItem('loggedInUserDetails')).loggedInUserId:'':'';
    let email = typeof window !== 'undefined'?localStorage.getItem('loggedInUserDetails')?JSON.parse(localStorage.getItem('loggedInUserDetails')).loggedInUserEmail:'':'';
    let accessToken = typeof window !== 'undefined'?localStorage.getItem('loggedInUserDetails')?JSON.parse(localStorage.getItem('loggedInUserDetails')).loggedInAccessToken:'':'';
    let fullName = typeof window !== 'undefined'?localStorage.getItem('loggedInUserDetails')?JSON.parse(localStorage.getItem('loggedInUserDetails')).loggedInFirstName:'':'';
    let userType = typeof window !== 'undefined'?localStorage.getItem('loggedInUserDetails')?JSON.parse(localStorage.getItem('loggedInUserDetails')).loggedInUserType:'':'';
    let profilePic = typeof window !== 'undefined'?localStorage.getItem('loggedInUserDetails')?JSON.parse(localStorage.getItem('loggedInUserDetails')).loggedInProPic:'':'';
    
    let userData = {
        userId:userId===undefined?"":userId,
        email:email===undefined?"":email,
        accessToken:accessToken===undefined?"":accessToken,
        fullName:fullName===undefined?"":fullName,
        userType:userType===undefined?"":userType,
        profilePic:profilePic===undefined?"":profilePic,
    }
    return userData;
}

//Check Variable is empty
export const isEmptyVariable = (variableName) => {
    if(variableName === ''){
        return true;
    }
        
    if(variableName === undefined){
        return true;
    }

    if(variableName === null){
        return true;
    }
    
    return false;
}

//Check if array is empty
export const isEmptyArray = (arrayName) => {
    if(isEmptyVariable(arrayName)){
        return true;
    }

    if(!Array.isArray(arrayName)){
        return true;
    }

    if(arrayName.length === 0){
        return true;
    }
    
    return false;
}

export const ifEmptyReturnNA = (variableName) => {
    return isEmptyVariable(variableName)?"N/A":variableName;
}

export const ifEmptyReturnStr = (variableName,str) => {
    return isEmptyVariable(variableName)?str:variableName;
}

export const sortTable = (sortColumn, currentSortColumn, currentSortDir) => {

    let sortObj = {
        sortDirTemp:"",
        sortTemp:sortColumn
    };
    
    //if the clicked column is same as previously clicked column
    //then just change the sorting direction
    //if it is different then change the column param to new & reinitialise sortdir to asc 
    if(currentSortColumn === sortColumn){
        if(currentSortDir === ""){
            sortObj.sortDirTemp = "asc";
        }else if(currentSortDir === "asc"){
            sortObj.sortDirTemp = "desc";
        }else if(currentSortDir === "desc"){
            sortObj.sortDirTemp = "";
            sortObj.sortTemp="";
        }
    }else{
        sortObj.sortDirTemp = "asc";
    }

    return sortObj;
}

export const getUTCDateTimeFromLocal = (dateStr,isEOD) => {
    // console.log(dateStr);
    if(isEmptyVariable(dateStr)){
        return "";
    }
    
    var localDate = moment(dateStr);
    if(isEOD){
        localDate = localDate.endOf("day");
    }
    return localDate.utc().format("YYYY-MM-DD HH:mm:ss");
}

export const getLocalDateFromUTC = (dateStr) => {
    if(isEmptyVariable(dateStr)){
        return "";
    }
    var utcDate = moment.utc(dateStr);
    return utcDate.local().format("DD-MMM-YYYY hh:mm a");
}

export const getLocalDateOnlyFromUTC = (dateStr) => {
    if(isEmptyVariable(dateStr)){
        return "";
    }
    var utcDate = moment.utc(dateStr);
    return utcDate.local().format("DD-MMM-YYYY");
}

export const truncateString = (str, num) => {
    
    if(isEmptyVariable(str)){
        return "-";
    }

    if(str.length <= num){
        return str;
    }

    if(str.length > num){
        return str.substring(0,num) + "...";
    }
}

export const isJsonString = (str) => {
    try{
        let json = JSON.parse(str);
        return true;
    }catch(e){
        return false;
    }
}