package database

import (
	"time"
)

type Torrent struct {
	// Specific stuff to protocol
	// Hash of everything in this struct except Signature
	Hash string
	// Representation of public key which uploaded the torrent
	PublicKey string
	// Signature from PublicKey
	Signature string

	// Torrent information
	MagnetLink  string
	Name        string
	Description string
	CategoryID  uint64
	Size        uint64
	FileCount   uint64
	CreatedAt   time.Time
	Tags        []string
}

type Database interface {
	Get(hash string) (*Torrent, error)
	Add(t *Torrent)
	List() []string
}
