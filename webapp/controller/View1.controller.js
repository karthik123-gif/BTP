sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, ODataModel, JSONModel, Filter, FilterOperator, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("library.controller.View1", {

        onInit: function () {
            // Define the OData service URL
            var sServiceUrl = "/sap/opu/odata/sap/ZLIBRARY_SRV/";

            // Create an ODataModel instance
            this.oModel = new ODataModel(sServiceUrl, {
                useBatch: false
            });

            // Set the OData model to the view
            this.getView().setModel(this.oModel);

            // Fetch the complete details from the zusersSet entity set
            this._getTableData();
        },

        _getTableData: function () {
            var that = this;

            // Define the OData entity set you want to fetch
            var sEntitySet = "/zusersSet";

            // Fetch the data from the OData service
            this.getView().getModel().read(sEntitySet, {
                success: function (oData) {
                    // On successful data fetch, create a JSONModel
                    var oTableModel = new JSONModel();
                    oTableModel.setData(oData);

                    // Store the fetched data for later validation
                    that._userData = oData.results;

                    // Optionally, set the JSONModel to a table in the view if needed
                    // that.getView().byId("usersTable").setModel(oTableModel);
                },
                error: function (oError) {
                    // Handle errors here
                    MessageToast.show("Error fetching data");
                    console.error(oError);
                }
            });
        },

        onLoginPress: function () {
            debugger
            var oView = this.getView();
            var oUsernameInput = oView.byId("usernameInput");
            var oPasswordInput = oView.byId("passwordInput");

            var sUsername = oUsernameInput.getValue();
            var sPassword = oPasswordInput.getValue();

            // Check if username and password fields are not empty
            if (!sUsername) {
                oUsernameInput.setValueState("Error");
                oUsernameInput.setValueStateText("Username is required");
                return;
            } else {
                oUsernameInput.setValueState("None");
            }

            if (!sPassword) {
                oPasswordInput.setValueState("Error");
                oPasswordInput.setValueStateText("Password is required");
                return;
            } else {
                oPasswordInput.setValueState("None");
            }

            // Proceed with validation against fetched data
            var bValidUser = this._validateCredentials(sUsername, sPassword);

            if (bValidUser) {
                // Show success message
                MessageBox.success("Login successful!");

                // Navigate to the second view on successful login
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("studentcat");
            } else {
                // Show error message if credentials are invalid
                MessageBox.error("Invalid Username or Password.");
            }
        },

        _validateCredentials: function (sUsername, sPassword) {
            // Iterate over the fetched user data to validate the credentials
            for (var i = 0; i < this._userData.length; i++) {
                var oUser = this._userData[i];
                if (oUser.Username === sUsername && oUser.Password === sPassword) {
                    return true; // Valid user found
                }
            }
            return false; // No valid user found
        }
    });
});