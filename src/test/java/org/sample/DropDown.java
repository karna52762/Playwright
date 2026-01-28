package org.sample;

import java.util.Arrays;
import java.util.List;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.options.SelectOption;

public class DropDown {
	public static void main(String[] args) throws InterruptedException {
		Playwright playwright = Playwright.create();
		// Page page = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false)).newContext().newPage();
		Browser browser = playwright.chromium()
				.launch(new BrowserType.LaunchOptions().setHeadless(false).setArgs(Arrays.asList("--start-maximized")));

		// required for fullscreen windowing
		BrowserContext context = browser.newContext(new Browser.NewContextOptions().setViewportSize(null));

		Page page = context.newPage();
		page.navigate("https://letcode.in/dropdowns");

		/*
		 * // select by value page.selectOption("#fruits", "2"); String
		 * notification_Msg1 = page.locator("//p[contains(text(),'Y')]").textContent();
		 * System.out.println(notification_Msg1); Thread.sleep(3000);
		 * 
		 * // select by index page.selectOption("#fruits", "3"); String
		 * notification_Msg2 = page.locator("//p[contains(text(),'Y')]").textContent();
		 * System.out.println(notification_Msg2); Thread.sleep(3000);
		 * 
		 * // select by text page.selectOption("#fruits", "Pine Apple"); String
		 * notification_Msg3 = page.locator("//p[contains(text(),'Y')]").textContent();
		 * System.out.println(notification_Msg3); Thread.sleep(3000);
		 * 
		 * System.out.
		 * println("************ Another ways to select dropdown ************"); //
		 * select by text Locator fruitDD = page.locator("#fruits");
		 * fruitDD.selectOption(new SelectOption().setLabel("Orange")); String
		 * notification_Msg4 = page.locator("//p[contains(text(),'Y')]").textContent();
		 * System.out.println(notification_Msg4); Thread.sleep(3000);
		 * 
		 * // select by value fruitDD.selectOption(new SelectOption().setValue("1"));
		 * String notification_Msg5 =
		 * page.locator("//p[contains(text(),'Y')]").textContent();
		 * System.out.println(notification_Msg5); Thread.sleep(3000);
		 * 
		 * // select by index fruitDD.selectOption(new SelectOption().setIndex(1));
		 * String notification_Msg6 =
		 * page.locator("//p[contains(text(),'Y')]").textContent();
		 * System.out.println(notification_Msg6); Thread.sleep(3000);
		 */
		System.out.println("************  multiple select on dropdown************");


		// multiple select by value
		Locator lang1 = page.locator("#superheros");
		lang1.selectOption(new String[] { "ta", "cm", "rb" });
		String notification_Msg8 = page.locator("//p[contains(text(),'Y')]").textContent();
		System.out.println(notification_Msg8);

		// multiple select by text
		Locator lang2 = page.locator("#superheros");
		lang1.selectOption(new String[] { "Superman", "Spider-Man", "Iron Man" });
		String notification_Msg9 = page.locator("//p[contains(text(),'Y')]").textContent();
		System.out.println(notification_Msg9);

		System.out.println("************  multiple select on dropdown************");

		// multiple select by value
		Locator lang11 = page.locator("#superheros");
		lang11.selectOption(new String[] { "ta", "cm", "rb" });
		String notification_Msg81 = page.locator("//p[contains(text(),'Y')]").textContent();
		System.out.println(notification_Msg81);

		// multiple select by text
		Locator lang21 = page.locator("#superheros");
		lang11.selectOption(new String[] { "Superman", "Spider-Man", "Iron Man" });
		String notification_Msg91 = page.locator("//p[contains(text(),'Y')]").textContent();
		System.out.println(notification_Msg91);

		/*
		 * index bsed selection is not working for multiple select dropdown // multiple
		 * select by index Locator lang = page.locator("#superheros");
		 * lang.selectOption(new String[] { "1" }); String notification_Msg7 =
		 * page.locator("//p[contains(text(),'Y')]").textContent();
		 * System.out.println(notification_Msg7);
		 */

		/*
		 * // multiple select by index Locator lang = page.locator("#superheros");
		 * lang.selectOption(new String[] {"1","3","4"}); String notification_Msg7 =
		 * page.locator("//p[contains(text(),'Y')]").textContent();
		 * System.out.println(notification_Msg7);
		 */

		System.out.println("************  To iterate through all the options in the dropdown ************");

		// iterating through all languages

		Locator languages = page.locator("#lang");
		Locator options = languages.locator("option");

		List<String> allInnerTexts = options.allInnerTexts();

		allInnerTexts.forEach(text -> System.out.println(text));

		System.out.println("************  To find the length of the dropdown and select the last option ************");

		// To find the length of the dropdown

		int count = options.count();
		System.out.println("The length of the dropdown is: " + count);

		List<String> selectOption = languages.selectOption(new SelectOption().setIndex(count - 1));
		System.out.println("The selected option is: " + selectOption);

		//
		List<String> selectOption2 = languages.selectOption(new SelectOption().setIndex(count - 2),
				new Locator.SelectOptionOptions().setForce(true).setNoWaitAfter(true).setTimeout(5000) // timeout in ms
		);

		System.out.println("The selected option is: " + selectOption2);

		// country dropdown
		page.locator("#country").allInnerTexts().forEach(text -> System.out.println("country : \n " + text));

		playwright.close();
	}

}
