<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/educational-technology-collective/srs-chrome-extension">
    <img src="public/logo.svg" alt="Logo" width="80" height="80">
    <br />
  </a>

<h3 align="center">Ambient Authoring</h3>

  <p align="center">
    Become a catalyst for knowledge.
    <br />
    <!-- <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    · -->
    <a href="https://github.com/educational-technology-collective/srs-authoring/issues">Report Bug</a>
    ·
    <a href="https://github.com/educational-technology-collective/srs-authoring/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <!-- <li><a href="#prerequisites">Prerequisites</a></li> -->
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#proposal">Proposal</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description` -->

Ambient Authoring is a Chrome extension where experts can author learning moments and flashcards.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<!-- - [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Vue][Vue.js]][Vue-url]
- [![Angular][Angular.io]][Angular-url]
- [![Svelte][Svelte.dev]][Svelte-url]
- [![Laravel][Laravel.com]][Laravel-url]
- [![Bootstrap][Bootstrap.com]][Bootstrap-url]
- [![JQuery][JQuery.com]][JQuery-url] -->

![TypeScript]
![React]
![Vite]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

<!-- ### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ``` -->

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/educational-technology-collective/srs-authoring.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Build the project
   ```sh
   npm run build
   ```
4. Load unpacked extension in Chrome.
5. Select `/dist` directory.
6. Load the extension from Chrome's side panel.
7. Go to the assigned Coursera page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Proposal

This write-up is a proposal for a new system design for the Ambient Learning project.

### The Big Picture

Below is the system design flowchart of the project.

![]()

### Clients

We aim to serve three clients primarily:

- Coursera Agent Chrome Extension
- Coursera Authoring Chrome Extension
- Mobile App

JupyterLab client will be supported soon.

Spaced repetition system will not use the exposed API from AWS, but will manipulate the database directly. The implementation details for the system is still under debate.

### Auth

There will be whitelisted users data inside Auth0.

### Database Collections

MongoDB is the database of choice here. The project will use four collections and one view:

#### Collections

- `lms`
- `fcs`
- `userStates`
- `mobileTelemetry`

#### Views

- `userStates_fcs`

### API Endpoints

Below is the tree that lists out our proposed endpoints.

```markdown
/api
/v1
/lms
`POST` (authoring)
`PUT` (authoring)
/search
`GET` (authoring, agent)
/{id}
`DELETE` (authoring)
/fcs
`POST` (authoring)
`PUT` (authoring)
/search
`GET` (authoring)
/{id}
`DELETE` (authoring)
/{userId}
/flashcards
/now
`GET` (mobile)
/{lmId}
`POST` (agent)
`PUT` (mobile)
/telemetry
/mobile
`POST` (mobile)
```

#### Coursera Agent Chrome Extension

- `GET /api/v1/lms/search`
  - Gets a list of learning moments given query parameters.
  - Reads from lms collection.
- `POST /api/v1/{userId}/{lmId}`
  - Posts newly experienced learning moments to a given user.
  - Writes to userStates collection.

#### Coursera Authoring Chrome Extension

- `GET /api/v1/lms/search`
  - Gets a list of learning moments given query parameters.
  - Reads from lms collection.
- `GET /api/v1/fcs/search`
  - Gets a list of flashcards given query parameters.
  - Reads from fcs collection.
- `POST /api/v1/lms`
  - Posts a new learning moment.
  - Writes to lms collection.
- `POST /api/v1/fcs`
  - Posts a new flashcard.
  - Writes to fcs collection.
- `PUT /api/v1/lms`
  - Updates a learning moment.
  - Writes to lms collection.
- `PUT /api/v1/fcs`
  - Updates a flashcard.
  - Writes to fcs collection.
- `DELETE /api/v1/lms/{lmId}`
  - Deletes a given learning moment.
  - Writes to lms collection.
- `DELETE /api/v1/fcs/{fcId}`
  - Deletes a given flashcard.
  - Writes to fcs collection.

#### Mobile App

- `GET /api/v1/{userId}/flashcards/now`
  - Gets a 2D list of flashcards for review today.
  - Reads from userStates_fcs view.
- `PUT /api/v1/{userId}/{lmId}`
  - Updates the review record for each learning moment after user interaction with the mobile app.
  - Writes to userStates collection.
- `POST /api/v1/telemetry/mobile`
  - Posts user telemetry data.
  - Writes to mobileTelemetry collection.

More endpoints will be added once JupyterLab support lands.

### Schemas

We propose these schemas for each collection.

#### lms

```json
{
  _id: ObjectId,
  platform: String,
  contentType: String,
  content: Object,
  visibility: String,
}
```

#### fcs

```json

{
  _id: ObjectId,
  lm_id: ObjectId,
  type: String,
  content: Object,
  visibility: String,
  source: String,
}
```

#### userStates

```json
{
  userId: String,
  lms: Object,
}

// Each lms key-value entry:
lm_id as String key: {
  reviewRecord: {
    correct: Number,
    incorrect: Number,
    skipped: Number,
    know: Number,
    dontKnow: Number,
    oneMore: Number,
    poorCard: Number,
  },
  alg: {
    prevInterval: Number,
    prevFactor: Number,
    nextReview: Date,
  },
  createdAt: Date,
  updatedAt: Date,
}
```

#### mobileTelemetry (undecided)

```json
{
  userId: String,
  lm_id: Number,
  eventName: String,
  eventTime: Date,
  selfEval: String,
  testEval: String,
  isBuffer: Boolean,
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- ROADMAP -->

## Roadmap

<!-- - [ ] Course structure generation and learning moments mapping -->

See the [open issues](https://github.com/educational-technology-collective/srs-authoring/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

<!-- ## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- LICENSE -->

<!-- ## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

June Hyung (Jacob) Kim - [@jpoly1219](https://github.com/jpoly1219) - jpoly@umich.edu

<!-- Project Link: [https://github.com/educational-technology-collective/srs-chrome-extension.git](https://github.com/educational-technology-collective/srs-chrome-extension.git) -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Dr. Christopher Brooks - University of Michigan School of Information](https://christopherbrooks.ca)
- [Educational Technology Collective - University of Michigan School of Information](https://edtech.labs.si.umich.edu)
- [Logo created by Porto Mineiro under CC BY-SA 4.0 - Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Icon_S_blue.svg)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[TypeScript]: https://camo.githubusercontent.com/6cf9abe9d706421df40ff4feff208a5728df2b77f9eb21f24d09df00a0d69203/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d3030374143433f7374796c653d666f722d7468652d6261646765266c6f676f3d74797065736372697074266c6f676f436f6c6f723d7768697465
[Vite]: https://camo.githubusercontent.com/a6d8d36938723d10c583712f831eeca2144cc6e20f9493ce998cca15c0d04826/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f766974652d2532333634364346462e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d76697465266c6f676f436f6c6f723d7768697465
[React]: https://camo.githubusercontent.com/268ac512e333b69600eb9773a8f80b7a251f4d6149642a50a551d4798183d621/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642
