This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It also uses [Auth0](https://auth0.com/docs/authenticate) for authentication with Github and [OpenWeatherMap API](https://openweathermap.org/api) for weather data.

## Getting Started

First, install packages for the projext

```bash
npm install
```

Setup neccessary `env` keys in `next.config.js`

```js
  env: {
    AUTH_0_DOMAIN: "yourAuth0AppDomain",
    AUTH_0_CLIENT: "yorAuth0AppClient",
    OPENWEATHER_API_KEY: "yourOpenWeatherApiKey",
  }
```

To use lint:

```bash
npm run lint:fix
```


To run the development server:

```bash
npm run dev
# or
yarn dev
```
