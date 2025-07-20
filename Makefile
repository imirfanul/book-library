# Makefile for Font & Book Management System

.PHONY: help install dev build start stop clean logs db-migrate db-seed docker-build docker-up docker-down

# Default target
help:
	@echo "Available commands:"
	@echo "  install      - Install all dependencies"
	@echo "  dev          - Start development servers"
	@echo "  build        - Build the application"
	@echo "  start        - Start production servers"
	@echo "  stop         - Stop all services"
	@echo "  clean        - Clean up containers and volumes"
	@echo "  logs         - Show logs from all services"
	@echo "  db-migrate   - Run database migrations"
	@echo "  db-seed      - Seed the database"
	@echo "  docker-build - Build Docker images"
	@echo "  docker-up    - Start Docker services"
	@echo "  docker-down  - Stop Docker services"

# Install dependencies
install:
	npm install
	cd backend && npm install

# Development
dev:
	docker-compose up -d postgres adminer
	npm run dev

# Build application
build:
	npm run build
	cd backend && npm run build

# Start production
start:
	docker-compose up -d

# Stop services
stop:
	docker-compose down

# Clean up
clean:
	docker-compose down -v
	docker system prune -f

# Show logs
logs:
	docker-compose logs -f

# Database operations
db-migrate:
	cd backend && npm run db:migrate

db-seed:
	cd backend && npm run db:seed

# Docker operations
docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

# Development with Docker
dev-docker:
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Development database and Adminer started"
	@echo "Adminer: http://localhost:8081"
	@echo "Database: localhost:5433"