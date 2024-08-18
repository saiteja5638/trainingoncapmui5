sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";
        var that;
        return Controller.extend("trainingoncapmui5.controller.View1", {
            onInit: function () {
                that = this;
                that.arr = [];

                if (!that.Sample) {
                    that.Sample = sap.ui.xmlfragment("trainingoncapmui5.view.create", that);
                }
            },
            onUpdate: () => {
                that.byId("_IDGenButton1").setText("Update")
                let get_key = that.byId("_IDGenTable1").getSelectedItem().getCells()[0].getProperty('text')
                that.byId("_IDGenInput1").setValue(that.byId("_IDGenTable1").getSelectedItem().getCells()[1].getProperty('text'))
                that.byId("_IDGenInput2").setValue(that.byId("_IDGenTable1").getSelectedItem().getCells()[2].getProperty('text'))
                that.byId("_IDGenInput3").setValue(that.byId("_IDGenTable1").getSelectedItem().getCells()[3].getProperty('text'))

            },
            onDelete: () => {
                let get_key = that.byId("_IDGenTable1").getSelectedItems()
               

                get_key.forEach(i=>{
                    let key = i.getCells()[0].getText()
                    that.getOwnerComponent().getModel().remove('/User_Data(' + key + ")", {
                        success: (response) => {
                            console.log(response)
    
                        },
                        error: (err) => {
                            console.log(err)
                        }
                    })
                })

          
            },
            onTriggerCreate: function () {
                that.Sample.open()

                if (that.byId("_IDGenButton3").getText("Update")) {
                    let update = [];
                    let table = that.byId("_IDGenTable1").getSelectedItems();
                    table.forEach(i => {
                        let obj = {
                            ID:i.getCells()[0].getProperty('text'), 
                            name: i.getCells()[1].getProperty("text"),
                            email: i.getCells()[2].getProperty("text"),
                            contact:i.getCells()[3].getProperty("text"),
                        }
                        update.push(obj)
                    })

                    let oModel = new sap.ui.model.json.JSONModel({
                        items:update
                    })

                    sap.ui.getCore().byId("FragmentTable").setModel(oModel)

                }
            },
            onCloseFrag: function () {
                that.Sample.close()
            },
            onChange: function () {
                that.byId("_IDGenButton3").setText("Update")
            },
            onAddUser: function () {
                let obj = {
                    name: "**5",
                    email: "@gmail.com",
                    contact: 7895,
                    pass: "***"
                }

                that.arr.push(obj)

                let oModel = new sap.ui.model.json.JSONModel({
                    items: that.arr
                })

                sap.ui.getCore().byId("FragmentTable").setModel(oModel)
            },
            onSubmitUser: function () {
                let username = sap.ui.getCore().byId("_IDGenInput1").getValue()
                let email = sap.ui.getCore().byId("_IDGenInput2").getValue()
                let contact = sap.ui.getCore().byId("_IDGenInput3").getValue()
                let password = sap.ui.getCore().byId("_IDGenInput4").getValue()

                let user_payload = {
                    USER_NAME: username,
                    USER_EMAIL: email,
                    USER_CONT: contact,
                    USER_PASS: password
                }

                if (that.byId("_IDGenButton3").getText("Update")) {
                    let get_key = that.byId("_IDGenTable1").getSelectedItem().getCells()[0].getProperty('text')
                    that.getOwnerComponent().getModel().update('/User_Data(' + get_key + ")", user_payload, {
                        success: (response) => {
                            console.log(response)
                            that.byId("_IDGenButton3").setText("Create")
                            that.Sample.close()
                        },
                        error: (err) => {
                            console.log(err)
                        }
                    })
                }
                else {
                    that.getOwnerComponent().getModel().create('/User_Data', user_payload, {
                        success: function (respose) {
                            console.log(respose)
                            that.Sample.close()
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })
                }



                console.log(user_payload)
            },
            onCreate: () => {
                let username = that.byId("_IDGenInput1").getValue();
                let email = that.byId("_IDGenInput2").getValue();
                let contact = that.byId("_IDGenInput3").getValue();
                let pass = that.byId("_IDGenInput4").getValue();

                let payload = {
                    USER_NAME: username,
                    USER_EMAIL: email,
                    USER_CONT: contact,
                    USER_PASS: pass
                }

                if (that.byId("_IDGenButton1").getText() == "Update") {
                    let get_key = that.byId("_IDGenTable1").getSelectedItem().getCells()[0].getProperty('text')
                    that.getOwnerComponent().getModel().update('/User_Data(' + get_key + ")", payload, {
                        success: (response) => {
                            console.log(response)
                            that.byId("_IDGenButton1").setText("Create")
                        },
                        error: (err) => {
                            console.log(err)
                        }
                    })

                } else {
                    that.getOwnerComponent().getModel().create('/User_Data', payload, {
                        success: (response) => {
                            console.log(response)
                        },
                        error: (err) => {
                            console.log(err)
                        }
                    })
                }


            },
            onMultipleSubmit: () => {
                let TableData = sap.ui.getCore().byId("FragmentTable").getItems();

                let allpayload_data = [];

                TableData.forEach(element => {
                    let payload = {
                        ID:element.getCells()[0].getValue(),
                        USER_NAME: element.getCells()[1].getValue(),
                        USER_EMAIL: element.getCells()[2].getValue(),
                        USER_CONT: element.getCells()[3].getValue(),
                        USER_PASS: element.getCells()[4].getValue()
                    }
                    allpayload_data.push(payload)
                });

                if ( that.byId("_IDGenButton3").getText()=="Update") {

                    allpayload_data.forEach(element => {
                        that.getOwnerComponent().getModel().update('/User_Data('+ element.ID +")", element, {
                            success: function (response) {
                                console.log(response)
                            },
                            error: function (error) {
                                console.log(error)
                            }
                        })
                    })
                    
                } else {
                    allpayload_data.forEach(element => {
                        delete element.ID;
                        that.getOwnerComponent().getModel().create('/User_Data', element, {
                            success: function (response) {
                                console.log(response)
                            },
                            error: function (error) {
                                console.log(error)
                            }
                        })
                    })
                }
                that.Sample.close()
                that.byId("_IDGenButton3").setText("Create")
            }
        });
    });
