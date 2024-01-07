# Helpful Commands
This file contains a list of commands I found useful while developing this application.
- Check diskspace of top level directories:
    ```
    du -h -d 1
    ```
- Run docker containers
    ```
    # Create a network, which allows containers to communicate
    # with each other, by using their container name as a hostname
    docker network create my_network

    # Build dev
    docker compose -f docker-compose.dev.yml build

    # Up dev
    docker compose -f docker-compose.dev.yml up
    ```