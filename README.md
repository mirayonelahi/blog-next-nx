# Blog using Next.js and Nx

In this article, we’re going to explore how to create our very first web application with Next.js and Nx. We’re going to learn about the anatomy of a Nx based workspace, how to generate one, and specifically how to setup our Next.js application. Finally, we’re also going to create our blog’s about page and learn about some handy Next.js features.

## Create a Next.js web app with Nx

We’re going to use Nx for this setup because it provides a series of advantages:

- support for multiple apps (we can easily add more apps to our workspace and share common logic)
- structure our code as workspace libraries, thus facilitating a cleaner architecture, code reuse and responsibility segregation
- improved build and test speed via Nx affected commands and computation caching
- out of the box support for code generation, Storybook and Cypress integration

To create a new Nx workspace, use the following command.

    npx create-nx-workspace ayondev --packageManager=yarn

When asked, use Next.js as the preset

During the setup, you’ll be asked to give the generated application a name. I use “site” for now as this is going to be my main Next.js website. Make sure to choose CSS as the styling framework. Because we’ll be using Tailwind later, we need pure CSS and PostCSS processing.

Once the installation and setup completes, run yarn start (or npm start) to launch the Next.js dev server and navigate to http://localhost:4200. You should see the running application.

Nx Workspace structure
Let’s quickly explore the Nx workspace structure to learn some of the fundamentals.

Apps and Libs
An Nx workspace is structured into apps and libs. Instead of having all the different features of our app just within folders of our application folder, we rather split them up into “workspace libraries”. Most of our business and domain logic should reside in those libraries. The apps can be seen as our “deployables”. They import the functionality in the libs as the building blocks to create a deployable app.

Although the libraries can be built and published (see Publishable and Buildable Libraries), they don’t have to. They are referenced via TypeScript path mappings in the tsconfig.base.json configuration at the root of the Nx workspace. When we build the application, all referenced libraries are built into the app via the used bundler (e.g. Webpack or Rollup etc).

Config files: workspace.json and nx.json
Let’s give a fast overview of the main configuration files. All the details can be found on the official docs page: https://nx.dev/latest/react/core-concepts/configuration

The workspace.json is the main configuration file of an Nx workspace. It defines

the projects in the workspace (e.g. apps and libs)
the Nx executor used to run operations on the projects (e.g. serve the app, build it, run Jest tests, Storybook etc..)
The nx.json defines mostly additional configuration properties used for the Nx dependency graph. Additionally, you can define the base branch (e.g. master or main or whatever you are using) and the task runner to be used.

Serving, building and testing
The Nx workspace.json config defines what you can actually serve, build, test etc. Here’s a quick example of such a configuration for a project called cart.

```json
{
  "projects": {
    "cart": {
      "root": "apps/cart",
      "sourceRoot": "apps/cart/src",
      "projectType": "application",
      "targets": {
        "build": {
          "executor": "@nrwl/web:build",
          "options": {
            "outputPath": "dist/apps/cart",
            ...
          },
          ...
        },
        "serve": {...},
        "test": {
          "executor": "@nrwl/jest:jest",
          "options": {
            ...
          }
        }
      }
    }
  }
}
```

It defines targets for build, serve and test. These can be invoked using the following syntax:

`npx nx run <proj-name>:<target> <options>`

Note, we use npx in front because we don’t have Nx installed globally. Thus npx will fallback and execute the installed binary in our node_modules folder. You can obviously also install Nx globally and get rid of having to prefix commands with npx

So to serve our app we run nx run cart:serve, to build it nx run cart:build and so on. There are also shortcuts, meaning we can alternatively invoke these commands like nx serve cart or nx build cart.

In Nx “targets” are invocable commands. There are predefined commands such as build, serve, test that get set up when you generate a new application. You can also define your custom ones, either by building your own Nx Executor or use the Nx Run-Commands.

Understanding Page Structures: Generating the About Page
When looking at the setup you’ll see a “pages” folder. Every file returning a React component in there, instructs Next.js to generate a new page. As you can see there is an index.tsx page, which you see when navigating to the root of the Next website http://localhost:4200. To better understand this, let’s create an About page that responds at http://localhost:4200/about.

Nx has some nice generators for that already. Hence, typing..

npx nx generate @nrwl/next:page --name=about --style=css
..generates a new about.tsx (with its according styling file).

```js
import './about.module.scss';

/* eslint-disable-next-line */
export interface AboutProps {}

export function About(props: AboutProps) {
  return (
    <div>
      <h1>Welcome to about!</h1>
    </div>
  );
}
export default About;
```

Btw, if you’re not the terminal kind of person, you can also use the Nx Console VSCode plugin.

If we now serve our app with npx nx serve site and navigate to /about, we should see something like the following:
