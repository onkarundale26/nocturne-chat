import { test, expect } from '@playwright/test';

test.describe('Nocturne Real-time Chat', () => {
  
  test('User A can send a message and User B receives it privately', async ({ browser }) => {
    const testId = Math.random().toString(36).substring(7);
    const nameA = `UserA_${testId}`;
    const nameB = `UserB_${testId}`;
    const nameC = `UserC_${testId}`;

    // 1. Setup User A
    const contextA = await browser.newContext();
    const pageA = await contextA.newPage();
    await pageA.goto('/join');
    await pageA.fill('input[placeholder="vibe_architect"]', nameA);
    await pageA.click('button:has-text("Join Chat")');
    await expect(pageA).toHaveURL(/.*chat/);

    // 2. Setup User B
    const contextB = await browser.newContext();
    const pageB = await contextB.newPage();
    await pageB.goto('/join');
    await pageB.fill('input[placeholder="vibe_architect"]', nameB);
    await pageB.click('button:has-text("Join Chat")');
    await expect(pageB).toHaveURL(/.*chat/);

    // 3. Setup User C (Privacy Witness)
    const contextC = await browser.newContext();
    const pageC = await contextC.newPage();
    await pageC.goto('/join');
    await pageC.fill('input[placeholder="vibe_architect"]', nameC);
    await pageC.click('button:has-text("Join Chat")');
    await expect(pageC).toHaveURL(/.*chat/);

    // 4. User A selects User B and sends a message
    // Use the unique nameB for selection
    const userBButton = pageA.getByRole('button', { name: nameB }).first();
    await expect(userBButton).toBeVisible({ timeout: 15000 });
    await userBButton.click();
    
    const messageText = `Secret vibe from User A ${testId}`;
    const messageInput = pageA.getByPlaceholder('Type a message...');
    await messageInput.waitFor({ state: 'visible' });
    await messageInput.fill(messageText);
    await messageInput.press('Enter');

    // 5. Verify User A sees message in the main feed
    const outgoingBubble = pageA.locator('main').getByText(messageText);
    await expect(outgoingBubble).toBeVisible();
    
    // 6. User B selects User A and receives the message
    const userAButton = pageB.getByRole('button', { name: nameA }).first();
    await expect(userAButton).toBeVisible({ timeout: 15000 });
    await userAButton.click();
    
    const incomingBubble = pageB.locator('main').getByText(messageText);
    await expect(incomingBubble).toBeVisible({ timeout: 15000 });

    // 7. Verify User C does NOT receive the message (Privacy check)
    const userAButtonForC = pageC.getByRole('button', { name: nameA }).first();
    await expect(userAButtonForC).toBeVisible({ timeout: 15000 });
    await userAButtonForC.click();
    
    const hiddenBubble = pageC.locator('main').getByText(messageText);
    await expect(hiddenBubble).not.toBeVisible();

    // Cleanup
    await contextA.close();
    await contextB.close();
    await contextC.close();
  });

  test('UI sanity check - Join page elements', async ({ page }) => {
    await page.goto('/join');
    await expect(page).toHaveTitle(/Nocturne/);
    await expect(page.locator('h1')).toContainText('Join the Conversation');
    await expect(page.locator('button:has-text("Join Chat")')).toBeVisible();
  });
});
