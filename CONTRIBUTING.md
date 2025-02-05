# Contributing to GeoIP0

First off, thank you for considering contributing to GeoIP0! It's people like you that make GeoIP0 such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps which reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- Use a clear and descriptive title
- Provide a step-by-step description of the suggested enhancement
- Provide specific examples to demonstrate the steps
- Describe the current behavior and explain which behavior you expected to see instead
- Explain why this enhancement would be useful

### Pull Requests

- Fork the repo and create your branch from `main`
- If you've added code that should be tested, add tests
- If you've changed APIs, update the documentation
- Ensure the test suite passes
- Make sure your code lints
- Issue that pull request!

## Development Process

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Write or update tests as needed
5. Update documentation as needed
6. Submit a pull request

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/<your-username>/geoip0.git

# Add upstream remote
git remote add upstream https://github.com/geoip0/geoip0.git

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env

# Start development server
pnpm dev
```

### Code Style

We use Biome for code formatting and linting. Please ensure your code follows our style guide by running:

```bash
pnpm check
```

### Testing

Please write tests for any new features or bug fixes. Run the test suite with:

```bash
pnpm test
```

## License

By contributing to GeoIP0, you agree that your contributions will be licensed under its MIT license.
