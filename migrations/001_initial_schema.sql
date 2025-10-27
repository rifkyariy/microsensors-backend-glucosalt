-- GlucosAlt Database Schema Migration
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    age INTEGER,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    height DECIMAL(5,2), -- height in meters
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BMI Records table
CREATE TABLE IF NOT EXISTS bmi_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    weight DECIMAL(5,2) NOT NULL, -- weight in kg
    bmi DECIMAL(5,2) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Diet Records table
CREATE TABLE IF NOT EXISTS diet_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    food_name TEXT NOT NULL,
    calories DECIMAL(7,2) NOT NULL,
    carbs DECIMAL(6,2) DEFAULT 0,
    protein DECIMAL(6,2) DEFAULT 0,
    fat DECIMAL(6,2) DEFAULT 0,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Food Database table
CREATE TABLE IF NOT EXISTS food_database (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    calories DECIMAL(7,2) NOT NULL,
    carbs DECIMAL(6,2) DEFAULT 0,
    protein DECIMAL(6,2) DEFAULT 0,
    fat DECIMAL(6,2) DEFAULT 0,
    serving_size TEXT NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bmi_records_user_id ON bmi_records(user_id);
CREATE INDEX IF NOT EXISTS idx_bmi_records_recorded_at ON bmi_records(recorded_at);
CREATE INDEX IF NOT EXISTS idx_diet_records_user_id ON diet_records(user_id);
CREATE INDEX IF NOT EXISTS idx_diet_records_recorded_at ON diet_records(recorded_at);
CREATE INDEX IF NOT EXISTS idx_diet_records_meal_type ON diet_records(meal_type);
CREATE INDEX IF NOT EXISTS idx_food_database_name ON food_database(name);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bmi_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE diet_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_database ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- BMI records policies
CREATE POLICY "Users can view their own BMI records" ON bmi_records
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own BMI records" ON bmi_records
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own BMI records" ON bmi_records
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own BMI records" ON bmi_records
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- Diet records policies
CREATE POLICY "Users can view their own diet records" ON diet_records
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own diet records" ON diet_records
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own diet records" ON diet_records
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own diet records" ON diet_records
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- Food database policies (public read access)
CREATE POLICY "Anyone can view food database" ON food_database
    FOR SELECT USING (true);

-- Service role can bypass RLS for admin operations
CREATE POLICY "Service role has full access to users" ON users
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role has full access to bmi_records" ON bmi_records
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role has full access to diet_records" ON diet_records
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role has full access to food_database" ON food_database
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');
