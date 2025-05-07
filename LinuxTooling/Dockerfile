# Python/Dockerfile
FROM debian:bullseye

RUN apt update && apt upgrade -y && \
    apt install -y curl git zsh neovim sudo openssh-server locales python3.9 python3-pip

EXPOSE 2222
CMD ["/bin/bash"]
