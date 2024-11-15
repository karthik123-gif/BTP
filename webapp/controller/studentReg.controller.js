sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("library.controller.studentReg", {

        onInit: function () {
            

        },

        handleSave: function () {
            debugger
            var oView = this.getView();

            // Get input fields by ID
            var oStudentId = oView.byId("studentid").getValue();
            var oFirstName = oView.byId("firstname").getValue();
            var oLastName = oView.byId("lastname").getValue();
            var oRollNumber = oView.byId("rollnumber").getValue();
            var oBranch = oView.byId("branch").getValue();
            var oYear = oView.byId("_IDMA2928").getSelectedKey();
            var oEmailId = oView.byId("emailid").getValue();
            var oApproved = oView.byId("approved").getValue();
            var oRejected = oView.byId("rejected").getValue();
            var oCategory = oView.byId("category").getValue();
            var oBooksIssued = oView.byId("booksissued").getValue();

            // Check if required fields are filled
            if (!oStudentId || !oFirstName || !oLastName || !oRollNumber || !oBranch ||// !oYear || // !oEmailId || 
                !oApproved || !oRejected || !oCategory || !oBooksIssued) {

                MessageBox.error("Please fill all required fields.");
                return;
            }

            // Create the payload for the OData service
            var oDataPayload = {
                StudentId: parseInt(oStudentId, 10),
                FirstName: oFirstName,
                LastName: oLastName,
                Approved: parseInt(oApproved, 10),
                Rejected: parseInt(oRejected, 10),
                Category: parseInt(oCategory, 10),
                RollNum: oRollNumber,
                Branch: parseInt(oBranch, 10),
                Year1: parseInt(oYear, 10),
                BooksIssued: parseInt(oBooksIssued, 10),
                EmailId: oEmailId,
               
                
            };

            // Get the OData model
            var oModel = oView.getModel();

            // Send a create request to the OData service
            oModel.create("/zstudentsSet", oDataPayload, {
                success: function (oData) {
                    MessageToast.show("Record created successfully.");
                },
                error: function (oError) {
                    try {
                        var oErrorResponse = JSON.parse(oError.responseText);
                        MessageBox.error("Error creating record: " + oErrorResponse.error.message.value);
                    } catch (e) {
                        MessageBox.error("Error creating record: " + oError.message);
                    }
                }
            });
        },

        onReset: function () {
            debugger
            var oView = this.getView();
            // Reset all input fields
            oView.byId("studentid").setValue("");
            oView.byId("firstname").setValue("");
            oView.byId("lastname").setValue("");
            oView.byId("rollnumber").setValue("");
            oView.byId("branch").setValue("");
            oView.byId("_IDMA2928").setSelectedKey(""); // Reset Select control using setSelectedKey
            oView.byId("emailid").setValue("");
            oView.byId("approved").setValue("");
            oView.byId("rejected").setValue("");
            oView.byId("category").setValue("");
            oView.byId("booksissued").setValue("");
        }
    });
});
