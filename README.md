# GI Setu — Heritage, Connected

GI Setu is an educational web project that helps users explore India's Geographical Indication (GI) products and learn about the regions and traditions associated with them.

- **Repository:** https://github.com/lekhajain51/gi-setu-frontend
- **Live website:** https://gi-setu-chi.vercel.app/

> **Project status:** Academic prototype. Some product descriptions and seller profiles are illustrative and should be verified against official GI records. GI Setu is not an official government portal.

## Features

- Browse sample GI products.
- Search for products.
- Filter products by state and category.
- View product details and associated community information.
- Explore sample seller profiles.
- View a sample Heritage Passport.

Official GI verification and complete seller information require further development and reliable source data.

## Technology Stack

**Front end**
- HTML
- CSS
- JavaScript

**Back end and database**
- Node.js
- Express.js
- PostgreSQL (Neon)

The backend and database are intended to support API requests and GI record storage and retrieval. Check the `backend/` folder for the exact implementation and setup scripts.

## Repository Structure

```text
gi-setu-frontend/
├── backend/
├── index.html
└── README.md
```

The `backend/` folder contains the server-side code and API. It may contain additional files and folders.

## Run the Front End

1. Clone or download the repository.
2. Open `index.html` in a web browser, or visit the deployed website.

```bash
git clone https://github.com/lekhajain51/gi-setu-frontend.git
cd gi-setu-frontend
```

## Run the Back End

The exact steps depend on the scripts in `backend/`.

1. Open the `backend/` folder.
2. Check `package.json` for available scripts.
3. Configure required environment variables, including the database connection string.
4. Install dependencies and run the appropriate script listed in `package.json`.

Never commit database passwords, API secrets, or other credentials.

## Database

PostgreSQL is used as the relational database. GI records can include fields such as product name, state, category, description, and status. Confirm the exact schema from the SQL files used in the project.

## Limitations and Future Improvements

- Verify product information against official GI records.
- Add complete seller and artisan information with permission.
- Improve GI reference and certificate verification.
- Expand the product catalogue and documentation.
- Test and improve features based on project requirements.

## Contributor

Repository owner: [lekhajain51](https://github.com/lekhajain51)
siddhithakre (https://github.com/siddhithakre-debug)
rashikajain14 (https://github.com/rashikajain14)
mihiredke (https://github.com/edkemihir-star)

Team members can contribute through branches and pull requests.

## Disclaimer

This is an educational prototype. It does not independently certify the authenticity or legal GI status of any product. Consult authoritative GI sources for official information.
