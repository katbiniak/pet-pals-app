# Pet Pals

The Pet Pals booking experience on the website and on mobile applications. The website is a basic NextJS app with Typescript and React. The mobile app experience is an Expo and React Native also with Typescript, The backend is a public Supabase and designs are available on Figma.

Figma Designs: https://www.figma.com/design/fiTCbRdo6sTLOLzcLIYZSZ/Pet-Pals?node-id=7-212&t=463pMAbnj0VoSbv5-1

## Technical Stack

- Typescript
- NextJS
- Supabase
- shadcn for some UI components
- Pnpm
- Expo
- Jest
- Playwright

## QuickStart

Uses pnpm install all dependencies from the root package.json

```
cd pet-pals-app
pnpm install
```

### .Env Setup

The .env needs to be added to the root of each project for supabase usage at this time this means the below paths should all include the same .env file:
- `/apps/website/.env`
- `/apps/mobile/.env`
- `/packages/shared/.env`

Example .env needs the Supabase Api Key:
```
NEXT_PUBLIC_SUPABASE_KEY="XXX"
EXPO_PUBLIC_SUPABASE_KEY="XXX"
```

### Website

Go to the root of the web project to run the website locally

```
cd apps/website
pnpm dev
```

### Mobile

Go to the root of the mobile project to run Expo Go.

```
cd apps/mobile
npx expo start --clear
```

Choose ios or android simulator and the application will install Expo Go and Launch.

### Tests

From the main project root tests can be run for both Jest or Playwright depending on what needs to be tested.

Jest
```
npm run test
```

Playwright
```
npm run test-ui
```

## Folder & Database Structure

This project is setup like a monorepo and includes hoisted node modules. Basic folder structure can be reviewed below:

```
├── apps
│   ├── mobile
│   │   ├── src
│   │   │   ├── app (Expo routing pages + layouts)
│   │   │   ├── constants
│   │   │   └── components (atomic design components)
│   │   │       ├── atoms
│   │   │       └── molecules
│   │   ├── assets
│   │   ├── app.json
│   │   ├── package.json
│   │   └── README.md
│   └── website
│       ├── app (NextJS routing pages + layouts)
│       ├── components (atomic design components)
│       │   ├── atoms
│       │   └── molecules
│       ├── public (Asset files)
│       ├── utils
│       ├── package.json
│       └── README.md
├── packages
│   └── shared
│       ├── hooks
│       ├── lib
│       │   ├── supabase.ts
│       │   └── supabaseClient.ts
│       ├── types
│       │   └── global.ts
│       ├── utils
│       ├── index.ts
│       └── package.json
├── .gitignore
└── README.md
```

Supabase database setup:

<img width="711" height="862" alt="Screenshot 2026-09-29 at 6 40 46 PM" src="https://github.com/user-attachments/assets/6c85044d-359a-41ab-9e7c-b2b512649876" />


## Notes

- Utilized Shadcn for accessible and quick create form fields - Label, Field, Input, Select atom files. Each is commented with correct resource to ensure it is easy to tell custom components vs imported
- No AI Usage for any components, designs, or architecture. Only debugging support for jest + typescript monorepo setup used.

## Known Issues

- Form typing issue with placeholder values within create/page.tsx
- Errors related to pathing and ESM in bookings.test.tsx that are needed for successful test running but may mean incorrect overall setup
- Booking tests are based on items always being there and not being deleted from the database at the moment
- Home page has no real header structure which can cause potential SEO issues
- Color accessibility audit needed for buttons/text/hovers/etc

## Future Additions

- Admin Login so bookings is auth only accessible (mocked up in designs)
- Booking update to mark items as completed
- Confirmation messaging when booking is done (mocked up in designs)
- User accounts to store pet information and be able to look up bookings made
- Calendar view for bookings
- Easier .env setup using potentially dotenv so it can be referenced in one location instead of 3
