# Vercel review deployment

## Verified release — 20 October 2026

The review-site origin is `https://shrimalassociates.vercel.app`. It is set in
`lib/site.ts` and used by the sitemap, robots file, and metadata. The Vercel project
must actually receive this hostname; changing the code does not reserve it.

The release uses Next.js 16.4.2, Tailwind CSS 4.3.3, Nodemailer 10.1.7, and
next-mdx-remote 6.0.0 on Node.js 22. The old gray-matter/JS-YAML dependency chain
was replaced with `yaml`, with bounded alias expansion and parser regression
checks covering every article. Tailwind Typography's selector-parser dependency
is overridden to the patched 7.x API; article typography is checked through the
production build and browser review.

Checks:

- Clean install, ESLint, TypeScript, and production build.
- `npm audit`: zero vulnerabilities across production and development packages.
- Five frontmatter regression tests, including malformed YAML and alias limits.
- Production HTTP checks: all 23 sitemap pages, assets/internal links, malformed
  contact requests, correct review-domain metadata, and the missing-page response.
- Desktop team/contact appearance, mobile menu opening/closing on navigation,
  office accordion exclusivity, footer map switching, and browser console.

Reproduce locally:

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm audit
npm run build
npm run start -- --hostname 127.0.0.1 --port 3001
```

In another terminal, with SMTP intentionally unconfigured:

```sh
VERIFY_UNCONFIGURED_SMTP=1 npm run verify:production
```

Without that flag, the smoke script only submits invalid/honeypot requests and
never sends an enquiry email. `VERIFY_URL` can target a different deployment.

## Intentional review-stage limitations

SMTP is deferred, so a normal valid contact submission returns a clear 503
configuration message. Actual email delivery has not been verified. The supplied
chambers image, experience figures, and article content remain as approved for
review; final content changes can follow after user verification.

## Deploy this branch

1. Push the reviewed changes on `Fix6-final-draft` and open the PR into `main`.
   GitHub CI runs install/audit/lint/typecheck/tests/build and HTTP smoke checks.
2. Import the repository in Vercel. Use a commercial-eligible plan: Vercel Hobby
   is limited to non-commercial personal use.
3. Use Next.js as the framework, the repository root as the root directory,
   Node.js 22.x, `npm ci` as install command, and `npm run build` as build command.
   Leave the output directory override disabled. No custom start command or
   static-export setting is needed.
4. For the final review URL, use the project name `shrimalassociates` if available
   and confirm Vercel assigns `shrimalassociates.vercel.app`. For review before
   merging, use the branch's preview deployment; after approval, merge the PR and
   deploy from `main` to the project's production URL. Alternatively, explicitly
   configure the review branch as production in Vercel's Git settings.
5. Keep SMTP variables unset for now. Verify the expected branch/commit in the
   Vercel deployment details. To let reviewers access the URL, check Deployment
   Protection settings deliberately; preview deployments can require Vercel login.
6. Check the deployed URL on desktop/mobile, all seven practice pages, Insights,
   portraits, maps, and phone links. Confirm the contact form shows its expected
   unconfigured message. Check `/robots.txt` and `/sitemap.xml` for the right URL.

Never commit actual credentials. `.env.local` is ignored, and `.env.example`
contains only example settings.

## Contact rate limiting — Vercel Firewall

Use a platform rule rather than an in-memory counter, because Vercel can run
multiple server instances. No Redis account or application credential is needed
for this approach. The rule is account-side configuration and is NOT enabled by
this repository or PR; enable it after the Vercel project exists.

Suggested initial rule:

1. Open the Vercel project → Firewall → Rules → create a custom rule.
2. Match request method `POST` AND request path exactly `/api/contact`.
3. Choose rate limiting, keyed by client IP: start with 5 requests per 60 seconds
   and a short block period (for example 60 seconds), subject to your plan's
   available limits/actions. Apply to the environments used for public review.
4. Save/publish the rule and test it against the deployed project: normal requests
   should get their usual validation response and excess requests should be
   rate-limited (HTTP 429 for a blocking response). Verify in Firewall logs.
5. Revisit the limit if legitimate users share a public IP. Do not use this rule
   to match all pages or block ordinary navigation.

While SMTP is disabled, the endpoint cannot send email. Before enabling email,
confirm this rule is active and test it on the deployed Vercel project. The
application already limits payload/field sizes, rejects invalid field types,
uses a honeypot, and applies SMTP timeouts.

## Enable email later

Set these server-only values in Vercel Settings → Environment Variables:

| Variable | Value |
| --- | --- |
| `SMTP_HOST` | Your provider's SMTP hostname |
| `SMTP_PORT` | `465` (TLS) or `587` (STARTTLS) |
| `SMTP_SECURE` | `true` for 465; `false` for 587 |
| `SMTP_USER` | SMTP login |
| `SMTP_PASS` | Provider credential/app password |
| `SMTP_FROM` | A sender authorized by your provider |
| `CONTACT_TO` | Mailbox receiving enquiries |

Do not prefix these with `NEXT_PUBLIC_`. Configure the sender domain's SPF/DKIM
and appropriate DMARC through the mail provider; Vercel blocks SMTP port 25.
Redeploy after saving environment values. Submit a labelled test enquiry, verify
actual inbox receipt and spam handling, and inspect Vercel runtime logs for errors.

## Official references

- [Git deployments](https://vercel.com/docs/git)
- [Environment variables](https://vercel.com/docs/environment-variables)
- [Rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)
- [SMTP on Vercel](https://vercel.com/kb/guide/serverless-functions-and-smtp)
- [Hobby plan restrictions](https://vercel.com/docs/plans/hobby)
- [Next.js 16 migration](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Tailwind 4 migration](https://tailwindcss.com/docs/upgrade-guide)
