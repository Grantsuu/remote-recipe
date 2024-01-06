package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Recipe struct {
	ID     uint   `gorm:"primaryKey"`
	Name   string `gorm:"not null"`
	Author string `gorm:"not null"`
}

func main() {
	dsn := "host=localhost user=postgres password=your_password dbname=your_database port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}

	// Auto migrate the Recipe model
	db.AutoMigrate(&Recipe{})

	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/recipes", func(c *gin.Context) {
		var recipes []Recipe
		db.Find(&recipes)
		c.JSON(200, recipes)
	})

	r.Run(":8080")
}
