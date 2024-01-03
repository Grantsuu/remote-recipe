# remote-recipe
A simple webapp to store and display recipes.
## Steps to setup on a remote
There are the instructions for setting up this web application on a dresh Digital Ocean Droplet using Ubuntu.
### Connect to the remote
1. Ensure Droplet is started and assigned a Reserved IP
2. SSH into the Droplet
    - Refer to https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/ if you need help connecting to the Droplet
    - If using VS Code, ensure the config file is set up properly:
        - **Host** - ``<Droplet name>``
        - **HostName** - ``<Droplet IP Address>``
        - **User** - ``<Default Droplet user>``
### Download the code
1. In the terminal, setup a new directory ``repos`` and enter it by typing the following:
    ```
    mkdir repos
    cd repos
    ```
2. Clone the git repository by typing the following:
    ```
    git clone https://github.com/Grantsuu/remote-recipe.git
    ```
3. Configure git with email and user name:
    ```
    git config --global user.email "you@example.com"
    git config --global user.name "Your Name"
    ```
### Install necessary packages
1. Download and install the following packages. Refer to the links if assistance is required on individual packages.
    - Update/upgrade packages
        ```
        sudo apt update
        sudo apt upgrade
        ```
        - If some packages don't upgrade (i.e. ``The following packages have been kept back:``) try running the following command:
            ```
            sudo apt-get --with-new-pkgs upgrade <list of packages kept back>
            ```
    - Docker
        - https://www.digitalocean.com/community/tutorial-collections/how-to-install-and-use-docker
    - Postgres
        ```
        sudo apt install postgresql postgresql-contrib
        ```
        - https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart
    - Golang
        ```
        sudo apt install golang
        ```
        - If using VS Code, intall ``gopls`` as well to enable editor features:
            ```
            go install golang.org/x/tools/gopls@latest
            ```
    - Node
        ```
        sudo apt install npm
        ```
2. After installing everything succesfully, it may be a good idea to reboot the Droplet
    