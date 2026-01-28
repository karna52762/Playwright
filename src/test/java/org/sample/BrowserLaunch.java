package org.sample;

import java.nio.file.Paths;

import com.microsoft.playwright.*;
import com.microsoft.playwright.Page.ScreenshotOptions;

public class BrowserLaunch {
	public static void main(String[] args) {
		Playwright playwright = Playwright.create();
		
		BrowserType browser = playwright.chromium();
		BrowserType.LaunchOptions options = new BrowserType.LaunchOptions();
		options.setHeadless(false);
		options.setSlowMo(50);

		// Browser browser = playwright.webkit().launch();
		// Browser browser = playwright.chromium().launch();

		Browser browser1 = playwright.chromium()
				.launch(new BrowserType.LaunchOptions().setHeadless(false).setSlowMo(50));

		System.out.println("Browser Details " + browser1.browserType().name() + browser1.version());
		Page page = browser1.newPage();
		page.navigate("https://www.google.com/");

		System.out.println("Title : " + page.title());

		page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("screenshot.png")));
		browser1.close();

	}
}
