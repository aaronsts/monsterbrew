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
	await page.getByLabel("Monster Name").fill("Ancient Black Dragon TEST");
	// Type
	await page.getByLabel("Monster Type").click();
	await page.getByLabel("Dragon").click();
	// Size
	await page.getByLabel("Size").click();
	await page.getByLabel("Gargantuan").click();
	// Monster Alignment
	await page.getByLabel("Monster Alignment").fill("Chaotic Evil");
	// Armor Class
	await page.getByLabel("Armor Class (AC)").fill("22");
	// Hit Die
	await page.getByLabel("Hit Die").fill("21d20");
	// Hit Die Modifier
	await page.getByLabel("Hit Points Modifier").fill("147");
	// Movement.walk
	await page.locator('input[name="speed\\.walk"]').fill("40");
	// Movement.fly
	await page.locator('input[name="speed\\.fly"]').fill("80");
	// Movement.swim
	await page.locator('input[name="speed\\.swim"]').fill("40");
	// Stats
	await page.getByLabel("Str").fill("27");
	await page.getByLabel("Dex").fill("14");
	await page.getByLabel("Con").fill("25");
	await page.getByLabel("Int", { exact: true }).fill("16");
	await page.getByLabel("Wis").fill("15");
	await page.getByLabel("Cha", { exact: true }).fill("19");

	// sense
	await page
		.getByPlaceholder("ex. blindsight 60 ft.,")
		.fill("blindsight 60ft, darkvision 120ft., passive perception 26");

	// Languages
	await page.getByLabel("Languages").fill("Draconic, Common");

	// Challenge Rating
	await page.getByLabel("Challenge Rating (CR)").click();
	await page.getByLabel("(33,000 XP)").click();

	// Damages
	await page.getByTestId("damage-type").click();
	await page.getByLabel("acid").click();
	await page.getByRole("button", { name: "Immune" }).click();

	await page.getByTestId("damage-type").click();
	await page.getByLabel("fire").click();
	await page.getByRole("button", { name: "Resistant" }).click();
	await page
		.locator("li")
		.filter({ hasText: "resistant to fire" })
		.getByRole("button")
		.click();

	await page.getByTestId("skill-proficiency").click();
	await page.getByLabel("perception").click();
	await page.getByRole("button", { name: "Expert" }).click();

	await page.getByTestId("skill-proficiency").click();
	await page.getByLabel("stealth").click();
	await page.getByRole("button", { name: "Proficient" }).click();

	await page.getByTestId("saving-throws").click();
	await page.getByLabel("Dexterity").click();
	await page.getByTestId("saving-throw-button").click();

	await page.getByTestId("saving-throws").click();
	await page.getByLabel("Constitution").click();
	await page.getByTestId("saving-throw-button").click();

	await page.getByTestId("saving-throws").click();
	await page.getByLabel("Wisdom").click();
	await page.getByTestId("saving-throw-button").click();

	await page.getByTestId("saving-throws").click();
	await page.getByLabel("Charisma").click();
	await page.getByTestId("saving-throw-button").click();

	// Abilities
	await page.getByRole("button", { name: "Add Ability" }).click();
	await page.getByLabel("Ability Name").fill("Amphibious");
	await page
		.getByPlaceholder("ex. The dragon can breathe")
		.fill("The dragon can breathe air and water");

	await page.getByRole("button", { name: "Add Ability" }).click();
	await page
		.locator('[id="\\:rda\\:-form-item"]')
		.fill("Legendary Resistance (3/Day).");
	await page
		.locator('[id="\\:rdb\\:-form-item"]')
		.fill(
			"If the dragon fails a saving throw, it can choose to succeed instead."
		);

	// Action
	await page.getByRole("button", { name: "Add Action" }).click();
	await page.locator('[id="\\:rdc\\:-form-item"]').fill("Multiattack");
	await page
		.locator('[id="\\:rdd\\:-form-item"]')
		.fill(
			"The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
		);

	await page.getByRole("button", { name: "Create Creature" }).click();
});
