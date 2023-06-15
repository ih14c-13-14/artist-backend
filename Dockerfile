# syntax = docker/dockerfile:1.4

ARG NODE_VERSION=18.16.0-bullseye

FROM --platform=$BUILDPLATFORM node:${NODE_VERSION} AS builder

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
	--mount=type=cache,target=/var/lib/apt,sharing=locked \
	rm -f /etc/apt/apt.conf.d/docker-clean \
	; echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache \
	&& apt-get update \
	&& apt-get install -yqq --no-install-recommends \
	build-essential

RUN corepack enable

WORKDIR /artist

COPY --link ["yarn.lock", "package.json", "./"]
COPY --link . .

RUN yarn install --frozen-lockfile --non-interactive --production=false \
	&& yarn cache clean \
	&& yarn prisma generate

ARG NODE_ENV=production

RUN git submodule update --init
RUN pnpm build
RUN rm -rf .git/

FROM --platform=$TARGETPLATFORM node:${NODE_VERSION}-slim AS runner

ARG UID="991"
ARG GID="991"

RUN corepack enable \
	&& groupadd -g "${GID}" artist \
	&& useradd -l -u "${UID}" -g "${GID}" -m -d /artist artist \
	&& find / -type d -path /proc -prune -o -type f -perm /u+s -ignore_readdir_race -exec chmod u-s {} \; \
	&& find / -type d -path /proc -prune -o -type f -perm /g+s -ignore_readdir_race -exec chmod g-s {} \; \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists

USER artist
WORKDIR /artist

COPY --chown=artist:artist --from=builder /artist/node_modules ./node_modules
COPY --chown=artist:artist --from=builder /artist/dist ./dist
COPY --chown=artist:artist --from=builder . ./

ENV NODE_ENV=production
HEALTHCHECK --interval=5s --retries=20 CMD ["/bin/bash", "/artist/healthcheck.sh"]
CMD ["node", "dist/main.js"]
