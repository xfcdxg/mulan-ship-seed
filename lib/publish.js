import { spawn, exec } from 'child_process'
import { ROOT_PATH } from 'config/path'
import { npmScriptStart, npmScriptStop, defaultGitBranch } from 'config'
import error, { errstate } from 'lib/error'
import { compose, head, match, drop, replace, equals, defaultTo, join } from 'ramda'

export const git = (params = {}) => {
  const { repo, branch = defaultGitBranch, scripts = {} } = params

  if (!!!repo) throw error(...errstate.GIT_REPO_EMPTY)

  const { start = npmScriptStart, stop = npmScriptStop } = scripts

  const repoName = compose(drop(1), replace('.git', ''), defaultTo('repo_is_empty'), head, match(/\/[\w-]+\.git$/))(repo)

  if (!!!repoName || repoName === 'repo_is_empty') throw error(...errstate.GIT_REPO_ERROR)

console.log(repoName)

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

  console.log('=====> exec str', join(';', processList))

  const execProcess = exec(processList.join(';'))
  execProcess.stdout.on('data', data => console.log('====> out', data))
  execProcess.stderr.on('data', data => console.log('====> err', data))
  execProcess.on('exit', code => console.log('====> code', code))
  // console.log('=====> out', execResult)

  return 'git published'

}
