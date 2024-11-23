import { defineLintConfig } from "@funish/lint";

export default defineLintConfig({
  staged: {
    "*.ts": "pnpm check",
    "!*.ts": "pnpm format",
  },
});
