# Sample upgradable smart contract example

**Prerequisites:**

[yarn][1] (but [npm][2] should work just as well) needs to be installed.

# Step-by-step

    yarn install

This will install all the required packages.

Start `ganache` in a separate terminal tab or window.

    yarn ganache

Copy to clipboard the first address, as you will need it later

Initialize a zeppelinOS project

    npx zos init <ProjectName>

Install openzeppelin-eth contracts locally

    npx zos link openzeppelin-eth

Add a contract to the project, here SampleContract provided

    npx zos add SampleContract

Initialize a session with some params within local network (address copied before)

    npx zos session --network development --from <address> --expires <seconds>

Deploy all contracts within the project as well as dependencies

    npx zos push --deploy-dependencies

# Interact

Create a proxy to logic contract

    npx zos create SampleContract --init initialize --args 10

You will get back the address of proxy contract, the one you will play around with. For example:

    Instance created at 0xc321f683F50bb17997a5855E0F50972B44319D9F

Now open a truffle console:

    truffle console

And play with the Sample Contract
```
let contract = await SampleContract.at("0xc321f683F50bb17997a5855E0F50972B44319D9F")
let value = (await contract.\_value()).toString()
await contract.SquareValue()
```

# Update

Change your SampleContract as you wish, but take care of the [caveats](https://medium.com/clearmatics/upgrading-smart-contracts-c9fb144eceb7).

Push it to the network and update it!

    npx zos push
    npx zos update SampleContract

You will get back the same address as before.
Now restart the truffle console, and play as before. You should see the previous state still there, with new functionalities!

# Errors

If you get this error with one of your requests:

    A network name must be provided to execute the requested action.

It means that your session expired. Restore it with the same command as above.

[1]: https://yarnpkg.com/en/docs/install
[2]: https://docs.npmjs.com/getting-started/installing-node
