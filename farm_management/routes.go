package main

import (
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)
func hello(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
		e.Router.POST("/api/collections/resource_usage/custom_records/", resourceUsageTransaction(app) ,)
		return nil
	}
}

func resourceUsageTransaction(app *pocketbase.PocketBase) func(c echo.Context) error {
	return func(c echo.Context) error {
		usageCollection, err := app.Dao().FindCollectionByNameOrId("resource_usage")
		if err != nil {
			return apis.NewNotFoundError("Failed to fetch resource_usage collection.", err)
		}
		// resourceCollection, err := app.Dao().FindCollectionByNameOrId("resource")
		// if err != nil {
		// 	return apis.NewNotFoundError("Failed to fetch resource_usage collection.", err)
		// }
		app.Dao().RunInTransaction(func(txDao *daos.Dao) error {
				// create new record 
				record := models.NewRecord(usageCollection)
				form := forms.NewRecordUpsert(app, record)
				form.LoadRequest(c.Request(), "")
		
				// validate and submit (internally it calls app.Dao().SaveRecord(record) in a transaction)
				if err := form.Submit(); err != nil {
					return err
				}
		
		
			return  c.JSON(http.StatusOK, record)
		})

		//Now use transaction to create a record and reduce the value in another collection record
		return nil
	}
}