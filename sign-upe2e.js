import { TIMEOUT } from 'dns';
import { result } from 'lodash';
import { Selector } from 'testcafe'


const generateRandomString = function(length=6){
   return Math.random().toString(20).substr(2, length)
   }
const randStr = generateRandomString()
const randStr2 = generateRandomString()

const userInfo = [Selector('#firstName'), Selector('#lastName'), Selector('#username'), Selector('#password'), Selector("#confirmPassword")];
fixture `Getting Started - Sign up and log in with created user`
    .page `http://localhost:3000`;

const BtnSignup = Selector('div:nth-child(2) > a')  
 .withText("Don't have an account? Sign Up");


test('Sign up and login', async t => {
    await t
        .click(BtnSignup)
        Selector("signup-title")
        .withExactText("Sign Up")

    await t 
        .click(userInfo[1])
        .expect(Selector('#firstName-helper-text').textContent).eql('First Name is required') //Verifying that helper text is shown
        .typeText(userInfo[0], randStr)
        .click(userInfo[2])
        .expect(Selector('#lastName-helper-text').textContent).eql('Last Name is required') //Verifying that helper text is shown
        .typeText(userInfo[1], "Lazarevski")
        .click(userInfo[3])
        .expect(Selector('#username-helper-text').textContent).eql('Username is required') //Verifying that helper text is shown
        .typeText(userInfo[2], randStr2)
        .click(userInfo[4])
        .expect(Selector('#password-helper-text').textContent).eql('Enter your password') //Verifying that helper text is shown
        .typeText(userInfo[3], "p")
        .expect(Selector('#password-helper-text').textContent).eql('Password must contain at least 4 characters') //Verifying that helper text is shown
        .typeText(userInfo[3], "password123", { replace: true })
        .click(userInfo[4])
        .pressKey('G')
        .expect(Selector('#confirmPassword-helper-text').textContent).eql('Password does not match') //Verifying that helper text is shown
        .selectText(userInfo[4])
        .pressKey('delete')
        .expect(Selector('#confirmPassword-helper-text').textContent).eql('Confirm your password') //Verifying that helper text is shown
        .typeText(userInfo[4], "password123", { replace: true })
        .click(Selector('span.MuiButton-label'))
        //.click(btnSignUp1)
        
     //Assert that user will be redirected to login page    
    await t
        .expect(userInfo[2].value).eql('', 'input is empty')
        .expect(userInfo[3].value).eql('', 'input is empty')
     //Inputting the created user credentials   
        .typeText(userInfo[2], randStr2)
        .typeText(userInfo[3], 'password123')
     //Click on remember me
        .click('div.makeStyles-paper-21 > form > label')
     //Click on log in button
        .click('div.makeStyles-paper-21 > form > button') 
        .wait(1000)
     //Assert the successful login with Get Started pop-up dialog   
        t.expect('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div')
});


fixture `Getting Started - Log in and create Bank Account`
   .page `http://localhost:3000`;

const BankInfo = [Selector('#bankaccount-bankName-input'), Selector('#bankaccount-routingNumber-input'), Selector('#bankaccount-accountNumber-input')];


test('Create Bank Account', async t => {
    await t
   //Inputting the created user credentials   
        .typeText(userInfo[2], randStr2)
        .typeText(userInfo[3], 'password123')
   //Click on remember me
        .click('div.makeStyles-paper-2 > form > label')
   //Click on log in button
        .click('div.makeStyles-paper-2 > form > button') 
        .wait(1000)
   //Click Next button on Get Started po-up dialog
        .click('div:nth-child(2) > button > span.MuiButton-label')
 
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
          //Account Number Field 
        .click(BankInfo[2])
        .pressKey('1')
        .expect(Selector('#bankaccount-accountNumber-input-helper-text').textContent).eql('Must contain at least 9 digits') //Verifying that helper text is shown
        .selectText(BankInfo[2])
        .pressKey('delete')
        .click(BankInfo[1])
        .expect(Selector('#bankaccount-accountNumber-input-helper-text').textContent).eql('Enter a valid bank account number') //Verifying that helper text is shown
        .typeText(BankInfo[2], '1234567892123', { replace: true }) 
        .expect(Selector('#bankaccount-accountNumber-input-helper-text').textContent).eql('Must contain no more than 12 digits')//Verifying that helper text is shown
        .pressKey('delete')
        .typeText(BankInfo[2], '123456789', { replace: true }) 


        .click('div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2.MuiGrid-align-items-xs-flex-start > div > button')
        .expect(Selector('div.MuiDialogContent-root > div > p').textContent).eql('You\'re all set!We\'re excited to have you aboard the Real World App!')
        .click('div:nth-child(2) > button > span.MuiButton-label')

   });