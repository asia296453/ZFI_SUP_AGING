sap.ui.define([
    "sap/ui/core/UIComponent",
    "zfisupaging/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("zfisupaging.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
           this.setModel(new sap.ui.model.json.JSONModel(), "ReportModel");
            this.setModel(new sap.ui.model.json.JSONModel(), "LocalModel");
            this.setModel(new sap.ui.model.json.JSONModel(), "Supplier");
            this.setModel(new sap.ui.model.json.JSONModel(), "typedtls");
            this.setModel(new sap.ui.model.json.JSONModel(), "tableModel");
            this.setModel(new sap.ui.model.json.JSONModel(), "notdue");
            this.setModel(new sap.ui.model.json.JSONModel(), "totals");
            this.setModel(new sap.ui.model.json.JSONModel(), "Suppliertable");
            
            // enable routing
            this.getRouter().initialize();
        }
    });
});