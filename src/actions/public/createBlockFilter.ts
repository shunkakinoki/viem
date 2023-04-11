import type { PublicClient, Transport } from '../../clients/index.js'
import type { Chain, Filter } from '../../types/index.js'
import { createFilterRequestScope } from '../../utils/filters/createFilterRequestScope.js'

export type CreateBlockFilterReturnType = Filter<'block'>

export async function createBlockFilter<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
): Promise<CreateBlockFilterReturnType> {
  const getRequest = createFilterRequestScope(client, {
    method: 'eth_newBlockFilter',
  })
  const id = await client.request({
    method: 'eth_newBlockFilter',
  })
  return { id, request: getRequest(id), type: 'block' }
}
