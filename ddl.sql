-- radicaltestv3.`action` definition

CREATE TABLE `action` (
  `actionId` int(11) NOT NULL AUTO_INCREMENT,
  `actionName` varchar(200) NOT NULL,
  `projectId` int(11) NOT NULL,
  `actionTags` varchar(200) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'ACTIVE',
  `createDate` datetime NOT NULL,
  `lastUpdateDate` datetime DEFAULT NULL,
  `createBy` int(11) NOT NULL,
  PRIMARY KEY (`actionId`)
) ENGINE=InnoDB AUTO_INCREMENT=458 DEFAULT CHARSET=latin1;


-- radicaltestv3.blog definition

CREATE TABLE `blog` (
  `blogId` int(11) NOT NULL AUTO_INCREMENT,
  `urlHeading` varchar(500) DEFAULT NULL,
  `heading` text,
  `shortDescription` text,
  `description` text,
  `addedBy` varchar(200) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `views` int(11) DEFAULT '0',
  `imagePath` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`blogId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;


-- radicaltestv3.config definition

CREATE TABLE `config` (
  `configId` int(11) NOT NULL AUTO_INCREMENT,
  `masterOsId` int(11) NOT NULL,
  `masterBrowserId` int(11) NOT NULL,
  `masterBrowserVersionId` int(11) NOT NULL,
  `masterConfigId` int(11) NOT NULL,
  `updateDate` datetime DEFAULT NULL,
  `updateBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`configId`)
) ENGINE=InnoDB AUTO_INCREMENT=627 DEFAULT CHARSET=latin1;


-- radicaltestv3.contactus definition

CREATE TABLE `contactus` (
  `contactUsId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `message` longtext,
  `createDate` datetime DEFAULT NULL,
  PRIMARY KEY (`contactUsId`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;


-- radicaltestv3.elements definition

CREATE TABLE `elements` (
  `elementId` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` int(11) NOT NULL,
  `elementName` varchar(200) NOT NULL,
  `elementValue` varchar(200) NOT NULL,
  `createDate` datetime NOT NULL,
  `lastUpdateDate` datetime DEFAULT NULL,
  `lastUpdateBy` int(11) DEFAULT NULL,
  `createBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`elementId`)
) ENGINE=InnoDB AUTO_INCREMENT=484 DEFAULT CHARSET=latin1;


-- radicaltestv3.executionmapping definition

CREATE TABLE `executionmapping` (
  `executionMappingId` int(11) NOT NULL AUTO_INCREMENT,
  `masterConfigIds` varchar(100) NOT NULL,
  `scenarioIds` varchar(100) NOT NULL,
  `executionMasterId` int(11) NOT NULL,
  `createDate` datetime NOT NULL,
  PRIMARY KEY (`executionMappingId`)
) ENGINE=InnoDB AUTO_INCREMENT=1592 DEFAULT CHARSET=latin1;


-- radicaltestv3.executionmaster definition

CREATE TABLE `executionmaster` (
  `executionMasterId` int(11) NOT NULL AUTO_INCREMENT,
  `executionNumber` varchar(45) NOT NULL,
  `executionDate` datetime DEFAULT NULL,
  `initiatedBy` int(11) NOT NULL,
  `status` varchar(45) DEFAULT 'INITIATED',
  `projectId` int(11) DEFAULT NULL,
  `completionDate` datetime DEFAULT NULL,
  `executionResultJson` longtext,
  `inputJsonString` longtext,
  `executionResult` varchar(50) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `lastUpdateDate` datetime DEFAULT NULL,
  `organisationId` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`executionMasterId`)
) ENGINE=InnoDB AUTO_INCREMENT=1815 DEFAULT CHARSET=latin1;


-- radicaltestv3.masterbrowser definition

CREATE TABLE `masterbrowser` (
  `masterBrowserId` int(11) NOT NULL AUTO_INCREMENT,
  `masterOsId` int(11) NOT NULL,
  `browser` varchar(100) NOT NULL,
  `isFree` char(1) NOT NULL DEFAULT 'N',
  `isSilver` char(1) NOT NULL DEFAULT 'N',
  `isGold` char(1) NOT NULL DEFAULT 'N',
  `isPlatinum` char(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`masterBrowserId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


-- radicaltestv3.masterbrowserversion definition

CREATE TABLE `masterbrowserversion` (
  `masterBrowserVersionId` int(11) NOT NULL AUTO_INCREMENT,
  `masterBrowserId` int(11) NOT NULL,
  `version` varchar(50) NOT NULL,
  `isFree` char(1) NOT NULL DEFAULT 'N',
  `isSilver` char(1) NOT NULL DEFAULT 'N',
  `isGold` char(1) NOT NULL DEFAULT 'N',
  `isPlatinum` char(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`masterBrowserVersionId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


-- radicaltestv3.masterconfig definition

CREATE TABLE `masterconfig` (
  `masterConfigId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'ACTIVE',
  `createDate` datetime NOT NULL,
  `lastUpdateDate` datetime DEFAULT NULL,
  `lastUpdateBy` int(11) DEFAULT NULL,
  `projectId` int(11) DEFAULT NULL,
  `showToAll` char(1) DEFAULT 'N',
  PRIMARY KEY (`masterConfigId`)
) ENGINE=InnoDB AUTO_INCREMENT=280 DEFAULT CHARSET=latin1;


-- radicaltestv3.masteros definition

CREATE TABLE `masteros` (
  `masterOsId` int(11) NOT NULL AUTO_INCREMENT,
  `masterOsName` varchar(100) NOT NULL,
  `isFree` char(1) NOT NULL DEFAULT 'N',
  `isSilver` char(1) NOT NULL DEFAULT 'N',
  `isGold` char(1) NOT NULL DEFAULT 'N',
  `isPlatinum` char(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`masterOsId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


-- radicaltestv3.notifications definition

CREATE TABLE `notifications` (
  `notificationId` int(11) NOT NULL AUTO_INCREMENT,
  `notification` text,
  `urlHeading` text,
  `imagePath` text,
  `type` int(11) DEFAULT NULL,
  `description` text,
  `dataId` varchar(500) DEFAULT NULL,
  `projectId` int(11) DEFAULT NULL,
  `isRead` int(11) DEFAULT '0',
  `showToAll` varchar(1) DEFAULT 'N',
  `targetUserId` int(11) DEFAULT NULL,
  `targetFirstName` text,
  `targetUserEmail` text,
  `createDate` text NOT NULL,
  `organisationId` int(11) NOT NULL,
  PRIMARY KEY (`notificationId`)
) ENGINE=InnoDB AUTO_INCREMENT=1341 DEFAULT CHARSET=latin1;


-- radicaltestv3.organisations definition

CREATE TABLE `organisations` (
  `organisationId` int(11) NOT NULL AUTO_INCREMENT,
  `organisationName` varchar(500) NOT NULL,
  `organisationKey` varchar(100) DEFAULT NULL,
  `createDate` datetime NOT NULL,
  `updateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`organisationId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;


-- radicaltestv3.projectuser definition

CREATE TABLE `projectuser` (
  `projectUserId` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `privilege` varchar(45) NOT NULL,
  `createDate` datetime NOT NULL,
  `status` varchar(50) NOT NULL,
  `writeScenariosAndAction` char(1) DEFAULT 'Y',
  `runTestCases` char(1) DEFAULT 'Y',
  `createNewConfig` char(1) DEFAULT 'Y',
  `viewReports` char(1) DEFAULT 'Y',
  `inviteAndManageTeam` char(1) DEFAULT 'N',
  `lastUpdateDate` datetime DEFAULT NULL,
  PRIMARY KEY (`projectUserId`)
) ENGINE=InnoDB AUTO_INCREMENT=353 DEFAULT CHARSET=latin1;


-- radicaltestv3.reporttracker definition

CREATE TABLE `reporttracker` (
  `reportTrackerId` int(11) NOT NULL AUTO_INCREMENT,
  `to` varchar(45) DEFAULT NULL,
  `cc` varchar(45) DEFAULT NULL,
  `body` longtext,
  `type` varchar(45) DEFAULT NULL,
  `executionMasterId` int(11) NOT NULL,
  `scenario` varchar(45) DEFAULT NULL,
  `createDate` varchar(45) DEFAULT NULL,
  `createdBy` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`reportTrackerId`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1;


-- radicaltestv3.scenario definition

CREATE TABLE `scenario` (
  `scenarioId` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` int(11) NOT NULL,
  `scenarioName` varchar(500) NOT NULL,
  `scenarioDescription` text,
  `scenarioTags` varchar(500) DEFAULT NULL,
  `createDate` datetime NOT NULL,
  `lastUpdateDate` datetime DEFAULT NULL,
  `createBy` int(11) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`scenarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=507 DEFAULT CHARSET=latin1;


-- radicaltestv3.scenarioactions definition

CREATE TABLE `scenarioactions` (
  `scenarioActionId` int(11) NOT NULL AUTO_INCREMENT,
  `scenarioId` int(11) NOT NULL,
  `actionId` int(11) NOT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'custom',
  `orderNo` int(11) NOT NULL,
  PRIMARY KEY (`scenarioActionId`)
) ENGINE=InnoDB AUTO_INCREMENT=1595 DEFAULT CHARSET=latin1;


-- radicaltestv3.stepmaster definition

CREATE TABLE `stepmaster` (
  `stepMasterId` int(11) NOT NULL AUTO_INCREMENT,
  `stepMaster` varchar(200) NOT NULL,
  `isElement` char(1) NOT NULL DEFAULT 'N',
  `isValue` char(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`stepMasterId`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;


-- radicaltestv3.steps definition

CREATE TABLE `steps` (
  `stepId` int(11) NOT NULL AUTO_INCREMENT,
  `actionId` int(11) DEFAULT NULL,
  `scenarioId` int(11) DEFAULT NULL,
  `stepName` varchar(200) DEFAULT NULL,
  `stepMasterId` int(11) NOT NULL,
  `elementId` int(11) DEFAULT NULL,
  `value` varchar(200) DEFAULT NULL,
  `orderNo` int(11) NOT NULL,
  `createDate` datetime NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`stepId`)
) ENGINE=InnoDB AUTO_INCREMENT=2487 DEFAULT CHARSET=latin1;


-- radicaltestv3.subscriptions definition

CREATE TABLE `subscriptions` (
  `subscriptionId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `amountDollars` int(11) DEFAULT NULL,
  `message` text,
  `transactionId` int(11) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `noOfProjects` int(11) DEFAULT '2',
  `teamMembers` int(11) DEFAULT '1',
  `scenariosPerProject` int(11) DEFAULT '500',
  `isMailReport` char(1) DEFAULT 'N',
  `isLiveExecutionLogs` char(1) DEFAULT 'Y',
  `isDownloadReport` char(1) DEFAULT 'Y',
  `parallelRuns` int(11) DEFAULT '1',
  `status` varchar(45) DEFAULT 'ACTIVE',
  `subscriptionType` varchar(100) NOT NULL DEFAULT 'FREE',
  `planId` varchar(500) DEFAULT NULL,
  `isExecutionVideo` char(1) NOT NULL DEFAULT 'N',
  `automationSteps` int(11) NOT NULL DEFAULT '50',
  PRIMARY KEY (`subscriptionId`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;


-- radicaltestv3.support definition

CREATE TABLE `support` (
  `supportId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `message` longtext,
  `createDate` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`supportId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


-- radicaltestv3.`user` definition

CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userType` varchar(50) NOT NULL DEFAULT 'OWNER',
  `organisationId` int(11) DEFAULT NULL,
  `userName` varchar(100) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `countryCode` varchar(10) DEFAULT NULL,
  `phoneNo` varchar(20) DEFAULT NULL,
  `accessToken` varchar(500) NOT NULL,
  `gcmId` varchar(500) DEFAULT NULL,
  `address` text,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `isPhoneVerified` char(1) NOT NULL DEFAULT 'N',
  `isEmailVerified` char(1) NOT NULL DEFAULT 'N',
  `activationCode` varchar(50) DEFAULT NULL,
  `emailActivationCode` varchar(50) DEFAULT NULL,
  `emailActivationReqDate` datetime DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `salt` varchar(100) NOT NULL,
  `profilePic` varchar(500) DEFAULT NULL,
  `source` varchar(50) NOT NULL DEFAULT 'WEB',
  `loginPlatform` varchar(50) NOT NULL DEFAULT 'EMAIL',
  `status` varchar(50) NOT NULL DEFAULT 'ACTIVE',
  `lastLoginDate` datetime DEFAULT NULL,
  `createDate` datetime NOT NULL,
  `lastUpdateDate` datetime DEFAULT NULL,
  `subscriptionEndDate` datetime DEFAULT NULL,
  `forgotPasswordNumber` varchar(500) DEFAULT NULL,
  `forgotPassReqDate` datetime DEFAULT NULL,
  `stripeId` varchar(500) DEFAULT NULL,
  `paymentId` varchar(500) DEFAULT NULL,
  `subscriptionId` varchar(500) DEFAULT NULL,
  `verifyEmailCount` int(11) DEFAULT '0',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=260 DEFAULT CHARSET=latin1;


-- radicaltestv3.userlogin definition

CREATE TABLE `userlogin` (
  `userLoginId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `loginTime` datetime NOT NULL,
  `logoutTime` datetime DEFAULT NULL,
  `ipAddress` varchar(50) NOT NULL,
  `country` varchar(50) DEFAULT 'INDIA',
  `updateDate` datetime NOT NULL,
  PRIMARY KEY (`userLoginId`)
) ENGINE=InnoDB AUTO_INCREMENT=5111 DEFAULT CHARSET=latin1;


-- radicaltestv3.auditTrail definition

CREATE TABLE `auditTrail` (
  `trailId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `tableName` varchar(100) DEFAULT NULL,
  `moduleName` varchar(100) DEFAULT NULL,
  `crud` varchar(1) DEFAULT NULL,
  `affectedRows` int(11) NOT NULL,
  `insertId` int(11) DEFAULT NULL,
  `targetRows` text,
  `updateValues` text,
  `oldData` text,
  `action` varchar(100) DEFAULT NULL,
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `organisationId` int(11) NOT NULL,
  PRIMARY KEY (`trailId`),
  KEY `auditTrail_con2` (`userId`),
  KEY `organisationId` (`organisationId`),
  CONSTRAINT `auditTrail_con2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `auditTrail_ibfk_1` FOREIGN KEY (`organisationId`) REFERENCES `organisations` (`organisationId`)
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=latin1;


-- radicaltestv3.project definition

CREATE TABLE `project` (
  `projectId` int(11) NOT NULL AUTO_INCREMENT,
  `projectNo` varchar(200) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` text,
  `logoPath` varchar(500) DEFAULT NULL,
  `tags` varchar(500) DEFAULT NULL,
  `createDate` datetime NOT NULL,
  `lastUpdateDate` datetime DEFAULT NULL,
  `lastUpdateBy` int(11) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'ACTIVE',
  `organisationId` int(11) DEFAULT NULL,
  PRIMARY KEY (`projectId`),
  KEY `organisationId` (`organisationId`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`organisationId`) REFERENCES `organisations` (`organisationId`)
) ENGINE=InnoDB AUTO_INCREMENT=252 DEFAULT CHARSET=latin1;