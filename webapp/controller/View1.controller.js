sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";
     var that;      
    return Controller.extend("trainingoncapmui5.controller.View1", {
        onInit: function () {
           that = this;
        },
        onUpdate:()=>{
                that.byId("_IDGenButton1").setText("Update")
               let get_key = that.byId("_IDGenTable1").getSelectedItem().getCells()[0].getProperty('text')
               that.byId("_IDGenInput1").setValue(that.byId("_IDGenTable1").getSelectedItem().getCells()[1].getProperty('text'))
               that.byId("_IDGenInput2").setValue(that.byId("_IDGenTable1").getSelectedItem().getCells()[2].getProperty('text'))
               that.byId("_IDGenInput3").setValue(that.byId("_IDGenTable1").getSelectedItem().getCells()[3].getProperty('text'))

        },
        onDelete:()=>{
            let get_key = that.byId("_IDGenTable1").getSelectedItem().getCells()[0].getProperty('text')

            that.getOwnerComponent().getModel().remove('/User_Data('+get_key+")",{
                success:(response)=>{
                    console.log(response)
                   
                },
                error:(err)=>{
                    console.log(err)
                }
            })
        },
        onCreate:()=>{
            let username = that.byId("_IDGenInput1").getValue();
            let email = that.byId("_IDGenInput2").getValue();
            let contact = that.byId("_IDGenInput3").getValue();
            let pass = that.byId("_IDGenInput4").getValue();

            let payload ={
                USER_NAME:username,
                USER_EMAIL:email,
                USER_CONT:contact,
                USER_PASS:pass
            }

            if (that.byId("_IDGenButton1").getText()=="Update") {
                let get_key = that.byId("_IDGenTable1").getSelectedItem().getCells()[0].getProperty('text')
                that.getOwnerComponent().getModel().update('/User_Data('+get_key+")",payload,{
                    success:(response)=>{
                        console.log(response)
                        that.byId("_IDGenButton1").setText("Create")
                    },
                    error:(err)=>{
                        console.log(err)
                    }
                })

            } else {
                that.getOwnerComponent().getModel().create('/User_Data',payload,{
                    success:(response)=>{
                        console.log(response)
                    },
                    error:(err)=>{
                        console.log(err)
                    }
                })
            }

     
        }
    });
});
