import { spawn, exec } from 'child_process'
import { ROOT_PATH } from 'config/path'
import { npmScriptStart, npmScriptStop, defaultGitBranch, repoIsEmpty } from 'config'
import error, { errstate } from 'lib/error'
import { compose, head, match, drop, replace, equals, defaultTo, join } from 'ramda'

export const git = (params = {}) => {
  const { repo, branch = defaultGitBranch, scripts = {} } = params

  if (!!!repo) throw error(...errstate.GIT_REPO_EMPTY)

  const { start = npmScriptStart, stop = npmScriptStop } = scripts

  const repoName = compose(drop(1), replace('.git', ''), defaultTo(repoIsEmpty), head, match(/\/[\w-]+\.git$/))(repo)

  if (!!!repoName || repoName === repoIsEmpty) throw error(...errstate.GIT_REPO_ERROR)

  const processList = [
    `cd ../`,
    'mkdir .project',
    'cd .project',
    `git clone ${ repo } ${ repoName }`,
    `cd ${ repoName }`,
    `git branch ${ branch }`,
    `git checkout ${ branch }`,
    'npm i',
    start
  ]

  console.log('exec script: ', join(';', processList))

  const execProcess = compose(exec, join(';'))(processList)
  execProcess.stdout.on('data', data => console.log(`\n${ data }`))
  execProcess.stderr.on('data', data => console.log(`\n${ data }`))
  execProcess.on('exit', code => console.log('项目启动结果：', code))

  return 'git published'
}
