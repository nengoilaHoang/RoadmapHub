-- Migration: Create RefreshToken table
-- Run this SQL script in your MySQL database

CREATE TABLE IF NOT EXISTS RefreshToken (
    id VARCHAR(36) PRIMARY KEY,
    accountId VARCHAR(36) NOT NULL,
    token TEXT NOT NULL,
    expiresAt DATETIME NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    isRevoked TINYINT(1) DEFAULT 0,
    deviceInfo VARCHAR(255) NULL,
    ipAddress VARCHAR(45) NULL,
    
    INDEX idx_account_id (accountId),
    INDEX idx_expires_at (expiresAt),
    INDEX idx_token (token(255))
);

-- Add foreign key constraint separately
ALTER TABLE RefreshToken 
ADD CONSTRAINT fk_refresh_token_account 
FOREIGN KEY (accountId) REFERENCES Account(id) ON DELETE CASCADE;

-- Add index for faster token lookup
CREATE INDEX idx_account_token ON RefreshToken(accountId, isRevoked);
