package org.sample;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class LaunchBrowser {
	public static void main(String[] args) {

		Playwright playwright = Playwright.create();

//		// browser launch the chrome or msedge or firefox
//		Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
//				// chrome,msedge in private or inconginto mode will execute the browser in latest version also run system default browser
//				.setChannel("chrome").setHeadless(false).setArgs(Arrays.asList("--start-maximized")));
//		BrowserContext browsercontext = browser.newContext(new Browser.NewContextOptions().setViewportSize(null));
//
//		// another ways to executable in System Default browser
//
//		Browser browser = playwright.chromium()
//				.launch(new BrowserType.LaunchOptions()
//						// path of the any system browser chrome,msedge,firefox
//						.setExecutablePath(Paths.get("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"))
//						.setHeadless(false).setArgs(Arrays.asList("--start-maximized")));
//		BrowserContext browsercontext = browser.newContext(new Browser.NewContextOptions().setViewportSize(null));
//		
//		// another way for executable system browser with current userdata profile using LaunchPersistentContext
//		BrowserContext browsercontext = playwright.chromium()
//				//path of default browser userdata , if its blanks system default new userin chrome, msedge, firefox
//				.launchPersistentContext(Paths.get(""),
//				new BrowserType.LaunchPersistentContextOptions().setHeadless(false)
//				// path of browser installed path
//				.setExecutablePath(Paths.get("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe")));
//				//.setExecutablePath(Paths.get("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe")));
//
//		BrowserContext browsercontext = playwright.chromium()
//				// path of default browser userdata ,it launch current user profile of chrome,msedge,firefox
//				.launchPersistentContext(Paths.get("C:\\Users\\Karna\\AppData\\Local\\Google\\Chrome\\User Data\\Profile"),
//						new BrowserType.LaunchPersistentContextOptions().setHeadless(false)
//								.setExecutablePath(
//										Paths.get("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe")));
//		// Paths.get("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe")));
		
		
		BrowserContext browsercontext = playwright.chromium()
		.launchPersistentContext(Paths.get("C:\\Users\\Karna\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 39"),
				new BrowserType.LaunchPersistentContextOptions()
					.setHeadless(false)
					.setChannel("chrome")
					.setArgs(Arrays.asList("--no-first-run", "--disable-extensions", "--disable-default-apps", "--disable-popup-blocking")));

		Page page = browsercontext.newPage();

		page.navigate("https://www.google.com/");
		// page.navigate("https://www.google.com/");
		String title = page.title();
		System.out.println("Title of the page is: " + title);
		
		Path profilePath = Paths.get("C:/Users/Karna/AppData/Local/Google/Chrome/User Data/Profile 11");
		   System.out.println("Profile exists: " + Files.exists(profilePath));

	}

}
