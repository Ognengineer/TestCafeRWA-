
import { equal } from 'assert';
import { Selector } from 'testcafe'

const userInfo = [Selector('#firstName'), Selector('#lastName'), Selector('#username'), Selector('#password'), Selector("#confirmPassword")];
//const inputHelpText = Selector('#bankaccount-bankName-input-helper-text')
fixture `Getting Started - Log in and create Bank Account`
   .page `http://localhost:3000`;
const BankInfo = [Selector('#bankaccount-bankName-input'), Selector('#bankaccount-routingNumber-input'), Selector('#bankaccount-accountNumber-input')];


test('Create Bank Account', async t => {
    await t
   //Inputting the created user credentials   
        .typeText(userInfo[2], 'Ognengineer')
        .typeText(userInfo[3], 'password123')
   //Click on remember me
        .click('#root > div > main > div.makeStyles-paper-2 > form > label')
   //Click on log in button
        .click('#root > div > main > div.makeStyles-paper-2 > form > button') 
        .wait(1000)
   //Click Next button on Get Started po-up dialog
        .click('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogActions-root.MuiDialogActions-spacing > div > div:nth-child(2) > button')

   //Input Bank info
          //Bank Name Field 
        .click(BankInfo[0])
        .pressKey('H') 
        .expect(Selector('#bankaccount-bankName-input-helper-text').textContent).eql('Must contain at least 5 characters') //Verifying that helper text is shown 
        .selectText(BankInfo[0])
        .pressKey('delete')
        .click(BankInfo[1])
        .expect(Selector('#bankaccount-bankName-input-helper-text').textContent).eql('Enter a bank name') //Verifying that helper text is shown
        .typeText(BankInfo[0], 'Halkbank', { replace: true })
          //Routing Number Field
        .click(BankInfo[1])
        .pressKey('1')
        .expect(Selector('#bankaccount-routingNumber-input-helper-text').textContent).eql('Must contain a valid routing number') //Verifying that helper text is shown
        .selectText(BankInfo[1])
        .pressKey('delete')
        .click(BankInfo[2])
        .expect(Selector('#bankaccount-routingNumber-input-helper-text').textContent).eql('Enter a valid bank routing number') //Verifying that helper text is shown
        .typeText(BankInfo[1], '122233452', { replace: true })
          //Account Number Field  //TO DO add validation for more than 12 digits
        .click(BankInfo[2])
        .pressKey('1')
        .expect(Selector('#bankaccount-accountNumber-input-helper-text').textContent).eql('Must contain at least 9 digits') //Verifying that helper text is shown
        .selectText(BankInfo[2])
        .pressKey('delete')
        .click(BankInfo[1])
        .expect(Selector('#bankaccount-accountNumber-input-helper-text').textContent).eql('Enter a valid bank account number') //Verifying that helper text is shown
        .typeText(BankInfo[2], '123456789', { replace: true })       

        .click('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > div > form > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2.MuiGrid-align-items-xs-flex-start > div')

   });