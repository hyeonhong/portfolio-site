# Portfolio Website

[https://hyeonhong.io](https://hyeonhong.io)

## Stacks

- React
- Next.js
- Material-UI

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
echo 'NEXT_PUBLIC_DISQUS_NAME=your_Disqus_shortname' > .env
echo 'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_Google_Analytics_ID' > .env
```


4. Run in the development

```
yarn dev
```

The site will be running at `http://localhost:3000`

5. Build the production bundle as a static site

```
yarn run build
```

The production bundle is created in the `/out` directory

6. Run the build in the local environment

```
npx serve out
```

The site will be running at `http://localhost:5000`
