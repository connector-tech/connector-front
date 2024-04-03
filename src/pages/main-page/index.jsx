import { Card, CardBody, Center, Image, Text } from "@chakra-ui/react";
import TinderCard from "react-tinder-card";

export function MainPage() {
  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }
  return (
    <Center mt="20">
        <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')}  flickOnSwipe>
          <Card borderRadius="40px" bg="transparent">
          <CardBody>
            <Image
              w="sm"
              height="sm"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJYIpe1NAJI16PXDkZTt8tiebkI2dDCn4XV7djOeWVkg&s"
            />
            <Text>Name: Monke</Text>
            <Text>Age: 18</Text>
            <Text>Des: Hey yo ma name is monke</Text>
            <Text>City: Africa</Text>
            <Text>Away from: 5km</Text>
            <Text>Interests: SSPS</Text>
            <Text>Socials(optional): monke_1</Text>
          </CardBody>
        </Card>
      </TinderCard>
    </Center>
  );
}
