FROM mcr.microsoft.com/devcontainers/base:dev-bookworm

SHELL ["/bin/bash", "-lc"]

RUN apt-get update -q && \
		export DEBIAN_FRONTEND=noninteractive && \
    apt-get install -y --no-install-recommends \ 
		curl ca-certificates openssl git && \
	apt-get autoremove -y && \
	apt-get clean -y && \
	rm -rf /var/lib/apt/lists/* \
		/root/.gnupg \
		/tmp/library-scripts

WORKDIR /home/vscode

USER vscode
RUN git clone --depth 1 "https://github.com/asdf-vm/asdf.git" "$HOME/.asdf" && \
    echo ". $HOME/.asdf/asdf.sh" >> "$HOME/.bashrc" && \
		echo ". $HOME/.asdf/completions/asdf.bash" >> "$HOME/.bashrc"

RUN /bin/bash -lc "\
    source $HOME/.asdf/asdf.sh && \
    asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git && \
    asdf plugin-add yarn && \
    asdf plugin-add awscli && \
    asdf plugin-add python"

COPY --link .tool-versions /home/vscode/.tool-versions
RUN /bin/bash -lc "\
    source $HOME/.asdf/asdf.sh && \
		asdf install"
