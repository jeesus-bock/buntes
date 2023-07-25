FROM oven/bun

ADD src src
ADD buntesfe buntesfe
ADD package.json package.json
ADD bun.lockb bun.lockb
RUN bun install
RUN cd buntesfe && bun install && bun run build
ADD public public

CMD bun src/index.ts