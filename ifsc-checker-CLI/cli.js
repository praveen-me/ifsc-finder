const https = require('https');
const readLine = require('readline');
const chalk = require('chalk');
const logUpdate = require('log-update');
const spinner = require('elegant-spinner');

let isLoading = false;
const frame = spinner();
let interval;

const line = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// convert totally capitalized string into readable
const convertReadable = (str) => {
  return str ? str.split(' ')
  .filter(str => str.length > 0)
  .map(str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`)
  .join(' ') : 'Not available';
}

const blueText = (head, text) => {
  return console.log(`${chalk.rgb(0, 188, 212)(`${chalk.magenta.bold(head)} ${chalk.white('-')} ${convertReadable(text)}`)}`);
}

const displayBankDetail = (bank) => {
  const { BRANCH, ADDRESS, CONTACT, DISTRICT, STATE, BANK, BANKCODE, IFSC } = bank;
  console.log(`\n${chalk.rgb(141, 249, 255).bold('BANK DETAILS')}\n`);
  blueText('Bank Name', BANK);
  blueText('IFSC Code', IFSC);
  blueText('Branch', BRANCH);
  blueText('Bank Address', ADDRESS);
  blueText('Bank Contact', CONTACT);
  blueText('Bank District', DISTRICT);
  blueText('Bank State', STATE);
};


// Ifsc KKBK0000261

const errMsg = (msg) => console.log(`\n${chalk.red.bold(msg)}\n`);

const endMessage = () => console.log(`\n${chalk.rgb(141, 249, 255).bold('Thanks for using IFSC Checker.')}\n`);

line.question(chalk.yellow('\nEnter IFSC Code => '), (ifsc) => {
  
  // fetching data
  isLoading = true;
  
  // Set loading on KKBK0000261isLoading
  if (isLoading) {
    interval =  setInterval(function(){
      logUpdate(`
      ${ `${chalk.rgb(141, 249, 255).bold(`Waiting for data ${frame()}`)}`}
      `);
    }, 50);
  }
  
  https.get(`https://ifsc.razorpay.com/${ifsc}`, (data) => {
    data.on('data', (d) => {
      isLoading = false;
      const bankData = JSON.parse(String(d))
      
      // Clearing the interval of spinner
      if (!isLoading) {
        clearInterval(interval);
        if (typeof(bankData) === 'object') {
          displayBankDetail(bankData);
          endMessage();
        } else {
          errMsg('IFSC CODE IS WORNG. Please Try Again.')
          endMessage();
        }
      }
    })
  });
  line.close();
});
