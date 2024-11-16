## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Mon Aug 12 2024 05:59:30 GMT+0000 (Coordinated Universal Time)|
|**App Generator**<br>@sap/generator-fiori-freestyle|
|**App Generator Version**<br>1.14.3|
|**Generation Platform**<br>SAP Business Application Studio|
|**Template Used**<br>simple|
|**Service Type**<br>SAP System (ABAP On Premise)|
|**Service URL**<br>http://www.saphost.com:8023/sap/opu/odata/sap/ZLIBRARY_SRV|
|**Module Name**<br>library|
|**Application Title**<br>App Title|
|**Namespace**<br>|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.114.0|
|**Enable Code Assist Libraries**<br>False|
|**Enable TypeScript**<br>False|
|**Add Eslint configuration**<br>False|

## library

An SAP Fiori application.

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  In order to launch the generated app, simply run the following from the generated app root folder:

```
    npm start
```

- It is also possible to run the application using mock data that reflects the OData Service URL supplied during application generation.  In order to run the application with Mock Data, run the following from the generated app root folder:

```
    npm run start-mock
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)


#### Description :
THE MAIN AIM IS TO CREATE LIBRARY MANAGEMENT PROJECT

Initially Created Login Page With Validations for UserName And Password.Here User Name and password Will Be "ADMIN" else the username and password will be 
fetched from the backend table. here if the entered username and password matches the data in the backend then the login will be successful.

Here the frontend page will be in the form of left menu to view the contents in the left menu . and each component will be having a different page in the 
lest menu .
## BREIF DESCRIPTION ON PROJECT
1. Created Library Management project using Differnt tables In ABAP .
2. Fetched data from the tables through odata services from the backend .
3. Created different views and the controllers in the Xml for Navigation Between tha pages and also created tables in the view to display the data in thetable.
4. Controlles are used for validating the code in the page .
5. Displaying the reports in the view with different data according to the availability.
 
