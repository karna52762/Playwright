package org.sample;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class Locator {
	public static void main(String[] args) throws InterruptedException {

		Playwright playwright = Playwright.create();
		Browser browser = playwright.chromium()
				.launch(new BrowserType.LaunchOptions().setHeadless(false).setChannel("chrome").setSlowMo(30));
		Page page = browser.newPage();
		page.navigate("https://www.google.com");
		
		Thread.sleep(3000);
		
		System.out.println(page.url());
		Thread.sleep(3000);
		System.out.println(page.title());
		Thread.sleep(3000);
		String innerText = page.locator("//a[contains(text(),\"Gmail\")]").first().innerText();
		System.out.println(innerText);
		Thread.sleep(3000);
		
		String attribute = page.locator("a").first().getAttribute("href");
		System.out.println(attribute);
		
		Thread.sleep(3000);
		page.locator("//textarea[@name='q']").type("love");

		Thread.sleep(3000);

		playwright.close();
		
	}

}
