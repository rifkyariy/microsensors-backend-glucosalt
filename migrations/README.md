# Database Migrations

This folder contains SQL migration scripts for Supabase PostgreSQL database.

## How to Run Migrations

### Option 1: Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the content of `001_initial_schema.sql`
4. Click "Run" to execute the migration

### Option 2: Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migration
supabase db push --db-url postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

### Option 3: Direct PostgreSQL Connection
```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres" < migrations/001_initial_schema.sql
```

## Schema Overview

### Tables
- **users**: User profiles with physical attributes
- **bmi_records**: BMI tracking history
- **diet_records**: Food intake logs
- **food_database**: Reference table for common foods

### Security
- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- Food database is publicly readable
- Service role has full access for backend operations
