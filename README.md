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
A Library Management System (LMS) built on SAP Business Technology Platform (BTP) leverages SAP UI5 for the frontend (XML and JavaScript) and ABAP for the backend logic. 
This system is designed to manage the core functionalities of a library, such as managing books, borrowers, and transactions, while providing a user-friendly and efficient interface.

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

## Navigation Framework:

A left menu serves as the primary navigation bar.
Each menu item corresponds to a different view:
1.Admin Registration
2.Student Registration
3.Book Issue Log
4.Book Return Log
5.Books Remaining

## 1. Admin Registration
Purpose: Manage library admin users who oversee operations.
Features:
Input fields for admin details (e.g., Name, Email, Contact, Role).
CRUD operations:
Add New Admin: Registers a new admin into the system.
Edit Admin Details: Updates existing admin information.
Delete Admin: Removes an admin user.
Validation:
Ensure email and contact formats are valid.
Prevent duplicate entries.
## 2. Student Registration
Purpose: Register and manage students who borrow books.
Features:
Input fields for student details (e.g., Name, ID, Email, Membership Date).
Ability to search for students by name or ID.
CRUD operations for student records.
Validation:
Ensure valid membership dates.
Check if the student ID is unique.
## 3. Book Issue Log
Purpose: Record books issued to students.
Features:
Search and select a student from the database.
Search and select a book by Title, Author, or ISBN.
Record the issue date and calculate the due date automatically.
Generate unique transaction IDs for tracking.
Validation:
Ensure the book is available for borrowing.
Check if the student has exceeded the borrowing limit.
## 4. Book Return Log
Purpose: Log book returns and calculate overdue fines.
Features:
Search for an issued book by transaction ID or student ID.
Automatically calculate fines for overdue returns.
Update book availability status in the backend.
Generate a return receipt for the student.
Validation:
Check if the book matches the transaction.
Ensure return date is not earlier than the issue date.
## 5. Books Remaining
Purpose: Display the current stock of books in the library.
Features:
Table showing details such as Title, Author, ISBN, and Quantity.
Filter and search functionality by Author, Title, or Genre.
Visual Indicators:
Highlight books with low stock.
Real-time sync with the backend for accurate availability.

##  OData Services:
Each view communicates with the ABAP backend via OData services.
Endpoints for CRUD operations are exposed for each entity (e.g., Admins, Students, Books, Transactions).
ABAP Backend Logic:
Handles validation (e.g., duplicate entries, availability checks).
Performs calculations (e.g., overdue fines).
