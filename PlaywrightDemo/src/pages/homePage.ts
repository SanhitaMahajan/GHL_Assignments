import { Page, expect } from '@playwright/test';

export class HomePage{
    readonly page:Page;
    
    constructor(page:Page)
    {
    this.page = page;
    }

    // loading home page 
    async landToHomePage(url:string) : Promise<void> {
        await this.page.goto(url);
    }

    // 
    async validateNavbar() {
        await expect(this.page.locator('nav')).toBeVisible(); // check navbar is present
    }

    async validateTitle(){
        await expect(this.page).toHaveTitle('STORE'); // check for title store 
    }

     
     async validateCategories(): Promise<void> {
        const categories = await this.page.locator('.list-group .list-group-item'); 
        await expect(categories.nth(1)).toBeVisible(); // check categorie "Phones" is present 
        await expect(categories.nth(2)).toBeVisible(); // check categorie "Laptops" is present
        await expect(categories.nth(3)).toBeVisible(); // check categorie "Monitors" is present
    }
        
}