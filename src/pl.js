
let isExtensionOn = false;
let allTabs = [];
let baseFrontEndUrl = "http://localhost:3000";

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.chromeAction === 'addElement'){
        $.ajax({
        type: 'POST',
        url: apiserver + 'addelement',
        contentType: 'application/x-www-form-urlencoded',
        data: {'elementName':request.elementName, 'elementValue':request.elementValue, 'project_id':request.projectId, 'loginAccessToken':'CUST13315', 'loginEmail':'pranitmahajan1@gmail.com'},
        success: function(msg){
            $('#radicalTestError').remove();
            $('#radicalTestSuccess').remove();
            msg = JSON.parse(msg);
            console.log(msg);

            if (msg.responseCode == 1) sendResponse({responseCode: 1});
            else sendResponse({responseCode: 0, error: msg.responseMessage});
        },
        error: function(e){ 
            console.log(e);
            sendResponse({responseCode: 0, error: 'Error saving element. Please try again.'});
        }
        });
    }

    if (request.chromeAction === 'screenshot') {
        chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(dataURL) {
            sendResponse({imgData: dataURL});
        });
    }

    if (request.chromeAction === 'getCookie') {
        chrome.tabs.executeScript({code: `console.log("Inside Login Check - Before Getting Cookies");`});
        chrome.cookies.get({"url": "https://www.radicaltest.com", "name": "rad_cookie_userId"}, function(userid, err) {
        if(userid) {
            sendResponse({user: userid.value});
        } else sendResponse({user: null});
        });
    }

    return true;
});

chrome.contextMenus.create({
    "title": "Add element to project",
    "contexts": ["page", "selection", "image", "link"],
    "onclick" : function(e) {
        chrome.tabs.executeScript({code: `console.log("Inside Login Check - Before Getting Cookies");`});

        chrome.cookies.getAll({"url": baseFrontEndUrl}, function(cookies) {
            //lets get the email and accesstoken from cookies
            let email = "";
            let accessToken = "";

            for(var i = 0; i < cookies.length; i++){
                if(cookies[i].name === "loggedInUserEmail"){
                    email = cookies[i].value;
                }

                if(cookies[i].name === "loggedInAccessToken"){
                    accessToken = cookies[i].value;
                }
            }

            if(email !== "" && accessToken !== ""){
                let errorMsg = 'Error fetching project list from your account. Please refresh page and try again!';
                chrome.tabs.executeScript({code: `console.log("Inside Login Check - Before AJAX call");`});

                $.ajax({
                    type: 'POST',
                    url: apiserver + 'listprojects',
                    contentType: 'application/x-www-form-urlencoded',
                    data: {'email':email.replace("%40","@"), 'accessToken':accessToken,'pageNo':"1", "resultsize":"10"},
                    success: function(data, status){
                        if(status == 'success'){
                            let parsedData = JSON.parse(data);
                            if(parsedData?.data?.result) {
                                chrome.tabs.executeScript({code: 'addRadicalTestElement('+JSON.stringify(parsedData.data.result)+');'});
                            }else{
                                alert(errorMsg+" NOT FOUND");
                            } 
                        } else {
                            alert(errorMsg+" FAILED");
                        }
                    },error: function(e){ 
                        alert(errorMsg+" AJAX FAILED"); 
                    }
                });

            }else{
                let a=document.createElement('a');
                a.target='_blank';
                a.href=baseFrontEndUrl+'/login';
                if (window.confirm('Please login to Radical Test!\nClick OK to Login now')) a.click();
            }
        });
    }
});
