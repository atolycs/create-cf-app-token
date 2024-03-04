
async function run(core, 
                   octokit,
                   cf_account,
                   fetch_opts) {
    core.info(`==> Checking API Token Generate Only Token...`)
    
    fetch(fetch_opts.baseUri + "/user/tokens/verify", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cf_account.token}`
                }
            }).then((response) => {
                if ( response.status != "200") {
                   core.setFailed(`==> Cloudflare Error. Try again after 5 min.`)
                }
            })


    core.info(`==> Getting Cloudflare Pages Token...`)

    const expire_date = new Date(
        new Date().setMinutes(new Date().getMinutes() + 30)
    ).toISOString()


    const token_option = {
        "name": "Github Action Token",
        "expires_on": expire_date,
        "policies": [
            {
                "effect": "allow",
                "resources": {
                    "com.cloudflare.api.account.*": "*"
                },
                "permission_groups": [
                    {
                        "id": "8d28297797f24fb8a0c332fe0866ec89",
                        "name": "Pages Write"
                    },
                    {
                        "id": "e247aedd66bd41cc9193af0213416666",
                        "name": "Pages Read"
                    } 
                ]
            }
        ]
    }

    console.log(JSON.stringify(token_option))

    await fetch(fetch_opts.baseUri + "/user/tokens", {
        method: "POST",
        headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cf_account.token}`
        },
        body: '{"name": "Github Action Token","expires_on": ,"policies": [{"effect": "allow","resources": {"com.cloudflare.api.account.*": "*"},"permission_groups": [{"id": "8d28297797f24fb8a0c332fe0866ec89","name": "Pages Write"},{"id": "e247aedd66bd41cc9193af0213416666","name": "Pages Read"}]}]}'
    })
    .then((res) => {
        console.log(res)
    }
    )
}

export default run