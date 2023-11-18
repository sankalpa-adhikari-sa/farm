package main

import (
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)
func addUsage(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
		e.Router.POST("/custom_records/", resourceUsageTransaction(app) )
		return nil
	}
}
func hello(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
		e.Router.GET("/agi/collections/hello/", sayHello(app))
		return nil
}
}



// func resourceUsageTransaction(app *pocketbase.PocketBase) func(c echo.Context) error {
//     return func(c echo.Context) error {
//         var record *models.Record
//         txErr := app.Dao().RunInTransaction(func(txDao *daos.Dao) error {
//             usageCollection, err := app.Dao().FindCollectionByNameOrId("resource_usage")
//             if err != nil {
//                 return apis.NewNotFoundError("Failed to fetch resource_usage collection.", err)
//             }

//             // Use the existing 'record' variable, don't redeclare it
//             record = models.NewRecord(usageCollection)

//             form := forms.NewRecordUpsert(app, record)

//             if err := form.LoadRequest(c.Request(), ""); err != nil {
//                 return apis.NewBadRequestError("Failed to load the submitted data.", err)
//             }

//             if err := form.Submit(); err != nil {
//                 return apis.NewBadRequestError("Failed to create the record.", err)
//             }

//             return nil
//         })

//         if txErr != nil {
//             return txErr
//         }

//         return c.JSON(http.StatusOK, record)
//     }
// }


/////////////////////////////////////////////////////////
//This works...

func resourceUsageTransaction(app *pocketbase.PocketBase) func(c echo.Context) error {
	return func(c echo.Context) error {
			usageCollection, err := app.Dao().FindCollectionByNameOrId("resource_usage")
			if err != nil {
				return apis.NewNotFoundError("Failed to fetch resource_usage collection.", err)
			}
			// create new record 
			record := models.NewRecord(usageCollection)	
			form := forms.NewRecordUpsert(app, record)
			// load JSON data to form
			if err := form.LoadRequest(c.Request(), ""); err != nil {
				return apis.NewBadRequestError("Failed to load the submitted data.", err)
			}
			resourceID  := form.Data()["resource"].(string)
			usageQty := form.Data()["usage_quantity"].(float64)
			

			// validate and submit (internally it calls app.Dao().SaveRecord(record) in a transaction)
			if err := form.Submit(); err != nil {
				return apis.NewBadRequestError("Failed to create the record.", err)
			}

			//Here comes another collection record
			//fetching resource record
			resourceDataRecord, err := app.Dao().FindRecordById("resource", resourceID)
			resourceForm := forms.NewRecordUpsert(app, resourceDataRecord)
			currentQty := resourceForm.Data()["current_quantity"].(float64)
			//calculating the resource quantity after usage
			currentQty= currentQty-usageQty

			// targeting only current_quantity value for updating
			if err := resourceForm.LoadData(map[string]any{
				"current_quantity": currentQty,				
			}); err != nil {
				return apis.NewBadRequestError("Failed to load the submitted data.", err)
			}
			//Updating the Resource Record
			if err := resourceForm.Submit(); err != nil {
				return apis.NewBadRequestError("Failed to create the record.", err)
			}
			
			
			//here ends the another collection
			
			return  c.JSON(http.StatusOK, record)
		

	}
}
func sayHello(app *pocketbase.PocketBase) func(c echo.Context) error {
	return  func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, world!")
	}
}