# Portfolio Website

[https://hyeonhong.io](https://hyeonhong.io)

## Stacks

- React
- GatsbyJS
- Material-UI
- GraphQL

## Usage

1. Download repo

```
git clone https://github.com/hyeonhong/portfolio-site.git
```

2. Install dependencies

```
yarn install
```

3. Configure the env

```
echo 'GATSBY_DISQUS_NAME=your_disqus_shortname' > .env.development
echo 'GATSBY_DISQUS_NAME=your_disqus_shortname' > .env.production
```


4. Run in the development

```
yarn run develop
```

The site will be running at `http://localhost:8000`

5. Build the production bundle

```
yarn run build
```

The production bundle is created in the `/public` directory

6. Run in the production

```
yarn run serve
```

The site will be running at `http://localhost:9000`
