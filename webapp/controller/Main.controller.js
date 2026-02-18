sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox", 'sap/ui/model/Filter',
    "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel", "sap/ui/core/Fragment", 'sap/ui/model/BindingMode',
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet"
], (Controller, MessageBox, Filter, FilterOperator, JSONModel, Fragment, BindingMode, x, Spreadsheet) => {
    "use strict";
    var EdmType = x.EdmType;

    return Controller.extend("zfisupaging.controller.Main", {
        onInit() {
            this.getOwnerComponent().getModel("LocalModel").setProperty("/Companycode", "5910");
            this.getOwnerComponent().getModel("LocalModel").setProperty("/P_DateFunction", "TODAY");
            this.getOwnerComponent().getModel("LocalModel").setProperty("/Displaycurrency", "SAR");
            this.getOwnerComponent().getModel("LocalModel").refresh();
        },
        SearchP_DateFunction: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Datefunction", sap.ui.model.FilterOperator.EQ, sValue);
            evt.getSource().getBinding("items").filter([oFilter]);
        },
        ConfP_DateFunction: function (evt) {
            debugger;
            var oval = evt.getParameter("selectedItem").getProperty("title");
            var sSelecteddesc = evt.getParameter("selectedItem").getProperty("description");
            this.getView().getModel("LocalModel").setProperty("/P_DateFunction", oval);
            this.getView().getModel("LocalModel").refresh(true);
            evt.getSource().getBinding("items").filter([]);
        },

        SearchP_Currency: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Waers", sap.ui.model.FilterOperator.EQ, sValue);
            evt.getSource().getBinding("items").filter([oFilter]);
        },
        ConfP_Currency: function (evt) {
            debugger;
            var oval = evt.getParameter("selectedItem").getProperty("title");
            var sSelecteddesc = evt.getParameter("selectedItem").getProperty("description");
            this.getView().getModel("LocalModel").setProperty("/Displaycurrency", oval);
            this.getView().getModel("LocalModel").refresh(true);
            evt.getSource().getBinding("items").filter([]);
        },

        SearchP_Currency: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Waers", sap.ui.model.FilterOperator.EQ, sValue);
            evt.getSource().getBinding("items").filter([oFilter]);
        },
        ConfP_Currency: function (evt) {
            debugger;
            var oval = evt.getParameter("selectedItem").getProperty("title");
            var sSelecteddesc = evt.getParameter("selectedItem").getProperty("description");
            this.getView().getModel("LocalModel").setProperty("/Displaycurrency", oval);
            this.getView().getModel("LocalModel").refresh(true);
            evt.getSource().getBinding("items").filter([]);
        },


        SearchCompanyCode: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Bukrs", sap.ui.model.FilterOperator.EQ, sValue);
            evt.getSource().getBinding("items").filter([oFilter]);
        },
        ConfCompanyCode: function (evt) {
            debugger;
            var oval = evt.getParameter("selectedItem").getProperty("title");
            var sSelecteddesc = evt.getParameter("selectedItem").getProperty("description");
            this.getView().getModel("LocalModel").setProperty("/Companycode", oval);
            this.getView().getModel("LocalModel").refresh(true);
            evt.getSource().getBinding("items").filter([]);
        },


        SearchSupplier: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new sap.ui.model.Filter("Lifnr", sap.ui.model.FilterOperator.EQ, sValue);
            evt.getSource().getBinding("items").filter([oFilter]);
        },
        ConfSupplier: function (evt) {
            debugger;
            var oval = evt.getParameter("selectedItem").getProperty("title");
            var sSelecteddesc = evt.getParameter("selectedItem").getProperty("description");
            this.getView().getModel("LocalModel").setProperty("/Supplier", oval);
            this.getView().getModel("LocalModel").refresh(true);
            evt.getSource().getBinding("items").filter([]);
        },


        onOpenKeydate: function (oEvent) {
            this.Keydatef4 = null;
            if (!this.Keydatef4) {
                this.Keydatef4 = sap.ui.xmlfragment("zfisupaging.fragment.Keydate", this);
                this.getView().addDependent(this.Keydatef4);
            };
            this.Keydatef4.open();
        },
        onOpenCompanyCode: function (oEvent) {
            this.CompanyCodef4 = null;
            if (!this.CompanyCodef4) {
                this.CompanyCodef4 = sap.ui.xmlfragment("zfisupaging.fragment.CompanyCode", this);
                this.getView().addDependent(this.CompanyCodef4);
            };
            this.CompanyCodef4.open();
        },

        onOpenCurrency: function (oEvent) {
            this.Currencyf4 = null;
            if (!this.Currencyf4) {
                this.Currencyf4 = sap.ui.xmlfragment("zfisupaging.fragment.Currency", this);
                this.getView().addDependent(this.Currencyf4);
            };
            this.Currencyf4.open();
        },

        onOpenSupplier: function (oEvent) {
            this.Supplierf4 = null;
            if (!this.Supplierf4) {
                this.Supplierf4 = sap.ui.xmlfragment("zfisupaging.fragment.Supplier", this);
                this.getView().addDependent(this.Supplierf4);
            };
            this.Supplierf4.open();
        },

        onSearch: function (oEvent) {
            this.byId("smartTable").rebindTable();
        },

        getOdata: function (surl, smodelname, ofilter, stype) {
            return new Promise((resolve, reject) => {
                if (ofilter === null) {
                    this.showBusy(true);
                    this.getOwnerComponent().getModel().read(surl, {
                        success: function (oData) {
                            this.showBusy(false);
                            this.getOwnerComponent().getModel(smodelname).setProperty("/results", oData.results);
                            resolve(oData.results);
                        }.bind(this),
                        error: function (oError) {
                            this.showBusy(false);
                            reject();
                        }.bind(this)
                    });
                } else {
                    this.showBusy(true);
                    this.getOwnerComponent().getModel().read(surl, {
                        filters: [ofilter],
                        success: function (oData) {
                            this.showBusy(false);
                            this.getOwnerComponent().getModel(smodelname).setProperty("/results", oData.results);
                            resolve(oData.results);
                        }.bind(this),
                        error: function (oError) {
                            this.showBusy(false);
                            reject();
                        }.bind(this)
                    });
                }
            });
        },

        onBeforeRebindTable: function (oEvent) {
            var oBindingParams = oEvent.getParameter("bindingParams");
            var aFilters = this.buildFiltersForCustomFields();
            oBindingParams.filters = aFilters.concat(oBindingParams.filters);

            const oTable = oEvent.getSource().getTable();

            if (!this._bTotalHandlerAttached) {
                this._bTotalHandlerAttached = true;
                oTable.attachUpdateFinished(this._calculateAgingTotals, this);
            }
        },
        _calculateAgingTotals: function () {
            const oTable = this.byId("smartTable").getTable();
            const aItems = oTable.getItems();

            const totals = {
                NotDue: 0,
                col0to30: 0,
                col31to60: 0,
                col61to90: 0,
                col91to120: 0,
                col121to365: 0,
                col365: 0,
                Total: 0
            };


            aItems.forEach(oItem => {
                const oCtx = oItem.getBindingContext();
                if (!oCtx) return;

                const oData = oCtx.getObject();
                totals.NotDue += Number(oData.NotDue || 0);
                totals.col0to30 += Number(oData.col0to30 || 0);
                totals.col31to60 += Number(oData.col31to60 || 0);
                totals.col61to90 += Number(oData.col61to90 || 0);
                totals.col91to120 += Number(oData.col91to120 || 0);
                totals.col121to365 += Number(oData.col121to365 || 0);
                totals.col365 += Number(oData.col365 || 0);
                totals.Total += Number(oData.Total || 0);
                console.log(oItem.getBindingContext().getObject());

            });

            this._setFooterValues(totals);
        },
        _setFooterValues: function (totals) {
            this.byId("ftrNotDue").setText(totals.NotDue.toFixed(2));
            this.byId("ftr_col0to30").setText(totals.col0to30.toFixed(2));
            this.byId("ftr31_60").setText(totals.col31to60.toFixed(2));
            this.byId("ftr61_90").setText(totals.col61to90.toFixed(2));
            this.byId("ftr91_120").setText(totals.col91to120.toFixed(2));
            this.byId("ftr121_365").setText(totals.col121to365.toFixed(2));
            this.byId("ftr365").setText(totals.col365.toFixed(2));
            this.byId("ftrTotal").setText(totals.Total.toFixed(2));
        },
        buildFiltersForCustomFields: function () {
            var oFilterBar = this.getView().byId("fbPreqs");
            var aFilters = [];
            oFilterBar.getFilterGroupItems().forEach(function (oItem) {
                var oControl = oItem.getControl();
                var sControlType = oControl.getMetadata().getName();

                switch (sControlType) {
                    case "sap.m.Select":
                        var sKey1 = oControl.getSelectedKey();
                        if (sKey1) {
                            aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, sKey1));
                        }
                        break;
                    case "sap.m.MultiComboBox":
                        var oKey = oControl.getSelectedKey();
                        aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, oKey));
                        break;
                    case "sap.m.Input":
                        var sValue = oControl.getValue();
                        if (sValue && oItem.getName() !== 'Bukrs') {
                            aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, sValue));
                        }

                        break;
                    case "sap.m.ComboBox":
                        var sKey = oControl.getSelectedKey();
                        if (sKey) {
                            aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, sKey));
                        }

                        break;
                    case "sap.m.MultiInput":
                        var ovl = [];
                        var sfilterval = '';
                        if (oControl.getProperty("value") !== '') {
                            var ovl = oControl.getProperty("value").split(",");
                            for (var i = 0; i < ovl.length; i++) {
                                if (oControl.mBindingInfos.value.parts[0].path.split("/")[1] === 'month') {
                                    aFilters.push(new Filter("month", FilterOperator.BT, ovl[i].trim().split(" ")[0], ovl[i].trim().split(" ")[1]));
                                    // aFilters.push(new Filter("year", FilterOperator.EQ, ovl[i].trim().split(" ")[1]));
                                }
                                else {
                                    aFilters.push(new Filter(oControl.mBindingInfos.value.parts[0].path.split("/")[1], FilterOperator.EQ, ovl[i].trim()));
                                }

                            }
                        }
                        break;

                    case "sap.m.DateRangeSelection":
                        var oDateFrom = oControl.getDateValue();
                        var oDateTo = oControl.getSecondDateValue();
                        if (oDateFrom !== null && oDateTo !== null) {
                            aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, this.formatDate(oDateFrom)));
                            aFilters.push(new Filter(oItem.getName(), FilterOperator.EQ, this.formatDate(oDateTo)));
                        }


                        break;
                }
            }.bind(this));
            return aFilters;
        },
        onClearFilterBar: function (oEvent) {
            var oFilterBar = this.getView().byId("fbPreqs");
            oFilterBar.getFilterGroupItems().forEach(function (oItem) {
                var oControl = oItem.getControl();
                switch (oControl.getMetadata().getName()) {
                    case "sap.m.Input": oControl.setValue("");
                        break;
                    case "sap.m.DateRangeSelection": oControl.setDateValue(null);
                        oControl.setSecondDateValue(null);
                        break;
                    case "sap.m.MultiInput": oControl.setValue("");
                        break;
                    case "sap.m.ComboBox": oControl.setSelectedKey("");
                        break;
                    case "sap.m.MultiComboBox": oControl.setSelectedKeys("");
                        break;
                    case "sap.m.Select": oControl.setSelectedKey("");
                        break;
                }
            });
            this.getOwnerComponent().getModel("LocalModel").setProperty("/Companycode", "5910");
            this.getOwnerComponent().getModel("LocalModel").setProperty("/P_DateFunction", "TODAY");
            this.getOwnerComponent().getModel("LocalModel").setProperty("/Displaycurrency", "SAR");
            this.getOwnerComponent().getModel("LocalModel").refresh();
        },

        onExport: function (OEvt) {
            var ofilters = this.buildFiltersForCustomFields();

            this.getOdata("/AgeingSet", "Supplier", ofilters).then((res) => {

                var aCols,
                    aData,
                    oSettings;

                aCols = this.createColumnConfig();
                aData = res;


                oSettings = {
                    workbook: {
                        columns: aCols
                    },
                    dataSource: aData,
                    fileName: "Supplier Aging Report"
                };

                new Spreadsheet(oSettings).build().then(function () {
                    MessageToast.show("Export has finished");
                });

            });
        },
        createColumnConfig: function () {
            return [
                { property: "Supplier", label: "Supplier" },
                { property: "Suppliername", label: "Supplier Name" },
                { property: "Displaycurrency", label: "Display Currency" },
                { property: "NotDue", label: "Not Due" },
                { property: "col0to30", label: "0-30" },
                { property: "col31to60", label: "31-60" },
                { property: "col61to90", label: "61-90" },
                { property: "col91to120", label: "91-120" },
                { property: "col121to365", label: "121-365" },
                { property: "col365", label: ">365" },
                { property: "Total", label: "Total" },
                { property: "TypeLocalForeign", label: "Type Local/Foreign" },
                { property: "Typeofservicesdesc", label: "Type of services" }


            ];
        },
        getRouter: function () {
            return this.getOwnerComponent().getRouter()
        },
        getModel: function (e) {
            return this.getView().getModel(e)
        },
        setModel: function (e, t) {
            return this.getView().setModel(e, t)
        },
        showBusy: function (bBusy) {
            if (bBusy) {
                sap.ui.core.BusyIndicator.show(0);
            } else {
                sap.ui.core.BusyIndicator.hide();
            }
        },
        getText: function (sProperty, aArgs) {
            if (!this._oResourceBundle) {
                this._oResourceBundle = this.getModel("i18n").getResourceBundle();
            }
            return this._oResourceBundle.getText(sProperty, aArgs);
        },

        getResourceBundle: function (sText) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle()
        },

    });
});