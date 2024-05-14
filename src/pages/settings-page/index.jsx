import {
  Box,
  Button,
  Card,
  CardBody,
  Text,
  VStack,
  Center,
} from "@chakra-ui/react";
import EditProfileForm from "./edit-profile-form";
import { useMyProfileInfo } from "../../api/users/users-hooks";
import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";

export function SettingsPage() {
  const { data } = useMyProfileInfo();
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const onLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const onChangePhoto = (len) => {
    if (len !== 1) {
      if (len - 1 === currentPhoto) {
        console.log(len, currentPhoto);
        setCurrentPhoto(0);
      } else {
        setCurrentPhoto(currentPhoto + 1);
      }
    }
  };
  return (
    <Box p="5" style={{ zoom: `${window.innerWidth < 380 ? "60%" : "80%"}` }}>
      <Text fontSize="40" textAlign="left">
        Settings
      </Text>
      <VStack alignItems="left" mt="5">
        <Center mb="20px">
          {data && (
            <Card
              className="tinder-card"
              borderRadius="40px"
              w="300px"
              h="500px"
              bgImage={
                data.data?.photos.length !== 0
                  ? `https://connector-app-bucket.s3.eu-central-1.amazonaws.com${data.data?.photos[currentPhoto]}`
                  : "https://img.freepik.com/free-photo/blurred-pop-abstract-background-pink_58702-1700.jpg"
              }
              bgRepeat="no-repeat"
              bgSize="cover"
              onClick={() => onChangePhoto(data.data?.photos.length)}
            >
              <CardBody>
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    left: "0",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Text color="white" fontSize="22px">
                      {data.data?.full_name}, {data.data?.age}
                    </Text>
                  </div>
                  <div style={{ display: "flex" }}>
                    <Text color="white" fontSize="15px">
                      {data.data?.bio}
                    </Text>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </Center>
        <EditProfileForm />
        <Button onClick={onLogout} bgColor="red.300" color="white">
          Log out
        </Button>
      </VStack>
    </Box>
  );
}
