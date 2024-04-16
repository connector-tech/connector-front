import { Box, Button, Text, VStack } from "@chakra-ui/react";
import EditProfileForm from "./edit-profile-form";

export function SettingsPage() {
  const onLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <Box p="5">
      <Text fontSize="40" textAlign="left">
        Settings
      </Text>
      <VStack alignItems="left" mt="5">
        <EditProfileForm />
        <Button onClick={onLogout} bgColor="red.300" color="white">
          Log out
        </Button>
      </VStack>
    </Box>
  );
}
