package main

import (
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)
func addUsage(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
		e.Router.POST("/custom_records/", resourceUsageTransaction(app),apis.RequireRecordAuth())
		return nil
	}
}
// to use api/collection...... need to be admin so using agi instead of api for now
func getIndvYieldByType(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
		e.Router.GET("/api/collections/yield/totalyieldbylivestock/:id", yieldTotalByType(app),apis.RequireRecordAuth())
		return nil
}
}
func yieldTotalByType(app *pocketbase.PocketBase)  func(c echo.Context) error {
	return func(c echo.Context) error {
		id := c.PathParam("id")
		type YIELD struct {
			LivestockId     string          `db:"livestock_id" json:"livestock_id"`
			YieldUnit     string          `db:"yield_unit" json:"yield_unit"`
			Yieldtype string            `db:"yield_type" json:"yield_type"`
			TotalYield    float64        `db:"total_yield" json:"total_yield"`
			TotalLoss    float64        `db:"total_loss" json:"total_loss"`
			TotalExpectedRevenue    float64        `db:"total_expected_revenue" json:"total_expected_revenue"`
		}
		result := []YIELD{}

		err:= app.Dao().DB().NewQuery("SELECT livestock as livestock_id,yield_unit,yield_type,SUM(net_yield_quantity) as total_yield,SUM(yield_loss_quantity) as total_loss,SUM(expected_revenue) as total_expected_revenue FROM yield WHERE livestock = {:livestock_id} GROUP BY livestock_id, yield_type").
		Bind(dbx.Params{"livestock_id": id}).
		All(&result)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	}
}
func getIndvRUTotalByRT(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
		e.Router.GET("/api/collections/resource_usage/IndvRUTotalByRT/:id", RUTotalByResourceType(app),apis.RequireRecordAuth())
		return nil
}
}
func RUTotalByResourceType(app *pocketbase.PocketBase)  func(c echo.Context) error {
	return func(c echo.Context) error {
		id := c.PathParam("id")
		type YIELD struct {
			LivestockId     string          `db:"livestock_id" json:"livestock_id"`
			Resourcetype string            `db:"resource_type" json:"resource_type"`
			TotalUsagePrice    float64        `db:"total_usage_price" json:"total_usage_price"`
		}
		result := []YIELD{}

		err:= app.Dao().DB().NewQuery("SELECT livestock as livestock_id,resource_type,SUM(price) as total_usage_price FROM resource_usage WHERE livestock = {:livestock_id} GROUP BY livestock_id, resource_type").
		Bind(dbx.Params{"livestock_id": id}).
		All(&result)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	}
}
func getIndvRUTotalByR(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
		e.Router.GET("/api/collections/resource_usage/IndvRUTotalByR/:id", RUTotalByResource(app),apis.RequireRecordAuth())
		return nil
}
}
func RUTotalByResource(app *pocketbase.PocketBase)  func(c echo.Context) error {
	return func(c echo.Context) error {
		id := c.PathParam("id")
		type YIELD struct {
			LivestockId     string          `db:"livestock_id" json:"livestock_id"`
			Resourcetype string            `db:"resource_type" json:"resource_type"`
			ResourceId string            `db:"resourceId" json:"resourceId"`
			ResourceName string            `db:"resource_name" json:"resource_name"`
			QuanityUnit string            `db:"quantity_unit" json:"quantity_unit"`
			TotalUsagePrice    float64        `db:"total_usage_price" json:"total_usage_price"`
			TotalUsageQuantity    float64        `db:"total_usage_quantity" json:"total_usage_quantity"`

		}
		result := []YIELD{}

		err:= app.Dao().DB().NewQuery("SELECT livestock as livestock_id,resource_type,resource_name,quantity_unit,resource as resourceId,SUM(price) as total_usage_price,SUM(usage_quantity) as total_usage_quantity FROM resource_usage WHERE livestock = {:livestock_id} GROUP BY livestock_id, resource").
		Bind(dbx.Params{"livestock_id": id}).
		All(&result)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	}
}

//// do same thing for for Resources, i.e RUTotalByResourceType  == groub by resource >>> livestock_id, resource_type, total_usage_price, total_usage_amount


/////////////////////////////////////////////////////////
//This works... (Not safe, Need to use Transactions)
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
