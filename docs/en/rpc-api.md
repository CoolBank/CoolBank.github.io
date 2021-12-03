# RPC API

Coinhub uses the [`ethereum.request(args)` method](./base.html#ethereum-request-args) to wrap an RPC API.

The API is based on an interface exposed by all Ethereum clients, along with a growing number of methods that may or may not be supported by other wallets.

:::tip Tip
All RPC method requests can return errors.
Make sure to handle errors for every call to `ethereum.request(args)`.
:::

## Ethereum JSON-RPC Methods

For the Ethereum JSON-RPC API, please see [the Ethereum wiki](https://eth.wiki/json-rpc/API#json-rpc-methods).

Important methods from this API include:

- [`eth_accounts`](https://eth.wiki/json-rpc/API#eth_accounts)
- [`eth_call`](https://eth.wiki/json-rpc/API#eth_call)
- [`eth_getBalance`](https://eth.wiki/json-rpc/API#eth_getbalance)
- [`eth_sendTransaction`](https://eth.wiki/json-rpc/API#eth_sendtransaction)
- [`eth_sign`](https://eth.wiki/json-rpc/API#eth_sign)

### eth_requestAccounts

:::tip EIP-1102
This method is specified by [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102).
It is equivalent to the deprecated [`ethereum.enable()`](./ethereum-provider.html#ethereum-enable) provider API method.

Under the hood, it calls [`wallet_requestPermissions`](#wallet-requestpermissions) for the `eth_accounts` permission.
Since `eth_accounts` is currently the only permission, this method is all you need for now.
:::

#### Returns

`string[]` - An array of a single, hexadecimal Ethereum address string.

#### Description

Requests that the user provides an Ethereum address to be identified by.
Returns a Promise that resolves to an array of a single Ethereum address string.
If the user denies the request, the Promise will reject with a error.

The request causes a Coinhub popup to appear.
You should only request the user's accounts in response to user action, such as a button click.
You should always disable the button that caused the request to be dispatched, while the request is still pending.

If you can't retrieve the user's account(s), you should encourage the user to initiate an account request.

#### Example

```javascript
document.getElementById('connectButton', connect);

function connect() {
  ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to wallet.');
      } else {
        console.error(error);
      }
    });
}
```

## Other RPC Methods

### wallet_addEthereumChain

:::tip EIP-3085
This method is specified by [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085).
:::

#### Parameters

- `Array`

  0. `AddEthereumChainParameter` - Metadata about the chain that will be added to Coinhub.

For the `rpcUrls` and `blockExplorerUrls` arrays, at least one element is required, and only the first element will be used.

```typescript
interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}
```

#### Returns

`null` - The method returns `null` if the request was successful, and an error otherwise.

#### Description

Creates a confirmation asking the user to add the specified chain to Coinhub.
The user may choose to switch to the chain once it has been added.

As with any method that causes a confirmation to appear, `wallet_addEthereumChain`
should **only** be called as a result of direct user action, such as the click of a button.

Coinhub stringently validates the parameters for this method, and will reject the request
if any parameter is incorrectly formatted.
In addition, Coinhub will reject the request under the following circumstances:

- If the RPC endpoint doesn't respond to RPC calls.
- If the RPC endpoint returns a different chain ID when `eth_chainId` is called.
- If the chain ID corresponds to any default Coinhub chains.

Coinhub does not yet support chains with native currencies that do not have 18 decimals,
but may do so in the future.
