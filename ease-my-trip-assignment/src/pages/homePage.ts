import {Page, expect} from '@playwright/test';
export class HomePage{

    readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }

    // loading home page 
    async landToHomePage(url:string):Promise<void>{
        await this.page.goto(url);
    }

}