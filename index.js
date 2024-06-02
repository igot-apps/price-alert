const express = require('express');
const puppeteer = require('puppeteer');

let contact = "0";

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! '+ contact);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


(async () => {
  try {
    // Add a user agent to the launch options
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox','--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3']
    });

    const page = await browser.newPage();
    await page.goto('https://ghanamusicawards.com/contact-us/',{ timeout: 60000*2 });
    // await page.screenshot({ path: 'image.png', fullPage: true });


    // const context = await page.evaluate(()=> document.body.innerText );
    // console.log(context);
    
    const selector = '.bs-text-content > ul > li:nth-of-type(3)';
    const element = await page.$(selector);
  
    

    const value = await page.evaluate((el) => {
      // console.log(el)
      return el.textContent;
    }, element);
  
    console.log("the exacted email is" , value); // Print the extracted value
    contact = value;
    
    
     

          



     await browser.close();
  } catch (error) {
    console.error(error);
  }
})();