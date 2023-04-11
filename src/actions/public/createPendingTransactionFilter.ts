import type { PublicClient, Transport } from '../../clients/index.js'
import type { Chain, Filter } from '../../types/index.js'
import { createFilterRequestScope } from '../../utils/filters/createFilterRequestScope.js'

export type CreatePendingTransactionFilterReturnType = Filter<'transaction'>

export async function createPendingTransactionFilter<
  TTransport extends Transport,
  TChain extends Chain | undefined,
>(
  client: PublicClient<TTransport, TChain>,
): Promise<CreatePendingTransactionFilterReturnType> {
  const getRequest = createFilterRequestScope(client, {
    method: 'eth_newPendingTransactionFilter',
  })
  const id = await client.request({
    method: 'eth_newPendingTransactionFilter',
  })
  return { id, request: getRequest(id), type: 'transaction' }
}
