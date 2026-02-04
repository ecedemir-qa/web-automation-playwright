import { LoginPage } from '../pages/LoginPage';
import { users } from './testData';

export async function loginAsStandardUser(page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(
    users.standard.username,
    users.standard.password
  );
}
