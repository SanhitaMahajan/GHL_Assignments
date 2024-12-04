import { Page, expect } from '@playwright/test';

export class HomePage{
    readonly page:Page;
    
    constructor(page:Page)
    {
    this.page = page;
    }

    async landToHomePage(url:string) : Promise<void> {
        await this.page.goto(url);
    }

    async validateNavbar() {
        await expect(this.page.locator('nav')).toBeVisible(); // Check navbar is present
    }
        
}