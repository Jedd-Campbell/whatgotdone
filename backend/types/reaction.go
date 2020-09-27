package types

import "time"

// Reaction to an entity in What Got Done, such as a user liking a journal entry.
type Reaction struct {
	Username     string    `json:"username" firestore:"username,omitempty"`
	Symbol       string    `json:"symbol" firestore:"symbol,omitempty"`
	CreationTime time.Time `json:"creationTime" firestore:"timestamp"`
}
