package org.sample;

import java.util.Arrays;

import com.microsoft.playwright.*;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class Handling_Elements {
	public static void main(String[] args) throws InterruptedException {
		Playwright playwright = Playwright.create();

		// maxmize -setArgs(), chrome - setChannel(), headless mode - setHeadless(false)
		Browser browser = playwright.chromium()
				.launch(new BrowserType.LaunchOptions().setHeadless(false).setArgs(Arrays.asList("--start-maximized")));

		// new browser launch everytime - newContext()
		BrowserContext context = browser.newContext(new Browser.NewContextOptions().setViewportSize(null)); 
		
		Page page = context.newPage();
		page.navigate("https://letcode.in/edit/");

		// Types of locator fill the value

		page.fill("#fullName", "karnamoorhty");

		page.locator("#fullName").fill("karna");

		Locator locator = page.locator("#fullName");
		locator.fill("karna");
		Thread.sleep(3000);
		locator.clear();

		locator.type("karna_Type");
		Thread.sleep(3000);
		locator.clear();

		// type method is deprecated so use pressSequentially method
		locator.pressSequentially("karna_Type");
		Thread.sleep(3000);
		locator.clear();

		locator.pressSequentially("karna_Type123", new Locator.PressSequentiallyOptions().setDelay(100));
		Thread.sleep(3000);

		// append the text in end of previous text
		Locator locator2 = page.locator("#join");
		locator2.press("End");
		// locator2.type(" man");
		locator2.pressSequentially(" man");
		locator2.press("Tab");
		Thread.sleep(3000);

		// Get Attribute
		String attribute = page.locator("id=getMe").getAttribute("value");
		System.out.println("Inside the box value : " + attribute);
		Thread.sleep(3000);

		// clear the text box
		page.locator("id=clearMe").fill("");

		Thread.sleep(3000);

		page.locator("id=clearMe").clear();

		Thread.sleep(3000);
		
		// gettext method 
		String textContent = page.locator("//label[text()='Clear the text']").textContent();
		System.out.println("getText : "+textContent);
		
		
		
		Thread.sleep(3000);
		

		// assertion to check whether the text box is disabled
		boolean disabled = page.locator("#noEdit").isDisabled();
		System.out.println("Is the text box disabled ? " + disabled);
		
		System.out.println("Success");
		
		
		playwright.close();

	}

	private static Object assertThat(boolean disabled) {
		// TODO Auto-generated method stub
		return null;
	}

}
