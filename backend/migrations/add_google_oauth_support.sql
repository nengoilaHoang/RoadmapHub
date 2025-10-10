-- Migration: Add Google OAuth support to Account table
-- Run this SQL script in your MySQL database

-- Add googleId column
ALTER TABLE Account 
ADD COLUMN googleId VARCHAR(255) NULL UNIQUE AFTER email,
ADD COLUMN picture VARCHAR(500) NULL AFTER googleId;

-- Add index for faster lookups
CREATE INDEX idx_google_id ON Account(googleId);

-- Make password nullable for Google accounts
ALTER TABLE Account 
MODIFY COLUMN password VARCHAR(255) NULL;

-- Add comment
ALTER TABLE Account
MODIFY COLUMN googleId VARCHAR(255) NULL COMMENT 'Google User ID from OAuth2';

ALTER TABLE Account 
MODIFY COLUMN picture VARCHAR(500) NULL COMMENT 'Profile picture URL from Google';
