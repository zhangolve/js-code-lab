##  Starting a new project

yarn init
Adding a dependency

yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
Upgrading a dependency

yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
Removing a dependency

yarn remove [package]
Installing all the dependencies of project

yarn
or

yarn install



## package script 

Runs a defined package script.

You may define scripts in your package.json file.

{
  "name": "my-package",
  "scripts": {
    "build": "babel src -d lib",
    "test": "jest"
  }
}

##  yarn add 

If you are used to using npm you might be expecting to use --save or --save-dev. These have been replaced by yarn add and yarn add --dev. For more information, see the yarn add documentation.

添加依赖，添加开发依赖

