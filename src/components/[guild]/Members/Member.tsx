import { Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import GuildAvatar from "components/common/GuildAvatar"
import useENSName from "components/common/Layout/components/Account/hooks/useENSName"
import shortenHex from "utils/shortenHex"

type Props = {
  address: string
}

const Member = ({ address }: Props): JSX.Element => {
  const ENSName = useENSName(address)
  const avatarSize = useBreakpointValue({ base: 6, md: 8 })

  if (!address) return null

  return (
    <VStack
      spacing={2}
      opacity="0.5"
      transition="opacity .1s"
      _hover={{ opacity: 1 }}
    >
      <GuildAvatar address={address} size={avatarSize} />
      <Text fontFamily="display" fontWeight="semibold" fontSize="sm">
        {ENSName || `${shortenHex(address, 3)}`}
      </Text>
    </VStack>
  )
}

export default Member