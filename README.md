# Learning Lab

An AI native science lab for the browser. Learning Lab turns chemistry, biology, physics, anatomy and medical topics into interactive 2D simulations, guided practicals and grounded tutor explanations.

The product principle is simple: make the invisible visible, and make the theoretical interactive.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS v4
- Lucide icons
- Plus Jakarta Sans and IBM Plex Mono through Next font loading

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run typecheck
npm run build
```

## Pages

### Marketing

- `/` landing page with the molecular hero, platform overview, live simulations, AI tutor, anatomy explorer, educator console and FAQ
- `/simulations` searchable simulation catalog
- `/for-educators` teacher workspace, assignment flow and class reporting
- `/pricing` three tier pricing with a monthly and annual switch
- `/about` product story, principles and the limits of the AI layer
- `/glossary` searchable science reference
- `/legal/privacy` and `/legal/terms` policy pages

### Demo lab

The public demos work without an account:

- `/demo`
- `/demo/molecular-lab`
- `/demo/anatomy`
- `/demo/ai-tutor`
- `/demo/titration`
- `/demo/periodic-table`

### Auth and onboarding

- `/login`
- `/signup`
- `/forgot-password`
- `/onboarding`

The demo account button on the login page opens a seeded workspace. Signing up stores a local profile and then sends the learner through a three step setup flow.

### Dashboard

- `/dashboard` overview with study activity, next classwork and recommended sessions
- `/dashboard/simulations` and `/dashboard/simulations/[slug]` library and live workspaces
- `/dashboard/practicals` guided practicals with step progress
- `/dashboard/practice` adaptive five question sets with scoring
- `/dashboard/notebook` experiment notes and saved observations
- `/dashboard/assignments` classwork, submissions and feedback
- `/dashboard/progress` mastery, streaks and topic breakdowns
- `/dashboard/classes` and `/dashboard/classes/[code]` class list and detail
- `/dashboard/periodic-table` the 36 element reference
- `/dashboard/settings` profile, notifications and local data controls

## What is interactive

- Molecular explorer with four structures, geometry, polarity and tutor notes
- Titration bench with a burette, live pH curve and equivalence point
- Anatomy map with four body systems
- Periodic table with search, family filters and element profiles
- AI tutor with selectable questions, reasoning and sources
- Practice quiz with immediate feedback and locally saved best scores
- Practical checklist with saved progress
- Notebook editor with saved entries
- Class assignments with submission state
- Auth, onboarding, profile editing and settings
- Responsive navigation throughout

## Local data

This build is frontend only. There is no server, database or real authentication yet. All state lives in `localStorage`:

- `learning-lab.session` for the signed in demo profile
- `learning-lab.progress` for completed simulations
- `learning-lab.prefs` for notification preferences
- `learning-lab.quiz.<email>` for practice best scores
- `learning-lab.practicals.<email>` for practical step progress
- `learning-lab.notebook.<email>` for notebook entries
- `learning-lab.assignments.<email>` for submitted classwork
- `learning-lab.onboarding.<email>` for the learner setup choices

Clearing site data resets the demo to its seeded state. Settings also includes a reset control for session progress.

## Structure

```text
src/
  app/                 routes, metadata and page composition
  components/
    auth/              shared auth shell
    brand/             logo mark and wordmark
    dashboard/         workspace shell
    marketing/         landing page sections
    site/              navigation, footers and legal shell
    ui/                buttons, reveal and text field primitives
  features/
    ai/                tutor demo
    anatomy/           body map data and explorer
    auth/              login, signup, forgot and onboarding forms
    dashboard/         workspace data and interactive panels
    educators/         teacher console preview
    marketing/         pricing table and simulation catalog
    reference/         periodic table, elements and glossary
    simulations/       molecule data, molecular workspace and titration lab
  lib/                 session helpers and class name utility
```

Simulation, quiz, practical and class content live in `src/features` so a backend can replace those local sources without rebuilding the page shells.

## Note on the AI layer

Sample tutor answers are written and sourced in the demo data. No model is called at runtime. Any future AI integration should keep the same rule: explanations must stay tied to the records and the curriculum, and the system must never invent results, qualifications or observations.
