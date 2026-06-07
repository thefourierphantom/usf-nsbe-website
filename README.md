## USF NSBE Website

The USF NSBE Website is the official web presence for the University of South Florida chapter of the National Society of Black Engineers. Built with plain HTML, CSS, and vanilla JavaScript — no build tools, no frameworks, no npm risk.

---

## Deployment

**GitHub → Netlify → GoDaddy domain**

The `main` branch deploys automatically to Netlify on every push. The custom domain (`usfnsbe.com`) is managed through GoDaddy and pointed at Netlify's DNS. When handing off to a new officer:

1. Transfer the GitHub repo ownership (Settings → Transfer)
2. Add the new officer as a Netlify team member
3. Update GoDaddy nameservers if the domain is being moved

---

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/thefourierphantom/usf-nsbe-website.git
   ```
2. **Navigate to the project directory**
   ```bash
   cd usf-nsbe-website
   ```
3. **Run a local development server**

   The site uses root-relative paths, so a local server is required (not just opening the file directly).

   **VS Code Live Server (recommended)**
   - Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
   - Right-click `index.html` → "Open with Live Server"
   - Opens at `http://127.0.0.1:5500/`

---

## Repository Structure

```
/                   → Homepage
/about/             → Leadership & chapter info
/initiatives/       → Programs and outreach
/sponsors/          → Sponsorship tiers and current sponsors
/conference/        → NSBE Annual Convention info
/contact/           → Contact page
/css/               → Shared stylesheet
/js/                → Menu and carousel scripts
/images/            → Shared images (logos, hero, carousel)
```

---

## How to Contribute

We welcome contributions from NSBE members and the wider community.

Before submitting changes, please read the contribution guide:  
[CONTRIBUTING.md](./CONTRIBUTING.md)

---

## License

Released under the MIT License. See [LICENSE.md](./LICENSE.md) for details.
