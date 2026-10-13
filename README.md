<div align="center">
   <img alt="Page Builder" width="60" src="https://pagebuilder.wc8.io/pagebuilder_logo.png">
</div>
<h1 align="center">Page Builder - Documentation</h1>
<p align="center">Visual, drag and drop page editor for Strapi.</p>
<p align="center">Connect Page Builder to your web site and start editing your own custom components, visually.</p>

<br />

<p align="center">
  <a href="https://www.npmjs.com/package/@wecre8websites/strapi-page-builder">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/wecre8websites/strapi-page-builder?label=npm&logo=npm">
  </a>
  <a href="https://www.npmjs.org/package/@wecre8websites/strapi-page-builder-react">
    <img src="https://img.shields.io/npm/dm/@wecre8websites/strapi-page-builder-react.svg" alt="Monthly download on NPM" />
  </a>
</p>

<br>

<img style="width: 100%; height: auto;" src="https://pagebuilder.wc8.io/pagebuilder_animation.gif" alt="Page Builder Overview" /> <br/>

<br/><br/>

## Documentation

Read the complete documentation at https://pagebuilder.wc8.io

This repository contains the source of that site: a [Next.js](https://nextjs.org/) app using [Nextra](https://nextra.site/), with the documentation pages in `content/`.

## Page Builder plugin for Strapi

[Strapi](https://strapi.io/) is the leading open-source headless Content Management System. It’s 100% JavaScript, fully customizable and developer-first.

The Page Builder plugin adds a visual page editor to Strapi, letting you drag and drop custom sections and connect them to CMS data.

- [@wecre8websites/strapi-page-builder](https://www.npmjs.com/package/@wecre8websites/strapi-page-builder): the Strapi plugin
- [@wecre8websites/strapi-page-builder-react](https://www.npmjs.com/package/@wecre8websites/strapi-page-builder-react): the companion package for your React project

## Running the site locally

```bash
cp .env.example .env.local   # then fill in the values
pnpm install
pnpm dev                     # http://localhost:3001
```

The variables in `.env.example` configure sign-in, the account page and analytics. The site will not build without the Firebase ones.
