/**
 * Publishes `dist/` to the `gh-pages` branch, which GitHub Pages serves.
 *
 * Run via `npm run deploy` (it builds first). The branch is rebuilt from scratch
 * on every deploy — it holds only build output, so there is no history worth
 * keeping and the repo stays small.
 *
 * This exists because pushing `.github/workflows/` needs a token with `workflow`
 * scope; see docs/github-pages-workflow.yml for the CI version.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'

const BRANCH = 'gh-pages'
const WORKTREE = '.gh-pages-worktree'

const git = (...args) => execFileSync('git', args, { stdio: 'inherit' })
const gitQuiet = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()

if (!existsSync('dist/index.html')) {
  console.error('dist/index.html is missing — run `npm run build` first.')
  process.exit(1)
}

// A detached worktree keeps the main working tree untouched during the swap.
rmSync(WORKTREE, { recursive: true, force: true })
try {
  git('worktree', 'prune')
  git('worktree', 'add', '--detach', WORKTREE)

  execFileSync(
    'rsync',
    ['-a', '--delete', '--exclude', '.git', '--exclude', '.DS_Store', 'dist/', `${WORKTREE}/`],
    { stdio: 'inherit' }
  )

  // Tell Pages not to run the output through Jekyll, which skips `_`-prefixed files.
  execFileSync('touch', [`${WORKTREE}/.nojekyll`])

  const sha = gitQuiet('rev-parse', '--short', 'HEAD')
  execFileSync('git', ['-C', WORKTREE, 'add', '-A'], { stdio: 'inherit' })
  execFileSync('git', ['-C', WORKTREE, 'commit', '-m', `Deploy ${sha}`], { stdio: 'inherit' })
  execFileSync('git', ['-C', WORKTREE, 'push', '--force', 'origin', `HEAD:refs/heads/${BRANCH}`], {
    stdio: 'inherit',
  })

  console.log(`\nPublished ${sha} to ${BRANCH}.`)
} finally {
  rmSync(WORKTREE, { recursive: true, force: true })
  execFileSync('git', ['worktree', 'prune'])
}
