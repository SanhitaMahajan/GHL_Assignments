import { test, Page, expect } from '@playwright/test';
import { HomePage } from '../src/pages/homePage';

test.describe('Home page functionality', () => {
    
    let page: Page;
    let homePage: HomePage;

    // test.beforeAll(async ({ browser }) => {
    //     page = await browser.newPage();
    //     homePage = new HomePage(page); 
    // });

    // test('should land on home page', async () => {
    //     await homePage.landToHomePage('https://www.demoblaze.com/#');
    // });

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new HomePage(page);
        await homePage.landToHomePage('https://www.demoblaze.com/#');
    });

  
    test('should display the navbar', async () => {
        await homePage.validateNavbar();
    });

    

    // test('Validate Homepage', async ({ page }) => {
    //     await page.goto('https://www.demoblaze.com/#');
    //     await expect(page).toHaveTitle('STORE');
    //     await expect(page.locator('nav')).toBeVisible(); // Check navbar is present
    //     await expect(page.locator('div#carouselExampleIndicators')).toBeVisible(); // Check carousel is visible
    // });
   
});
