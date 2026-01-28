package org.sample;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.*;
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Pattern;

import com.microsoft.playwright.Locator;

public class TamilRockers {

	public static void main(String[] args) {
		try (Playwright playwright = Playwright.create()) {

			BrowserContext browsercontext = playwright.chromium().launchPersistentContext(Paths.get(""),
					new BrowserType.LaunchPersistentContextOptions().setHeadless(false)
							.setExecutablePath(Paths.get("")));

			Page page = browsercontext.newPage();
			page.navigate("https://www.1tamilmv.moda/");
			page.locator("iframe").nth(1).contentFrame().locator("img").first().click();
			page.locator("iframe").contentFrame().locator("img").first().click();
			Page page1 = page.waitForPopup(() -> {
				page.getByRole(AriaRole.LINK).filter(new Locator.FilterOptions().setHasText(Pattern.compile("^$")))
						.click(new Locator.ClickOptions().setButton(MouseButton.RIGHT));
			});
			page1.close();
			page.locator("iframe").nth(1).contentFrame().locator("img").first().click();
			page.locator("iframe").contentFrame().locator("img").first().click();
			Page page2 = page.waitForPopup(() -> {
				page.getByRole(AriaRole.LINK).filter(new Locator.FilterOptions().setHasText(Pattern.compile("^$")))
						.click(new Locator.ClickOptions().setButton(MouseButton.RIGHT));
			});
			page2.close();
			page.getByRole(AriaRole.STRONG)
					.filter(new Locator.FilterOptions().setHasText("Dawood (2025) Tamil PreDVD ("))
					.getByRole(AriaRole.LINK).click(new Locator.ClickOptions().setButton(MouseButton.RIGHT));
			Page page3 = context.newPage();
			page3.navigate(
					"https://www.1tamilmv.moda/index.php?/forums/topic/194161-dawood-2025-tamil-predvd-1080p-720p-x264-26gb-14gb-950mb-x264-700mb-400mb-250mb-hq-clean-audio/");
			page.getByRole(AriaRole.LINK,
					new Page.GetByRoleOptions()
							.setName("Stand Your Ground (2025) (BluRay + Org Auds) - [1080p & 720p - x264 - (Tamil +"))
					.click(new Locator.ClickOptions().setButton(MouseButton.RIGHT));
			Page page4 = context.newPage();
			page4.navigate(
					"https://www.1tamilmv.moda/index.php?/forums/topic/194168-stand-your-ground-2025%C2%A0bluray-original-audios-1080p-720p-x264-tamil-hindi-eng-18gb-1gb-x264-tamil-hindi-350mb-esub/");
			Page page5 = page.waitForPopup(() -> {
				page.getByRole(AriaRole.LINK).filter(new Locator.FilterOptions().setHasText(Pattern.compile("^$")))
						.click(new Locator.ClickOptions().setButton(MouseButton.RIGHT));
			});
			page5.close();
			page.locator("iframe").contentFrame().locator("img").first().click();
			page.getByRole(AriaRole.LINK,
					new Page.GetByRoleOptions()
							.setName("Top Cooku Dupe Cooku (2025) Tamil - S02 - EP27 TRUE WEB-DL - [1080p & 720p -"))
					.click(new Locator.ClickOptions().setButton(MouseButton.RIGHT));
			Page page6 = context.newPage();
			page6.navigate(
					"https://www.1tamilmv.moda/index.php?/forums/topic/191503-top-cooku-dupe-cooku-2025-tamil-s02-ep-01-27-true-web-dl-1080p-720p-360p-avc-untouched-12gb-800mb-250mb/");
			page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Police Police (2025) S01 EP("))
					.click(new Locator.ClickOptions().setButton(MouseButton.RIGHT));
			Page page7 = context.newPage();
			page7.navigate(
					"https://www.1tamilmv.moda/index.php?/forums/topic/192303-police-police-2025-s01-ep-01-32-true-web-dl-1080p-720p-avc-aac-20-tamil-telugu-hindi-malayalam-3gb-12gb-600mb-esub/");
			page7.navigate(
					"https://www.1tamilmv.moda/index.php?/forums/topic/192303-police-police-2025-s01-ep-01-32-true-web-dl-1080p-720p-avc-aac-20-tamil-telugu-hindi-malayalam-3gb-12gb-600mb-esub/");
			Page page8 = page.waitForPopup(() -> {
				page.getByRole(AriaRole.LINK).filter(new Locator.FilterOptions().setHasText(Pattern.compile("^$")))
						.click(new Locator.ClickOptions().setButton(MouseButton.RIGHT));
			});
			page8.close();
			page.getByRole(AriaRole.STRONG)
					.filter(new Locator.FilterOptions().setHasText("Kaantha (2025) Telugu PreDVD"))
					.getByRole(AriaRole.LINK).nth(1).click(new Locator.ClickOptions().setButton(MouseButton.RIGHT));
			Page page9 = context.newPage();
			page9.navigate(
					"https://www.1tamilmv.moda/index.php?/forums/topic/194117-kaantha-2025-tamil-predvd-1080p-720p-x264-26gb-14gb-900mb-x264-700mb-400mb-250mb-hq-clean-audio/");
			page9.navigate(
					"https://www.1tamilmv.moda/index.php?/forums/topic/194117-kaantha-2025-tamil-predvd-1080p-720p-x264-26gb-14gb-900mb-x264-700mb-400mb-250mb-hq-clean-audio/");
			Page page10 = page9.waitForPopup(() -> {
				page9.locator("#lkef").click();
			});
			page10.close();
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.getByText("Jump to content PreDVD /").press("ArrowDown");
			page9.close();
			page6.close();
			page7.locator("#lkad8").click();
			page7.getByText("Jump to content WEB-SERIES /").press("ArrowDown");
			page7.getByText("Jump to content WEB-SERIES /").press("ArrowDown");
			page7.getByText("Jump to content WEB-SERIES /").press("ArrowDown");
			page7.getByText("Jump to content WEB-SERIES /").press("ArrowDown");
			page7.getByText("Jump to content WEB-SERIES /").press("ArrowDown");
			page7.getByText("Jump to content WEB-SERIES /").press("ArrowDown");
			page7.getByText("Jump to content WEB-SERIES /").press("ArrowDown");
			page7.getByText("Jump to content WEB-SERIES /").press("ArrowDown");
			page7.close();
			page3.getByText("TamilMV Official Telegram Channel :- Click Here Dawood (2025) Tamil PreDVD -").click();
			page3.getByText("×").nth(2).click();
			page3.getByText("Jump to content PreDVD /").press("ArrowDown");
			page3.getByText("Jump to content PreDVD /").press("ArrowDown");
			page3.getByText("Jump to content PreDVD /").press("ArrowDown");
			page3.getByText("Jump to content PreDVD /").press("ArrowDown");
			page3.getByText("Jump to content PreDVD /").press("ArrowDown");
			page3.getByText("Jump to content PreDVD /").press("ArrowDown");
			page3.getByText("Jump to content PreDVD /").press("ArrowDown");
			page3.getByText("Jump to content PreDVD /").press("ArrowDown");
			page3.getByText("Jump to content PreDVD /").press("ArrowDown");
			page3.getByText("Jump to content PreDVD /").press("ArrowDown");
			page3.getByText("Jump to content PreDVD /").press("ArrowDown");
			page3.close();
			page4.close();
		}

	}

}
