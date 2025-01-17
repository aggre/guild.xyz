import { Icon } from "@chakra-ui/react"
import Button from "components/common/Button"
import useAccess from "components/[guild]/hooks/useAccess"
import useUser from "components/[guild]/hooks/useUser"
import useConnectPlatform from "components/[guild]/JoinModal/hooks/useConnectPlatform"
import useToast from "hooks/useToast"
import platforms from "platforms"
import { PlatformName } from "types"

type Props = {
  platform: PlatformName
}

const ConnectRequirementPlatformButton = ({ platform }: Props) => {
  const { platformUsers } = useUser()

  const { mutate: mutateAccesses } = useAccess()
  const toast = useToast()
  const onSuccess = () => {
    mutateAccesses()
    toast({
      title: `Successfully connected ${platforms[platform].name}`,
      description: `Your access is being re-checked...`,
      status: "success",
    })
  }

  const { onConnect, isLoading, loadingText, response } = useConnectPlatform(
    platform,
    onSuccess
  )

  const platformFromDb = platformUsers?.some(
    (platformAccount) => platformAccount.platformName === platform
  )

  if (!platformUsers || platformFromDb || response) return null

  return (
    <Button
      size="xs"
      onClick={onConnect}
      isLoading={isLoading}
      loadingText={loadingText}
      colorScheme={platform}
      leftIcon={<Icon as={platforms[platform].icon} />}
      iconSpacing="1"
    >
      {`Connect ${platforms[platform].name}`}
    </Button>
  )
}

export default ConnectRequirementPlatformButton
