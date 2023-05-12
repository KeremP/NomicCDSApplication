build:
	@echo "Building FastAPI docker image..."
	docker build -t nomiccdsapplication ./backend
	@echo "Building Node docker image"
	docker build -t nomiccdsapplicationnode ./frontend/nomiccds

run:
	@echo "Starting backend @ localhost:8000..."
	docker run -d --name nomiccdsbackend -p 8000:8000 nomiccdsapplication
	@echo "Starting nextjs dev environ..."
	docker run -d --name nomiccdsfrontend -p 3000:3000 nomiccdsapplicationnode
	@echo "Application running at localhost:3000"
