
-- OrganicFarming Database Schema
-- Run this only in the organicfarming database.

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    unit VARCHAR(30) NOT NULL DEFAULT 'kg',
    quantity NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    price NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    field_name VARCHAR(100),
    planting_date DATE,
    expected_harvest_date DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'Planned'
        CHECK (status IN ('Planned', 'Growing', 'Harvested')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stock_movements (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    movement_type VARCHAR(10) NOT NULL
        CHECK (movement_type IN ('IN', 'OUT')),
    quantity NUMERIC(12, 2) NOT NULL CHECK (quantity > 0),
    notes TEXT,
    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
