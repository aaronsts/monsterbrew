import { test, expect } from "@playwright/test";

test("Should submit a form to create new monster statblock", async ({
	page,
}) => {
	// Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
	await page.goto("/");
	// Find an element with the text 'About' and click on it
	await page.click("text=Editor");
	// The new URL should be "/about" (baseURL is used there)
	await expect(page).toHaveURL("/editor");
	// Fill in form
	// Name
	await page.getByLabel("Monster Name").fill("Ancient Black Dragon");
	// Type
	await page
		.locator("div")
		.filter({ hasText: /^Monster TypeSelect type \.\.\.$/ })
		.getByRole("button")
		.click();
	await page.getByRole("option", { name: "Dragon" }).click();
	// Size
	await page.getByRole("button", { name: "Select type" }).click();
	await page.getByRole("option", { name: "Gargantuan" }).click();
	// Alignment
	await page.getByPlaceholder("ex. Chaotic Evil").fill("Chaotic Evil");
	// Armor Class
	await page.getByLabel("Armor Class (AC)").fill("22");
	// Armor Class type
	await page.getByPlaceholder("ex. Natural Armor").fill("Natural Armor");
	// Hit Die
	await page.getByPlaceholder("ex. 21d20").fill("21d20");
	await page.getByPlaceholder("ex. 147").fill("147");
	// Movement
	await page.getByPlaceholder("ex. 40 ft., fly 80 ft., swim").fill("40 ft.");
	// Stats
	await page.getByLabel("Strength (STR)").fill("27");
	await page.getByLabel("Dexterity (DEX)").fill("26");
	await page.getByLabel("Constitution (CON)").fill("25");
	await page.getByLabel("Intelligence (INT)").fill("24");
	await page.getByLabel("Wisdom (WIS)").fill("23");
	await page.getByLabel("Charisma (CHA)").fill("22");
	// Senses
	await page.getByLabel("True Sight").fill("10 ft.");
	await page.getByLabel("Passive Perception").fill("22");
	// Languages
	await page.getByLabel("Languages").fill("Draconic");
	// Abilities
	await page.getByLabel("Traits").getByLabel("Toggle bold").click();
	await page.getByLabel("Traits").locator("div").nth(4).fill("Amphibious. ");
	await page.getByLabel("Traits").getByLabel("Toggle bold").click();
	// await page.getByRole("paragraph").fill("Dragons can breath in air and water");
	// Legendary
	await page.getByLabel("Legendary Monster").click();
	await page
		.locator("div")
		.filter({ hasText: /^Legendary Actions$/ })
		.locator("div")
		.nth(3)
		.fill("test");
	// Get the next console log
	const msgPromise = page.waitForEvent("console");
	await page.getByRole("button", { name: "Submit" }).click();

	const msg = await msgPromise;
	// Deconstruct console log arguments
	const result = await msg.args()[0].jsonValue();
	expect(result).toContainText("Ancient Black Dragon");
});
