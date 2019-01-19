# IFSC

IFSC-Checker is a project that help a user to get the data of a bank by entering the IFSC of the bank. It also gives to you the available bank suggestion when you entering the name of the bank.
This project is divided into two folders. 
* IFSC-Checker (GUI)
* IFSC-Checker (CLI)

This whole project is made using [Razorpay's IFSC API](https://ifsc.razorpay.com).

To get started with project. You need to do the following steps:-
* Clone the repo using `git clone https://github.com/praveen-me/ifsc-finder.git`
* Go the directory using `cd ifsc-finder`.

### For GUI APP
If you want to checkout the GUI APP.
* Go inside the folder bu running ` ifsc-checker-GUI`.
* Now, install all packages that project needs by running `npm i`.
* Then start the mongo through `sudo service start mongod`.
* Now, start the project using `npm start`.

### For CLI APP
If you want to checkout the GUI APP.
* Go inside the folder bu running ` ifsc-checker-CLI`.
* Now, install all packages that project needs by running `npm i`.
* * Now, start the project using `npm start`.
Or you can also install the package through `npm i -g ifsc-cli`.

## Tech Stack Used
### For GUI
* React
* Redux
* Webpack
* Socket
* MongoDB
* Node/Express

### FOR CLI
* Node