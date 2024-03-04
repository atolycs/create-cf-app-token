import core from "@actions/core"
import github from "@actions/github"
import fetchOptions from "./src/lib/fetch-options.js"

import run from "./src/main.js"

core.info(`==> Reading Cloudflare setting...`)

// Token setup
const cf_account = {
    "token": core.getInput("cf_token") || core.getInput("cf-token"),
}

const octokit_token = core.getInput("token")

const octokit = github.getOctokit(octokit_token)

console.log(cf_account)

//core.info(`==> Setup Cloudflare`)

// fetch(fetchOptions.baseUri + "/user/tokens/verify", {
//          method: "GET",
//          headers: {
//              'Content-Type': 'application/json',
//              Authorization: `Bearer ${cf_auth_token}`
//         }
//     })
//      .then((res) => {
//          console.log(res)
//      })

try {
     run(core, octokit, cf_account, fetchOptions)
 } catch(e) {
     core.setFailed(e.message)
 }
