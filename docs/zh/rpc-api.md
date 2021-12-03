# RPC API

Coinhub App 使用 [`ethereum.request(args)`方法](./base.html#ethereum-request-args) 包装 RPC API。

该 API 基于所有以太坊客户端公开的接口，以及越来越多的其他钱包可能支持或可能不支持的方法。

:::tip 提示
所有 RPC 方法请求都可以返回错误。确保每次调用 `ethereum.request(args)` 时都要处理错误。
:::

## 以太坊 JSON-RPC 方法

有关以太坊 JSON-RPC API，请参阅[以太坊 Wiki](https://eth.wiki/json-rpc/API#json-rpc-methods)。

此 API 的重要方法包括：

- [`eth_accounts`](https://eth.wiki/json-rpc/API#eth_accounts)
- [`eth_call`](https://eth.wiki/json-rpc/API#eth_call)
- [`eth_getBalance`](https://eth.wiki/json-rpc/API#eth_getbalance)
- [`eth_sendTransaction`](https://eth.wiki/json-rpc/API#eth_sendtransaction)
- [`eth_sign`](https://eth.wiki/json-rpc/API#eth_sign)

### eth_requestAccounts

:::tip EIP-1102
此方法由[EIP-1102](https://eips.ethereum.org/EIPS/eip-1102)指定。它等效于已弃用的 [`ethereum.enable()`](./ethereum-provider.html#ethereum-enable) API 方法。

在内部逻辑中，它为 [eth_accounts] 权限调用 [`wallet_requestPermissions`](＃wallet-requestpermissions)。由于目前只有 `eth_accounts` 权限，因此您现在只需要此方法。
:::

#### 返回

`string []` 十六进制以太坊地址字符串的数组。

#### 概述

请求用户提供一个以太坊地址以作为标识。返回一个 Promise，它解析为单个以太坊地址字符串的数组。如果用户拒绝该请求，则 Promise 将拒绝并显示错误。

该请求将导致出现一个 Coinhub App 弹出窗口。您只应响应用户的操作（例如单击按钮）来请求用户的帐户。在请求仍处于挂起状态时，应始终禁用调用请求的按钮。

如果您无法检索用户的帐户，则应鼓励用户发起帐户请求。

#### 示例

```javascript
document.getElementById('connectButton', connect);

function connect() {
  ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 用户拒绝错误
        console.log('请连接 Coinhub App');
      } else {
        console.error(error);
      }
    });
}
```

## 其他 RPC 方法

### wallet_addEthereumChain

:::tip EIP-3085
这个方法基于 [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) 规范.
:::

#### 参数

- `Array`
  - `AddEthereumChainParameter` - 将链的信息和内容添加至 Coinhub App

对于 `rpcUrls` 和 `blockExplorerUrls` 数组, 至少需要一个元素，同时也只有第一个元素目前会被应用

```typescript
interface AddEthereumChainParameter {
  chainId: string; // 一个 0x 开头的十六进制字符串
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 字符长度
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // 暂时无用
}
```

#### 返回

`null` - 成功返回 null，失败则返回对应错误

#### 描述

创建一个确认信息，要求用户将指定的链添加到 Coinhub App。一旦添加了链，用户可以选择切换到该链。

与导致确认出现的任何方法一样，`wallet_addEthereumChain` 应该仅由于直接用户操作（例如单击按钮）而被调用。

Coinhub App 严格验证此方法的参数，并将拒绝该请求如果任何参数格式错误。此外，在以下情况下，Coinhub App 将拒绝该请求：

- 如果 RPC 端点不响应 RPC 调用。
- 如果在调用 `eth_chainId` 时 RPC 端点返回了不同的链 ID。
- 如果链 ID 已经存在于任何默认的 Coinhub App 链。

Coinhub App 目前尚不支持使用不带 18 个小数位的本国货币的链，但将来可能会这样做。

### wallet_watchAsset

:::tip EIP-747
此方法基于 [EIP-747](https://eips.ethereum.org/EIPS/eip-747) 规范。
:::

#### 参数

- `WatchAssetParams` - 需要观察的资产数据

#### 返回

`boolean` - 返回 `true` 则代表成功，其他错误情况返回 `false`

#### 描述

请求用户在 Coinhub App 中添加某个地址的资产。返回一个 “布尔值”，指示是否成功添加了该资产。

大多数以太坊钱包都支持某资产代币的地址合集，通常是从中心化的令牌注册表中获取的。 `wallet_watchAsset` 使 Web3 应用程序开发人员可以在运行时要求其用户跟踪其钱包中的令牌。

添加后，令牌就无法与通过传统方法（例如默认配置）添加的令牌区分开。

#### 示例

```javascript
ethereum.request({
  method: 'wallet_watchAsset',
  params: {
    type: 'ERC20',
    options: {
      address: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
      symbol: 'FOO',
      decimals: 18,
      image: 'https://foo.io/token-image.svg',
    },
  },
});
  .then((success) => {
    if (success) {
      console.log('FOO successfully added to wallet!')
    } else {
      throw new Error('Something went wrong.')
    }
  })
  .catch(console.error)
```
