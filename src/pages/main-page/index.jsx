import { useState } from "react";
import {
  Card,
  CardBody,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
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
  return (
    <Center height="90vh" overflow="hidden">
      <Modal isOpen={isMatch} onClose={() => setIsMatch(false)}>
        <ModalOverlay />
        <ModalContent bgColor="transparent" shadow="none">
          <ModalBody bgColor="transparent">
            <Center mt="50%" bgColor="transparent" zIndex="5" display="block">
              <Center>
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
        {data.data?.data?.items.map((user, index) => {
          return (
            <TinderCard
              onSwipe={(e) => onSwipe(e, user.id, user.is_liked)}
              onCardLeftScreen={() => onCardLeftScreen("fooBar")}
              flickOnSwipe
              key={user.id}
              className="tinder-card"
            >
              <Card
                borderRadius="40px"
                w="300px"
                h="500px"
                bgImage="https://img.freepik.com/free-photo/blurred-pop-abstract-background-pink_58702-1700.jpg"
                bgRepeat="no-repeat"
                bgSize="cover"
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
                        {user.full_name}, 21
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
        })}
      </div>
    </Center>
  );
}
