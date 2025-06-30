APP_NAME=nextyou
DOCKER_COMPOSE=docker compose

up:
	$(DOCKER_COMPOSE) up -d --build

dev:
	$(DOCKER_COMPOSE) up -d

restart: down dev

stop:
	$(DOCKER_COMPOSE) stop

down:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f $(APP_NAME)

tty:
	$(DOCKER_COMPOSE) exec $(APP_NAME) sh
