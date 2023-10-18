# Countries app

The purpose of this repository is to practice React and Redux to build a countries app. The app uses the [REST Countries API](https://restcountries.com/) to display a list of countries, [Open Weather API](https://openweathermap.org/api) for weather details and [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started) for maps. This app is built with React and uses Redux and Redux Toolkit for state management. The app uses Firebase Authentication to allow users to sign up and log in and it uses Firestore Database to store user data and their favourites.
## Technologies used

Built with:

- React
- React Router
- Redux & Redux Toolkit
- Bootstrap & React Bootstrap
- Firebase Authentication
- Firestore Database

Additional libraries:

- Axios
- Bootstrap Icons
- [React Hot Toast](https://react-hot-toast.com/docs) for beautiful notifications ✨
- [React Scroll-To-Top](https://www.npmjs.com/package/react-scroll-to-top) for lightweight and easily customisable scroll-to-top component

## Setup and usage

### Features
- User can register, log in and log out.

- User can view a list of `countries` and filter them by country name. User can add countries to `favourites` and view details of a country by clicking the country card. User can view a list of favourite countries and also clear their favourites.
### Live site

Deployed to Vercel: https://countries-app-julilan.vercel.app/
### Local

Clone repository

```
git clone https://github.com/julilan/countries-app.git
```

Create an `.env` file and update your API keys and configs in the .env file. You can find the required keys in the `.env.example` file.

Install dependencies with `npm install` and run app in development mode with `npm start`.

## Author and acknowledgements

Julianna Molnár
- GitHub [@julilan](https://github.com/julilan)
- [LinkedIn](https://www.linkedin.com/in/julilan/)

Kudos to our teacher [Martin Holland](https://github.com/martin-holland) for guidance. 👏
