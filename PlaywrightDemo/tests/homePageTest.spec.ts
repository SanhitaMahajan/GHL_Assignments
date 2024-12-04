import { test, Page, expect } from '@playwright/test';
import { HomePage } from '../src/pages/homePage';
import { exitCode } from 'process';

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

    test('should have categories', async()=>{
        await homePage.validateCategories();
    })

    test('should redirect to login modal on clicking Log in', async () => {
        await page.locator('#login2').click();

        const loginModal = page.locator('#logInModal'); 
        await expect(loginModal).toBeVisible(); 

        await expect(loginModal.locator('input[type="text"]')).toBeVisible(); 
        await expect(loginModal.locator('input[type="password"]')).toBeVisible(); 
    });

    test('should redirect to signup modal on clicking Sign up', async()=>{
        await page.locator('#signin2').click();

        const signupModal = page.locator('#signInModal');
        await expect(signupModal).toBeVisible();

        await expect(signupModal.locator('input[type="text"]')).toBeVisible();
        await expect(signupModal.locator('input[type="password"]')).toBeVisible();
    })

  
   
});
