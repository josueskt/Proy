# Variables para ejecutar comandos
DC = docker-compose
DC_FILE = -f docker-compose_all.yml

.PHONY: build up down clean logs


build:
	$(DC) $(DC_FILE) build


up:
	$(DC) $(DC_FILE) up -d


down:
	$(DC) $(DC_FILE) down


clean:
	$(DC) $(DC_FILE) down --rmi all --volumes --remove-orphans


logs:
	$(DC) $(DC_FILE) logs -f


