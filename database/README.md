# Database SQL Files

This directory contains the SQL files required to set up and configure the project's Supabase database.

## Files

### `supabase.sql`

The main database setup file.

Use this file to create the core tables, functions, policies, indexes, and other required database objects.

### `supabase_vote_premium.sql`

This file contains the database setup related to the **Vote Premium** system.

Run this after `supabase.sql` if you want to enable the vote-based premium functionality.

---

## How to Use

### 1. Open Supabase

Open your Supabase project dashboard and go to:

**SQL Editor → New Query**

### 2. Run `supabase.sql`

Open:

```text
database/supabase.sql
```

Copy its contents and paste them into the Supabase SQL Editor.

Run the query.

### 3. Run `supabase_vote_premium.sql`

After the main database setup is complete, open:

```text
database/supabase_vote_premium.sql
```

Copy its contents into a new SQL Editor query and run it.

> Run `supabase.sql` first, then `supabase_vote_premium.sql`.

---

## Recommended Order

```text
1. supabase.sql
2. supabase_vote_premium.sql
```

Running them in this order helps ensure that any tables or database objects required by the Vote Premium system already exist.

## Important

Before running SQL files on an existing production database:

* Review the SQL carefully.
* Back up important data.
* Check whether tables or policies already exist.
* Avoid running destructive statements such as `DROP TABLE` unless you understand their effects.
* Make sure you are connected to the correct Supabase project.

## Project Structure

```text
Eleone-main/
├── database/
│   ├── README.md
│   ├── supabase.sql
│   └── supabase_vote_premium.sql
├── docs/
├── src/
├── website/
├── package.json
└── README.md
```
