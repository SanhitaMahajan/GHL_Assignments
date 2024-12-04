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

    test('should have title store', async() =>{
        await homePage.validateTitle();
    })

   
});
