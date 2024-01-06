package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Recipe struct {
	ID          uint   `gorm:"primaryKey"`
	Name        string `gorm:"not null"`
	Description string
	Ingredients string
	Directions  string
}

func main() {
	dsn := "host=database user=myuser password=mypassword dbname=postgres port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}

	// Auto migrate the Recipe model
	db.AutoMigrate(&Recipe{})

	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/api/recipes", func(c *gin.Context) {
		var recipes []Recipe
		db.Find(&recipes)
		c.JSON(http.StatusOK, recipes)
	})

	r.Run(":8080")
}
