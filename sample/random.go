package sample

import (
	"math/rand"
	"time"
)

const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

func init() {
	rand.Seed(time.Now().UnixNano())
}
func randomString(length int) string {
	var s string
	for i := 0; i < length; i++ {
		s += string(options[rand.Intn(len(options))])
	}

	return s
}
