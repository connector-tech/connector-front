import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import ConfettiExplosion from "react-confetti-explosion";

import TinderCard from "react-tinder-card";
import { useUsers } from "../../api/users/users-hooks";
import { useViewed } from "../../api/is-viewed/is-viewed-hooks";

import "./styles.css";

export function MainPage() {
  const { data } = useUsers();
  const { mutate: liked, isSuccess } = useViewed();
  const [isMatch, setIsMatch] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const onSwipe = (direction, userId, isLiked) => {
    if (direction === "right") {
      if (isLiked) {
        setIsMatch(true);
      }
      isLiked = true;
      liked({ userId, isLiked });
    } else {
      isLiked = false;
      liked({ userId, isLiked });
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  const onChangePhoto = (len) => {
    console.log(len, currentPhoto);
    if (len !== 1) {
      if (len - 1 === currentPhoto) {
        setCurrentPhoto(0);
      } else {
        setCurrentPhoto(currentPhoto + 1);
      }
    }
  };

  return (
    <Center height="90vh" overflow="hidden">
      <Modal isOpen={isMatch} onClose={() => setIsMatch(false)}>
        <ModalOverlay />
        <ModalContent bgColor="transparent" shadow="none">
          <ModalBody bgColor="transparent">
            <Center mt="50%" bgColor="transparent" zIndex="5" display="block">
              <Center pl="5">
                <ConfettiExplosion zIndex="9999" duration={4000} />
              </Center>
              <Text
                color="green.300"
                fontSize="100px"
                fontWeight="500"
                fontStyle="italic"
              >
                MATCH
              </Text>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="tinder-cards">
        {data.data?.data?.items.length !== 0 ? (
          data.data?.data?.items.map((user, index) => {
            return (
              <TinderCard
                onSwipe={(e) => onSwipe(e, user.id, user.is_liked)}
                onCardLeftScreen={() => onCardLeftScreen("fooBar")}
                flickOnSwipe
                key={user.id}
                className="pressable"
                preventSwipe={["up", "down"]}
              >
                <Card
                  borderRadius="40px"
                  w="300px"
                  h="500px"
                  bgImage={
                    user.photos.length !== 0
                      ? `https://connector-app-bucket.s3.eu-central-1.amazonaws.com${user?.photos[currentPhoto]}`
                      : "https://img.freepik.com/free-photo/blurred-pop-abstract-background-pink_58702-1700.jpg"
                  }
                  bgRepeat="no-repeat"
                  bgSize="cover"
                >
                  <CardBody onClick={() => onChangePhoto(user?.photos.length)}>
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
                          {user.full_name}, {user.age}
                        </Text>
                      </div>
                      <div style={{ display: "flex" }}>
                        <Text color="white" fontSize="15px">
                          {user.bio}
                        </Text>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </TinderCard>
            );
          })
        ) : (
          <Center>
            <VStack>
              <Text fontSize="150px">🥲</Text>
              <Text fontWeight="500">There's no one left</Text>
            </VStack>
          </Center>
        )}
      </div>
    </Center>
  );
}
