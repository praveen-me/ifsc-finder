const https = require('https');
const readLine = require('readline');
const chalk = require('chalk');

const line = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const convertReadable = (str) => {
  return str ? str.split(' ')
        .filter(str => str.length > 0)
        .map(str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`)
        .join(' ') : 'Not available';
}

const blueText = (head, text)  => {
  return console.log(`${chalk.rgb(0, 188, 212).bold(`${head} - ${convertReadable(text)}`)}`);
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

line.question(chalk.yellow('\nEnter IFSC Code => '), (ifsc) => {
  // fetching data
  https.get(`https://ifsc.razorpay.com/${ifsc}`, (data) => {
    data.on('data', (d) => {
      displayBankDetail(JSON.parse(String(d)));
    });
  });
  line.close();
});
