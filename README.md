<div id="top"></div>
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

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/aidanaden/icare">
    <img src="/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ICare Web Application</h3>

  <p align="center">
    Front-end web application for RSM Stone Forest employees to nominate each other for good service awards.
    <br />
    <a href="https://github.com/aidanaden/icare"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/aidanaden/icare">View Demo</a>
    ·
    <a href="https://github.com/aidanaden/icare/issues">Report Bug</a>
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
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Code structure</a></li>
    <li><a href="#roadmap">Potential issues and improvements</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

The ICare web application project was set up to digitalise the existing ICare internal program by RSM Stone Forest, so as to encourage employees and clients to vote for employees as well as award employees that have shown to display good service towards clients, while reducing the man-hours required for the ICare committee members and HOD staff to vet the nominations.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

The ICare web application was built with the following frameworks/libraries.

- [![Next][next.js]][next-url]
- [![React][react.js]][react-url]
- Material UI
- Recoil
- React hook form

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

In order to run the ICare web application locally, [nodejs](https://nodejs.org/en/download/) must be installed.

It's highly recommended to use macos or linux for easier installation.

### Prerequisites

The ICare web app uses yarn as its package manager. To install, run the command below (AFTER installing nodejs).

- yarn
  ```sh
  npm install --global yarn
  ```

### Installation

To install all of the packages required by the ICare web application, run the commands below.

1. Clone the repo
   ```sh
   git clone https://github.com/aidanaden/icare.git
   ```
2. Install NPM packages
   ```sh
   cd icare
   yarn
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Deployment

- Development: When deploying the ICare web application to development, enter the development API server url in line 2 of the `src/constants/index.tsx` file and **ensure that line 4 is commented**.

- Production: When deploying the ICare web application to production, enter the production API server url in line 4 of the `src/constants/index.tsx` file and **ensure that line 2 is commented**.

After you've set up the API server url, run the command

```
yarn build
```

The output files will be created in the `/out` directory, which you can copy/paste into your web server.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Code structure

The code structure will be explained via:

1. folder directory: explains the general use/purpose of code within each directory
2. each web page: explains where the relevant code is for each web page

### Code structure via folder directory

`/pages`

The pages directory stores all of the entry files for each page. E.g. To find the code for the `/nominations` page, simply look for the file `/src/pages/nominations/index.tsx`, To find the code for the `/dashboard` page, simply look for the file `/src/pages/dashboard.tsx`.

`/lib`

The lib directory stores all of the functions used to fetch data from the backend via api requests (functions are stored in `/lib/nominations.ts`)

`/hooks`

The hooks directory stores the `useAuth` context that handles all authentication requests as well as the `useInterval` hook that ensures that inactive users are logged out within a 15min interval

`/enums` and `/interfaces`

The enums and interfaces directories store the different data types used within the app

`/constants`

The constants directory stores all constants (including the dev/prod api urls) used within the app

`/components`

The components directory stores all the components used within the app (sorted in different folders according to the component type)

`/styles`

The styles directory stores all theme stylings used within the app (e.g. colors, fonts, etc)

`/atoms`

The atoms directory is used by the Recoil library to store shared state across the app (used mainly by the create/edit nomination step form component)

### Code structure via web pages

Login page

- All code can be found in the `/src/pages/login.tsx` file
- Uses authentication api calls that can be found in the `/src/hooks/useAuth.tsx` file

Dashboard page

- All code found in `/src/pages/dashboard.tsx`
- Fetches data using the `useNominations` hook found in `/src/lib/nominations.ts`

Create/Edit nominations page

- All code found in `/src/pages/nominations/new.tsx` and `/src/pages/nominations/edit/[id].tsx`
- Both files share similar layouts and components, only differ in data fetched (edit page fetches existing nomination data)
- Fetches data using the `useStaffDepts` and `useNominationDetails` hooks found in `/src/lib/nominations.ts`

Nominations, Endorsements and Committee pages

- All code found in `/src/pages/nominations.tsx`, `/src/pages/endorsements.tsx`, `/src/pages/committee.tsx`
- All 3 pages share similar layouts and components and only differ in the different nomination data
- Uses the `useNominations` hook found in `/src/lib/nominations.ts`

Nomination details page

- All code found in `/src/pages/nominations/[id].tsx`
- Uses the `useNominationDetails` hook found in `/src/lib/nominations.ts`

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Potential issues and improvements

### Issues

### Improvements

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
  - [ ] Chinese
  - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Ryan Aidan - aidan@u.nus.edu

Project Link: [https://github.com/aidanaden/icare](https://github.com/aidanaden/icare)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
