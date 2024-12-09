import { test, Page, expect } from '@playwright/test';
import { HomePage } from '../src/pages/homePage';

test.describe('MakeMyTrip', () => {

  test('Select city details', async ({ page }) => {

    // go to MakeMyTrip homepage
    await page.goto('https://www.makemytrip.com');
    await page.waitForTimeout(5000); 

    // close modal 
    const modalButton = page.locator('[data-cy="closeModal"]');
    if(await modalButton.isVisible()){
      await modalButton.click();
    }

    // Select "Flights" as the travel type.
    await page.click('li[data-cy="menu_Flights"]');

    // Select 'From' city
    await page.click('input[data-cy="fromCity"]');
    await page.fill('input[placeholder="From"]', 'Pune');
    await page.click('p:has-text("Pune, India")'); 

    // Select 'To' city
    await page.click('input[data-cy="toCity"]');
    await page.fill('input[placeholder="To"]', 'Bengaluru');
    await page.click('p:has-text("Bengaluru, India")'); 

    // Wait for calendar to appear
    await page.waitForSelector('.DayPicker-Day');

  });

});


    // // close 
    // const modalButton = page.locator('.emt-modal-close');
    // if (await modalButton.isVisible()) {
    //   await modalButton.click();
    // }



//  // Get today's date dynamically
//  const today = new Date();
//  const todayDate = today.getDate(); // This is the current date number (e.g., 6, 7, etc.)

//  // Locate all the date elements in the calendar
//  const dateElements = page.locator('.DayPicker-Day');  // This is how you get the Locator

//  // Loop through each date element to find today's date
//  let foundToday = false;

//  // Get the count of date elements in the calendar
//  const dateCount = await dateElements.count();

//  for (let i = 0; i < dateCount; i++) {
//    const dateElement = dateElements.nth(i);

//    // Get the date text (the day number)
//    const dateText = await dateElement.locator('p').first().textContent();

//    // Skip if no text content or invalid date
//    if (!dateText) continue;

//    const dateNumber = parseInt(dateText.trim(), 10);

//    // If this date matches today's date, log the date and price
//    if (dateNumber === todayDate) {
//      const priceElement = dateElement.locator('.todayPrice');

//      // Get the price for the selected date
//      const priceText = await priceElement.textContent();
//      if (priceText) {
//        const price = parseInt(priceText.replace(',', '').trim(), 10);
//        console.log(`Today's Date: ${dateText}, Price: ₹${price}`);
//        foundToday = true;
//        break;  // Stop once we find today's date
//      }
//    }
//  }

//  // If today's date wasn't found, log a message
//  if (!foundToday) {
//    console.log("Today's date not found in the calendar.");
//  }





  // test.beforeEach(async ({ page }) => {
  //   // Go to MakeMyTrip homepage and handle modal
  //   await page.goto('https://www.makemytrip.com');
  //   await page.waitForTimeout(2000);

  //   // Close modal if visible
  //   const modalButton = page.locator('[data-cy="closeModal"]');
  //   if (await modalButton.isVisible()) {
  //     await modalButton.click();
  //   }

  // });

  // test('Select flight as travel type', async ({ page }) => {
  //   // Select "Flights" as the travel type
  //   await page.click('li[data-cy="menu_Flights"]');
  // });

  // test('Select from and to cities ', async ({ page }) => {
  //   // Select 'From' city
  //   await page.click('input[data-cy="fromCity"]');
  //   await page.fill('input[placeholder="From"]', 'Pune');
  //   await page.click('p:has-text("Pune, India")');

  //   // Select 'To' city
  //   await page.click('input[data-cy="toCity"]');
  //   await page.fill('input[placeholder="To"]', 'Bengaluru');
  //   await page.click('p:has-text("Bengaluru, India")');
  // });