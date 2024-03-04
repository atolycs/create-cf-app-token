
async function run(core, 
                   octokit,
                   cf_auth_token,
                   fetch_opts) {
    core.info(`==> Checking API Token Generate Only Token...`)
    
    fetch(fetch_opts.baseUri + "/user/tokens/verify", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cf_auth_token}`
                }
            }).then((response) => {
                if ( response.status != "200") {
                   core.setFailed(`==> Cloudflare Error. Try again after 5 min.`)
                }
            })

}

export default run