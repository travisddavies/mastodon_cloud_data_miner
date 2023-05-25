## Frontend [(Free version)](https://minimal-kit-react.vercel.app/)


![license](https://img.shields.io/badge/license-MIT-blue.svg)

> Free React Admin Dashboard made with Material-UI components and React.

## Description
It can fetch related data from backend, and then display the related diagrams.

## Getting started

- Recommended `node v18.16.0` and `npm 6+`.
- Install dependencies: `npm install` / `yarn install`
- Start the project: `npm start` / `yarn start`

## Pages

- Dashboard
- Scenario1
- Scenario2
- Scenario3
- Quiz

## Repository Structure
```
Frontend
├── public
│   ├── assets                          <- icons and pictures
│   ├── favicon
│   ├── australia_state.geojson         <- the data for map
│   ├── state_population.json           <- the data for population
│   ├── index.html
│   └── manifest.json 
├── src                                 <- main code files
│   ├── _mock
│   ├── components
│   ├── hooks
│   ├── layouts
│   ├── pages
│   │   ├── DashboardAppPage.js
│   │   ├── Quiz.js
│   │   ├── S1.js
│   │   ├── S2.js
│   │   └── S3.js
│   ├── sections
│   │   └── @dashboard
│   │       ├── app                    <- files for page dashboard
│   │       ├── quiz                   <- files for quiz part
│   │       ├── s1                     <- diagrams for scenario 1
│   │       ├── s2                     <- diagrams for scenario 2
│   │       └── s3                     <- diagrams for scenario 3
│   ├── theme
│   ├── utils
│   ├── App.js
│   ├── index.js
│   ├── reportWebVitals.js
│   ├── routes.js
│   └── serviceWorker.js
├── jsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

## License

Distributed under the MIT License. See [LICENSE](https://github.com/minimal-ui-kit/minimal.free/blob/main/LICENSE.md) for more information.


## Acknowledgements
This is [Minimal Dashboard](https://github.com/minimal-ui-kit/material-kit-react) Templates. We are very grateful to 
minimal-ui-kit for developing and sharing their system with us for teaching and learning purposes.

Using the tool AI (Chatgpt) help tidy up code and debug.
