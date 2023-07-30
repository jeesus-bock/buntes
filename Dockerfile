FROM oven/bun

WORKDIR '/buntes'
COPY src src
COPY buntesfe buntesfe
COPY package.json package.json
COPY bun.lockb bun.lockb
# This copies the front-end built on the host!
#COPY public public
RUN apt update
RUN apt install zip -y
RUN bun upgrade --canary
RUN bun install

WORKDIR '/buntes/buntesfe'
RUN bun install
RUN bun run build >> logit.txt
WORKDIR '/buntes'

CMD bun src/index.ts