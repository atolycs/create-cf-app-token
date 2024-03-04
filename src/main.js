/**
 * 
 * @param {import("@actions/core")} core 
 * @param {import("cloudflare")} cf
 * @param {*} cf_auth_token 
 */


async function run(core, fetch_opts) {
    core.info(`==> Checking API Token Generate Only Token...`)
    
    try {
        fetch()
    } catch(e) {
        throw new TokenError(`==> Token is Revoked. check your api token.`)
    }

}