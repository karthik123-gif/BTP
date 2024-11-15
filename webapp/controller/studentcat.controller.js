sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/base/Log",
    "sap/ui/Device",
    "sap/ui/thirdparty/jquery",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, MessageBox, Log, Device, jQuery, ODataModel, JSONModel) {
    "use strict";

    return Controller.extend("library.controller.studentcat", {

        onInit: function () {
            // Get the OData model from the component
            var oModel = this.getOwnerComponent().getModel();
            this.getView().setModel(oModel); 
            this._oODataModel = oModel;

            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.getView().setModel(oDeviceModel, "device");

            // Initialize form data model
            this._oViewModel = new JSONModel({
                categoryId: "",
                category: "",
                maxAllowed: ""
            });
            this.getView().setModel(this._oViewModel, "formData");
        },

        onAfterRendering: function () {
            var oSplitCont = this.byId("SplitContDemo");
            if (oSplitCont) {
                var ref = oSplitCont.getDomRef() && oSplitCont.getDomRef().parentNode;
                // Set all parent elements to 100% height
                if (ref && !ref._sapUI5HeightFixed) {
                    ref._sapUI5HeightFixed = true;
                    while (ref && ref !== document.documentElement) {
                        var $ref = jQuery(ref);
                        if ($ref.attr("data-sap-ui-root-content")) {
                            break;
                        }
                        if (!ref.style.height) {
                            ref.style.height = "100%";
                        }
                        ref = ref.parentNode;
                    }
                }
            } else {
                console.error("Split container not found.");
            }
        },

        onPressGoToMaster: function () {
            var oSplitCont = this.byId("SplitContDemo");
            if (oSplitCont) {
                oSplitCont.toMaster(this.createId("master2"));
            } else {
                console.error("Split container not found.");
            }
        },

        onPressMasterBack: function () {
            var oSplitCont = this.byId("SplitContDemo");
            if (oSplitCont) {
                oSplitCont.toMaster(this.createId("menuPage"));
            } else {
                console.error("Split container not found.");
            }
        },

        onListItemPress: function (oEvent) {
            debugger
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
            var oSplitCont = this.byId("SplitContDemo");
            if (oSplitCont) {
                oSplitCont.toDetail(this.createId(sToPageId));
            } else {
                console.error("Split container not found.");
            }
        },

        onPressDetailBack: function () {
            var oSplitCont = this.byId("SplitContDemo");
            if (oSplitCont) {
                oSplitCont.backDetail();
            } else {
                console.error("Split container not found.");
            }
        },

        onCollapseExpandPress: function () {
            // Retrieve the side navigation control
            var oSideNavigation = this.byId("sideNavigation");

            // Check if the control is found
            if (!oSideNavigation) {
                console.error("Side navigation control not found.");
                return;
            }

            // Get the current expanded state
            var bExpanded = oSideNavigation.getExpanded();

            // Toggle the expanded state
            oSideNavigation.setExpanded(!bExpanded);
        },

        onSave: function () {
            var oView = this.getView();
            var oFormModel = oView.getModel("formData");

            if (!oFormModel) {
                console.error("Form data model is not initialized or undefined.");
                return;
            }

            var sCatId = oFormModel.getProperty("/categoryId");
            var sCategory = oFormModel.getProperty("/category");
            var iMaxAllowed = oFormModel.getProperty("/maxAllowed");

            if (!sCatId || !sCategory || iMaxAllowed === undefined) {
                MessageToast.show("Please fill in all required fields.");
                return;
            }

            var oNewEntry = {
                CatId: parseInt(sCatId, 10),
                Category: sCategory,
                MaxAllowed: parseInt(iMaxAllowed, 10)
            };

            this._oODataModel.create("/zstudent_categorySet", oNewEntry, {
                success: function () {
                    MessageToast.show("Entry created successfully!");

                    // Navigate to the next page
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("studentReg"); // Replace 'studentReg' with your target route
                }.bind(this), // Ensure 'this' context is correctly bound

                error: function (oError) {
                    var errorDetails = oError.responseText ? JSON.parse(oError.responseText) : {};
                    var errorMessage = errorDetails.error.message.value || "Error creating entry.";
                    MessageToast.show(errorMessage);
                    console.error("Error details:", errorDetails);
                }.bind(this) // Ensure 'this' context is correctly bound
            });
        },

        onReset: function () {
            // Reset the form
            this._oViewModel.setData({
                categoryId: "",
                category: "",
                maxAllowed: ""
            });
        },

        onCancel: function () {
            // Navigate back or close the dialog
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("defaultRoute", {}, true);
            }
        },

        onStudentRegistration: function() {
            // Navigate to the Student Registration view
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("studentRegistration"); // Use the route name defined in your router configuration
        }
    });
});
