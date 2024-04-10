import { Card, CardBody, Center, Text } from "@chakra-ui/react";
import TinderCard from "react-tinder-card";
import { useUsers } from "../../api/users/users-hooks";

import "./styles.css";

export function MainPage() {
  const { data } = useUsers();

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };
  return (
    <Center height="90vh" overflow="hidden">
      <div className="tinder-cards">
        {data.data?.data?.items.map((user, index) => {
          return (
            <TinderCard
              onSwipe={onSwipe}
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
