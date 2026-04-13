# Ultimate Guide to Updating Your Portfolio!

Since you want to push this to GitHub and be able to easily update it in the future, here is the exact step-by-step workflow you need to follow.

## 1. Putting it on GitHub (First Time Only)
I have already initialized GitHub on your local project and committed all the files for you! To push it up to the internet:
1. Go to [GitHub.com](https://github.com/) and create a new repository. Name it whatever you want (e.g., `portfolio`). Do **not** check "add a README file".
2. GitHub will show you a page with commands under "…or push an existing repository from the command line".
3. Copy specifically these two commands and paste them into your VS Code / PowerShell terminal:
   ```bash
   git remote add origin https://github.com/YourUsername/your-repo-name.git
   git push -u origin main
   ```
   *(Note: it might ask for your GitHub login if you haven't logged in on this computer.)*

## 2. Deploying It (Fastest & Best Way)
The best way to host a modern React app is using **Vercel** because it automatically updates whenever you change your code on GitHub.
1. Go to [Vercel.com](https://vercel.com/) and sign up with your GitHub account.
2. Click "Add New..." -> "Project".
3. You will see your newly uploaded GitHub repository. Click **Import**.
4. Set the Framework Preset to **Vite** (Vercel usually auto-detects this).
5. Click **Deploy**. In ~2 minutes, your site is live! They will give you a free custom link.

## 3. How to Update or Add Info in the Future

Once connected to Vercel, **changing your website is completely automatic**. Whatever you push to GitHub will automatically update on the live URL in a few minutes. 

### A. How to Add or Change Your Resume
Instead of struggling to re-link things:
1. In your project code, find the `public/` folder.
2. Delete the old `resume.pdf` (or if it's your first time, just drag your new PDF in there).
3. **Make sure your new file is perfectly named `resume.pdf`** (all lowercase).
4. Since the button code already points to `/resume.pdf`, it will instantly work. You don't have to touch a single line of code!

### B. How to Add More Projects
1. Open the file `src/pages/Projects.jsx`.
2. Scroll to the top where you see `const PROJECTS = [ { ... }, { ... } ];`
3. Just copy one of the project blocks `{}` and paste it right underneath as a new item in the list! 
4. Update the text, title, and links directly there. The UI will automatically create the new card for you!

### C. Publishing Your Changes Live
Whenever you make a change (like adding the resume or editing a project), run these 3 basic commands in your terminal to save and push your changes:

```bash
git add .
git commit -m "Updated my resume and projects"
git push
```
...and that's it! Wait 2 minutes, refresh your live website link, and your changes will be there!
