package org.sample;
	import com.microsoft.playwright.*;
	import com.microsoft.playwright.options.*;
	import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;
	import java.util.*;

public class Police_Verification_Certification_Status {

	

	  public static void main(String[] args) {
	    try (Playwright playwright = Playwright.create()) {
	      Browser browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
	        .setHeadless(false));
	      BrowserContext context = browser.newContext();
	      Page page = context.newPage();
	      page.navigate("https://eservices.tnpolice.gov.in/CCTNSNICSDC/PoliceVerificationServiceViewStatus?0");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Mobile No.")).click();
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Mobile No.")).fill("7092954412");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).click();
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).fill("yZ");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).press("CapsLock");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).fill("yZff");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).press("CapsLock");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).fill("yZffD");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).press("CapsLock");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).fill("yZ");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).press("CapsLock");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).fill("yZFF");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).press("CapsLock");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).fill("yZFFd");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).press("CapsLock");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).fill("yZFFdX");
	      page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Send OTP").setExact(true)).click();
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).click();
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).fill("mA");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).press("CapsLock");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).fill("mAab2e");
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).press("Enter");
	      page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Send OTP").setExact(true)).click();
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).click();
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("OTP Number")).click();
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("OTP Number")).fill("972459");
	      page.getByRole(AriaRole.CELL, new Page.GetByRoleOptions().setName("OTP*").setExact(true)).click();
	      page.getByRole(AriaRole.TEXTBOX, new Page.GetByRoleOptions().setName("Secure code")).fill("WpEC59");
	      page.getByText("Submit").click();
	      Download download = page.waitForDownload(() -> {
	        page.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("Click here to Download")).click();
	      });
	      page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Exit")).click();
	    }
	  }
	}

