# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅        |
| < 1.0   | ❌        |

## Reporting a Vulnerability

If you discover a security vulnerability in the Filipino Food API, please report it responsibly.

**Do not open a public GitHub Issue for security vulnerabilities.**

### How to Report

Email: open a private issue via GitHub's Security Advisories feature:

1. Go to the [Security tab](https://github.com/eigdoyr/filipino-food-api/security)
2. Click **"Report a vulnerability"**
3. Fill in the details

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### What to Expect

- Acknowledgement within 48 hours
- Status update within 7 days
- Credit in the fix commit if desired

## Scope

### In Scope

- API endpoints returning unexpected data
- Rate limiting bypass
- Injection via query parameters
- Authentication bypass (when API key system is implemented)

### Out of Scope

- The dish dataset content itself (use Fix Data issue template instead)
- Cloudflare infrastructure issues (report to Cloudflare directly)
- Third-party dependencies (report to the respective maintainers)

## Disclosure Policy

We follow responsible disclosure. Once a fix is deployed, we will publicly document the vulnerability and credit the reporter unless anonymity is requested.
