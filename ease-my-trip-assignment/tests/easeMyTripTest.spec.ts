
import { test, expect } from '@playwright/test';

test('Select city details', async ({ page }) => {

  // EaseMyTrip homepage
  await page.goto('https://www.easemytrip.com/');
  await page.waitForTimeout(5000);

  // Select "Flights" as the travel type.
  await page.click('li.flights.mainMenu');



  // Select the "From" city
  const fromInput = page.locator('#FromSector_show');
  await fromInput.click();

  await page.keyboard.type('Pune', { delay: 200 });
  await page.waitForTimeout(1000); // Wait for dropdown to populate
  const puneOption = page.locator('li div.mflexcol p span.flsctrhead', { hasText: 'Pune(PNQ)' });
  await puneOption.click();

  // Verify the "From" field details 
  const fromCitySpan = page.locator('#FromSector_show');
  const fromCityText = await fromCitySpan.inputValue();
  expect(fromCityText).toContain('Pune');



  // Select the "To" city
  const toInput = page.locator('#a_Editbox13_show');
  await toInput.click();

  await page.keyboard.type('Mumbai', { delay: 200 });
  await page.waitForTimeout(1000); // Wait for dropdown to populate
  const mumbaiOption = page.locator('#toautoFill li div.mflexcol p span.flsctrhead', { hasText: 'Mumbai(BOM)' });
  await mumbaiOption.click();

  // Verify the "To" field details 
  const toCitySpan = page.locator('#a_Editbox13_show');
  const toCityText = await toCitySpan.inputValue();
  expect(toCityText).toContain('Mumbai');




  // select date 
  const dateToSelect = '11/12/2024';
  const dateLocator = page.locator(`li span[id="${dateToSelect}"]`);

  await dateLocator.waitFor({ state: 'visible', timeout: 3000 });
  await dateLocator.click();
  // console.log(`Selected Date: ${dateToSelect}`);

  //   // Cheapest Date Selection Function
  //   const selectCheapestDate = async (): Promise<number | null> => {
  //     const dateElements = await page.locator('.box .days ul li');
  //     let cheapestPrice = Infinity;
  //     let cheapestDateId: string | null = null;

  //     for (let i = 0; i < await dateElements.count(); i++) {
  //         const dateElement = dateElements.nth(i);
  //         const priceText = await dateElement.locator('span').textContent();
  //         const dateId = await dateElement.locator('span').getAttribute('id');

  //         const price = priceText ? parseInt(priceText.replace(/[^\d]/g, ''), 10) : Infinity;

  //         if (price < cheapestPrice) {
  //             cheapestPrice = price;
  //             cheapestDateId = dateId;
  //         }
  //     }

  //     if (cheapestDateId) {
  //         console.log(`Cheapest date selected: ${cheapestDateId} with price ₹${cheapestPrice}`);
  //         await page.locator(`[id="${cheapestDateId}"]`).click();
  //         return cheapestPrice;
  //     } else {
  //         console.error('No valid date found.');
  //         return null;
  //     }
  // };


  // Search button
  const searchButton = page.locator('div#divSearchFlight button.srchBtnSe');
  await searchButton.waitFor({ state: 'visible', timeout: 3000 });
  await searchButton.click();
  // console.log('Search button clicked.');



  // Wait for flight details to appear
  const flightDetailsSection = page.locator('.main-bo-lis.ng-scope').nth(0);
  await flightDetailsSection.waitFor({ state: 'visible', timeout: 10000 });



  // Locate and click the "Cheapest" button
  const cheapestButton = page.locator('.chepestbt');
  await cheapestButton.waitFor({ state: 'visible', timeout: 5000 });
  await cheapestButton.click();
  // console.log('Clicked "Cheapest" button to sort flights.');
  await page.waitForTimeout(3000);



  // Fetch flight prices and verify price 
  const flightPrices = await page.locator('.flight-price-class').allInnerTexts();
  // console.log('Flight Prices:', flightPrices);

  // Convert prices to numbers for validation
  const priceNumbers = flightPrices.map(price => parseFloat(price.replace(/[^0-9.]/g, '')));
  const isSorted = priceNumbers.every((val, i, arr) => !i || arr[i - 1] <= val);

  // Assert that prices are sorted
  expect(isSorted).toBeTruthy();
  // console.log('Flights are sorted by cheapest successfully.');



  // Click the "Book Now" button for the cheapest flight
  const bookButton = page.locator('.btn.book-bt-n.ng-scope').nth(0);
  await bookButton.waitFor({ state: 'visible', timeout: 5000 });
  await bookButton.click();
  await page.waitForTimeout(2000);



  // // Close login popup
  // const loginPopup = page.locator('#lgnBox');
  // if (await loginPopup.isVisible({ timeout: 10000 })) {
  //   const closeButton = loginPopup.locator('._crosslog');
  //   await closeButton.click();
  //   console.log('Login popup closed.');
  //   await expect(loginPopup).not.toBeVisible();
  // }


  // // Entering invalid promocode 
  // const promoCodeSection = page.locator('//*[@id="sidebar"]/div/div[1]/div[1]/div[5]');
  // await promoCodeSection.waitFor({ state: 'visible', timeout: 10000 });
  // console.log("Promo Code section is visible.");
  
  // //Entering an invalid promo code
  // const promoCodeInput = page.locator('//*[@id="txtCouponCode"]');
  // await promoCodeInput.fill('FIRST56');
  // console.log("Entered the invalid promo code: FIRST56");

  // // Submiting the promo code and Locate the Apply button
  // const applyPromoButton = page.locator('//*[@id="divCouponCodeApply"]/div[2]/div');
  // await applyPromoButton.click();
  // console.log("Clicked on the 'Apply' button.");

  // //  Checking for the error message 
  // const promoerrorMessage = page.locator('//*[@id="easeFareDetails1_promodiv"]');
  // await promoerrorMessage.waitFor({ state: 'visible', timeout: 10000 });
  // console.log("Error message is displayed for the invalid promo code.");

  

   //Entering an valid promo code
   const promoCodeInput1 = page.locator('//*[@id="txtCouponCode"]');
   await promoCodeInput1.fill('BESTDEAL');
   console.log("Entered the valid promo code: BESTDEAL");

   // Submiting the promo code and Locate the Apply button
   const applyPromoButton1 = page.locator('//*[@id="divCouponCodeApply"]/div[2]/div');
   await applyPromoButton1.click();
   console.log("Clicked on the 'Apply' button.");

   //  Checking for the confirm message 
   const promosucessMessage = page.locator('//*[@id="easeFareDetails1_promodiv"]');
   await promosucessMessage.waitFor({ state: 'visible', timeout: 10000 });
   console.log("sucess msg is displayed for the valid promo code.");

  // Check for Fair Summary Deatils 
  const fareSummaryLocator = page.locator('#divFareSummary');
  await fareSummaryLocator.waitFor({ state: 'visible', timeout: 10000 });
  console.log('Fare summary loaded.');

  await page.waitForTimeout(2000);

    // Close login popup
    const loginPopup = page.locator('#lgnBox');
    if (await loginPopup.isVisible({ timeout: 10000 })) {
      const closeButton = loginPopup.locator('._crosslog');
      await closeButton.click();
      console.log('Login popup closed.');
      await expect(loginPopup).not.toBeVisible();
    }

});