
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
    const dateToSelect = '13/12/2024';
    const dateLocator = page.locator(`li span[id="${dateToSelect}"]`);

    await dateLocator.waitFor({ state: 'visible', timeout: 3000 });
    await dateLocator.click();
    // console.log(`Selected Date: ${dateToSelect}`);



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



    // Close login popup
    const loginPopup = page.locator('#lgnBox');
    if (await loginPopup.isVisible({ timeout: 10000 })) {
      const closeButton = loginPopup.locator('._crosslog');
      await closeButton.click();
      console.log('Login popup closed.');
      await expect(loginPopup).not.toBeVisible();
    }


    // Check for Fair Summary Deatils 
    const fareSummaryLocator = page.locator('#divFareSummary');
    await fareSummaryLocator.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Fare summary loaded.');



    
  });