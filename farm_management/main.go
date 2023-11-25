package main

import (
	"embed"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/cmd"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	go func() {
		pocketBaseApp := pocketbase.New()
		isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())
		migratecmd.MustRegister(pocketBaseApp, pocketBaseApp.RootCmd, migratecmd.Config{
			// enable auto creation of migration files when making collection changes in the Admin UI
			// (the isGoRun check is to enable it only during development)
			Automigrate: isGoRun,
		})
		pocketBaseApp.Bootstrap()

		pocketBaseApp.OnBeforeServe().Add(addUsage(pocketBaseApp))
		pocketBaseApp.OnBeforeServe().Add(getIndvYieldByType(pocketBaseApp))

		serveCmd := cmd.NewServeCommand(pocketBaseApp, true)
		serveCmd.Execute()
	  }()
	
	

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "farm_management",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
