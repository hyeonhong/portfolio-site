# Portfolio Website

## Stacks

- React
- GatsbyJS
- Material-UI
- GraphQL

## Usage

1. Configure the env file

```
echo 'GATSBY_DISQUS_NAME=your_disqus_shortname' > .env.development
echo 'GATSBY_DISQUS_NAME=your_disqus_shortname' > .env.production
```

2. Install dependencies

```
yarn install
```

2. Run as **development** in the local environment

```
yarn run develop
```

The site will be running at `http://localhost:8000`

3. Build the production bundle

```
yarn run build
```

The production bundle is created in the `/public` directory

4. Run as **production** in the local environment

```
yarn run serve
```

The site will be running at `http://localhost:9000`
