Install the certifiate from "src\ssl\app.crt". Double click the file and follow the prompts. During Certificate store selection select the store as shown in step #14 in the following link.

https://support.securly.com/hc/en-us/articles/360026808753-How-do-I-manually-install-the-Securly-SSL-certificate-on-Windows

Open notepad as administrator and then open the file "C:\Windows\System32\drivers\etc\hosts" 
Add the following line in the file at the end and save. 
127.0.0.1 eespapp.com

Above steps is because we would like to use https custom hostname for our web client app.

Use "VS Code" for the development. 
Once repo is copied, open the repo in VS code, and then open Terminal in VS Code. (top Menu) - DEfault terminal in VS code is powershell, we need bash terminal. follow the steps in following link to change the terminal. 
https://askubuntu.com/questions/1117868/change-default-terminal-back-to-bash-in-vs-code

If you dont get it working, you can open use command prompt. Open command prompt and go to the directory of the project. 

Run "npm install". We need to run this command once to install all the dependencies of the project.
Run `ng serve` for a dev server. Navigate to `https://eespapp.com:4200/`. The app will automatically reload if you change any of the source files.



# Eesp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Development server


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



